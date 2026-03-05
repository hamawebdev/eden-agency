const rawPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
export const FB_PIXEL_ID =
    rawPixelId && /^\d+$/.test(rawPixelId) ? rawPixelId : undefined;

if (rawPixelId && !FB_PIXEL_ID && process.env.NODE_ENV !== "production") {
    console.warn(
        "NEXT_PUBLIC_FACEBOOK_PIXEL_ID must be a numeric Meta Pixel ID. Pixel script was not initialized."
    );
}

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const canTrack = () => typeof window !== "undefined" && typeof window.fbq === "function";

export const pageview = () => {
    if (canTrack()) {
        window.fbq("track", "PageView");
    }
};

export const event = (
    name: string,
    options?: Record<string, unknown>,
    eventId?: string
) => {
    if (!canTrack()) return;

    if (eventId) {
        window.fbq("track", name, options ?? {}, { eventID: eventId });
        return;
    }

    window.fbq("track", name, options ?? {});
};

const getCookie = (name: string): string | undefined => {
    if (typeof document === "undefined") return undefined;

    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];

    return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

export const getMetaBrowserData = () => {
    if (typeof window === "undefined") {
        return { fbp: undefined, fbc: undefined };
    }

    const fbp = getCookie("_fbp");
    let fbc = getCookie("_fbc");

    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (!fbc && fbclid) {
        fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;
        document.cookie = `_fbc=${encodeURIComponent(
            fbc
        )}; path=/; max-age=${90 * 24 * 60 * 60}; SameSite=Lax`;
    }

    return { fbp, fbc };
};

export const generateEventId = (prefix = "meta") => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return `${prefix}_${crypto.randomUUID()}`;
    }

    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
};
