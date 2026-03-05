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

    const endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(
        accessToken || ""
    )}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Meta CAPI request failed:", errorText);
            return { success: false, status: response.status, error: errorText };
        }

        return { success: true, status: response.status };
    } catch (error) {
        console.error("Meta CAPI request error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown Meta CAPI error",
        };
    }
}
