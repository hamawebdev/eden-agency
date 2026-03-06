const rawPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
export const FB_PIXEL_ID =
    rawPixelId && /^\d+$/.test(rawPixelId) ? rawPixelId : undefined;
export const DEFAULT_META_PARAM_BUILDER_SCRIPT_URL =
    "https://capi-automation.s3.us-east-2.amazonaws.com/public/client_js/capiParamBuilder/clientParamBuilder.bundle.js";

if (rawPixelId && !FB_PIXEL_ID && process.env.NODE_ENV !== "production") {
    console.warn(
        "NEXT_PUBLIC_FACEBOOK_PIXEL_ID must be a numeric Meta Pixel ID. Pixel script was not initialized."
    );
}

type ClientParamBuilder = {
    processAndCollectParams?: (url?: string) => void;
    processAndCollectAllParams?: (url?: string) => void;
    getFbc?: () => string | undefined;
    getFbp?: () => string | undefined;
};

type MetaBrowserData = {
    fbp?: string;
    fbc?: string;
};

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
        clientParamBuilder?: ClientParamBuilder;
    }
}

const FBC_COOKIE_MAX_AGE = 90 * 24 * 60 * 60;

const normalizeValue = (value?: string | null) => {
    if (!value) return undefined;
    const normalized = value.trim();
    return normalized || undefined;
};

const canTrack = () => typeof window !== "undefined" && typeof window.fbq === "function";

export const pageview = () => {
    if (!canTrack()) return;

    const fbq = window.fbq;
    if (!fbq) return;

    fbq("track", "PageView");
};

export const event = (
    name: string,
    options?: Record<string, unknown>,
    eventId?: string
) => {
    if (!canTrack()) return;

    const fbq = window.fbq;
    if (!fbq) return;

    if (eventId) {
        fbq("track", name, options ?? {}, { eventID: eventId });
        return;
    }

    fbq("track", name, options ?? {});
};

const getCookie = (name: string): string | undefined => {
    if (typeof document === "undefined") return undefined;

    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];

    return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

const getParamBuilderValue = (getter?: () => string | undefined) => {
    if (!getter) return undefined;

    try {
        return normalizeValue(getter());
    } catch {
        return undefined;
    }
};

const getFbclidFromUrl = (url?: string) => {
    if (typeof window === "undefined") return undefined;

    const resolvedUrl = url || window.location.href;
    try {
        return normalizeValue(new URL(resolvedUrl, window.location.origin).searchParams.get("fbclid"));
    } catch {
        return undefined;
    }
};

const buildFbcFromFbclid = (fbclid: string, timestampMs = Date.now()) =>
    `fb.1.${timestampMs}.${fbclid}`;

const setCookie = (name: string, value: string, maxAgeSeconds: number) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${encodeURIComponent(
        value
    )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
};

const ensureFbcCookie = (url?: string) => {
    const existingFbc = normalizeValue(getCookie("_fbc"));
    if (existingFbc) return existingFbc;

    const fbclid = getFbclidFromUrl(url);
    if (!fbclid) return undefined;

    const fbc = buildFbcFromFbclid(fbclid);
    setCookie("_fbc", fbc, FBC_COOKIE_MAX_AGE);
    return fbc;
};

export const processMetaBrowserParams = (url?: string) => {
    if (typeof window === "undefined") return;

    const builder = window.clientParamBuilder;

    try {
        if (typeof builder?.processAndCollectAllParams === "function") {
            builder.processAndCollectAllParams(url);
        } else if (typeof builder?.processAndCollectParams === "function") {
            builder.processAndCollectParams(url);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Meta param builder processing failed:", error);
        }
    }

    // Fallback path if SDK does not produce _fbc.
    ensureFbcCookie(url);
};

export const getMetaBrowserData = (url?: string): MetaBrowserData => {
    if (typeof window === "undefined") {
        return { fbp: undefined, fbc: undefined };
    }

    processMetaBrowserParams(url);

    const builder = window.clientParamBuilder;
    const sdkFbp = getParamBuilderValue(builder?.getFbp);
    const sdkFbc = getParamBuilderValue(builder?.getFbc);

    const cookieFbp = normalizeValue(getCookie("_fbp"));
    const cookieFbc = normalizeValue(getCookie("_fbc"));

    const fbp = sdkFbp || cookieFbp;
    const fbc = sdkFbc || cookieFbc || ensureFbcCookie(url);

    return { fbp, fbc };
};

export const generateEventId = (prefix = "meta") => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return `${prefix}_${crypto.randomUUID()}`;
    }

    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
};
