import "server-only";
import { createHash } from "crypto";

type MetaUserDataInput = {
    email?: string;
    firstName?: string;
    phone?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbp?: string;
    fbc?: string;
};

type MetaEventInput = {
    eventName: string;
    eventId?: string;
    eventTime?: number;
    actionSource?: "website";
    eventSourceUrl?: string;
    customData?: Record<string, unknown>;
    userData?: MetaUserDataInput;
};

type MetaSendResult = {
    success: boolean;
    status?: number;
    error?: string;
};

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v20.0";
const GRAPH_API_BASE_URL = (process.env.META_GRAPH_API_BASE_URL || "https://graph.facebook.com").replace(
    /\/+$/,
    ""
);

const parseNonNegativeInt = (value: string | undefined, fallback: number) => {
    const parsed = Number.parseInt(value || "", 10);
    if (!Number.isFinite(parsed) || parsed < 0) return fallback;
    return parsed;
};

const REQUEST_TIMEOUT_MS = parseNonNegativeInt(process.env.META_REQUEST_TIMEOUT_MS, 10000);
const MAX_RETRIES = parseNonNegativeInt(process.env.META_MAX_RETRIES, 2);
const RETRY_BASE_DELAY_MS = parseNonNegativeInt(process.env.META_RETRY_BASE_DELAY_MS, 350);

const RETRYABLE_ERROR_CODES = new Set([
    "ETIMEDOUT",
    "ECONNRESET",
    "ECONNREFUSED",
    "EAI_AGAIN",
    "ENOTFOUND",
    "UND_ERR_CONNECT_TIMEOUT",
    "UND_ERR_HEADERS_TIMEOUT",
    "UND_ERR_SOCKET",
]);

const normalizeValue = (value: string) => value.trim().toLowerCase();
const normalizePhone = (value: string) => value.replace(/[^\d]/g, "");

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

const hashIfPresent = (value?: string, normalizer: (value: string) => string = normalizeValue) => {
    if (!value) return undefined;
    const normalized = normalizer(value);
    if (!normalized) return undefined;
    return [sha256(normalized)];
};

const removeUndefined = <T extends Record<string, unknown>>(object: T) =>
    Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));

const getMetaConfig = () => {
    const publicMetaValue = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const pixelId = process.env.META_PIXEL_ID || publicMetaValue;
    const accessToken =
        process.env.META_ACCESS_TOKEN ||
        (publicMetaValue && !/^\d+$/.test(publicMetaValue) ? publicMetaValue : undefined);

    if (!process.env.META_ACCESS_TOKEN && accessToken) {
        console.warn(
            "Using NEXT_PUBLIC_FACEBOOK_PIXEL_ID as a Meta access token fallback. Move it to META_ACCESS_TOKEN."
        );
    }

    return {
        pixelId,
        accessToken,
        isValid: Boolean(pixelId && /^\d+$/.test(pixelId) && accessToken),
    };
};

const buildUserData = (input?: MetaUserDataInput) => {
    if (!input) return undefined;

    const userData = removeUndefined({
        em: hashIfPresent(input.email),
        fn: hashIfPresent(input.firstName),
        ph: hashIfPresent(input.phone, normalizePhone),
        client_ip_address: input.clientIpAddress,
        client_user_agent: input.clientUserAgent,
        fbp: input.fbp,
        fbc: input.fbc,
    });

    return Object.keys(userData).length ? userData : undefined;
};

export const getClientIpFromHeader = (value?: string | null) =>
    value?.split(",")[0]?.trim() || undefined;

const shouldRetryStatus = (status: number) => status === 429 || status >= 500;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const getErrorCode = (error: unknown): string | undefined => {
    if (!error || typeof error !== "object") return undefined;

    const directCode = (error as { code?: unknown }).code;
    if (typeof directCode === "string") return directCode;

    const cause = (error as { cause?: unknown }).cause;
    if (!cause || typeof cause !== "object") return undefined;

    const causeCode = (cause as { code?: unknown }).code;
    return typeof causeCode === "string" ? causeCode : undefined;
};

const isRetryableNetworkError = (error: unknown) => {
    if (error instanceof DOMException && error.name === "AbortError") {
        return true;
    }

    const code = getErrorCode(error);
    return Boolean(code && RETRYABLE_ERROR_CODES.has(code));
};

export async function sendMetaEvent(input: MetaEventInput): Promise<MetaSendResult> {
    const { pixelId, accessToken, isValid } = getMetaConfig();

    if (!isValid) {
        console.warn("Meta CAPI skipped: META_PIXEL_ID and/or META_ACCESS_TOKEN is missing or invalid.");
        return { success: false, error: "Missing Meta CAPI configuration" };
    }

    const payload = removeUndefined({
        data: [
            removeUndefined({
                event_name: input.eventName,
                event_time: input.eventTime || Math.floor(Date.now() / 1000),
                action_source: input.actionSource || "website",
                event_source_url: input.eventSourceUrl,
                event_id: input.eventId,
                user_data: buildUserData(input.userData),
                custom_data: input.customData,
            }),
        ],
        test_event_code: process.env.META_TEST_EVENT_CODE,
    });

    const endpoint = `${GRAPH_API_BASE_URL}/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(
        accessToken || ""
    )}`;

    const maxAttempts = MAX_RETRIES + 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                cache: "no-store",
                signal: controller.signal,
            });

            if (response.ok) {
                return { success: true, status: response.status };
            }

            const errorText = await response.text().catch(() => "Failed to read Meta CAPI error body");
            const canRetry = attempt < maxAttempts && shouldRetryStatus(response.status);

            if (canRetry) {
                const delayMs = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
                console.warn(
                    `Meta CAPI request failed with status ${response.status} (attempt ${attempt}/${maxAttempts}). Retrying in ${delayMs}ms.`
                );
                await wait(delayMs);
                continue;
            }

            console.error("Meta CAPI request failed:", errorText);
            return { success: false, status: response.status, error: errorText };
        } catch (error) {
            const code = getErrorCode(error);
            const canRetry = attempt < maxAttempts && isRetryableNetworkError(error);

            if (canRetry) {
                const delayMs = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
                console.warn(
                    `Meta CAPI request error ${code ? `(${code}) ` : ""}(attempt ${attempt}/${maxAttempts}). Retrying in ${delayMs}ms.`
                );
                await wait(delayMs);
                continue;
            }

            console.error("Meta CAPI request error:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown Meta CAPI error";
            return {
                success: false,
                error: code ? `${errorMessage} (${code})` : errorMessage,
            };
        } finally {
            clearTimeout(timeoutId);
        }
    }

    return { success: false, error: "Meta CAPI retries exhausted" };
}
