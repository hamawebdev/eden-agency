import { NextResponse } from "next/server";
import { getClientIpFromHeader, sendMetaEvent } from "@/lib/meta-conversions";

type BrowserMetaUserData = {
    email?: string;
    firstName?: string;
    phone?: string;
    fbp?: string;
    fbc?: string;
};

type BrowserMetaEventPayload = {
    eventName?: string;
    eventId?: string;
    eventSourceUrl?: string;
    customData?: Record<string, unknown>;
    userData?: BrowserMetaUserData;
};

const ALLOWED_EVENTS = new Set(["ViewContent", "AddToCart", "InitiateCheckout", "Purchase"]);
const DEBUG_MATCH_KEYS = process.env.META_DEBUG_MATCH_KEYS === "true";

const normalizeValue = (value?: string | null) => {
    if (!value) return undefined;
    const normalized = value.trim();
    return normalized || undefined;
};

const getClientIp = (request: Request) =>
    getClientIpFromHeader(
        request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            request.headers.get("cf-connecting-ip")
    );

const getCookieValue = (request: Request, key: string) => {
    const rawCookie = request.headers.get("cookie");
    if (!rawCookie) return undefined;

    const cookies = rawCookie.split(";").map((part) => part.trim());
    const cookie = cookies.find((part) => part.startsWith(`${key}=`));
    if (!cookie) return undefined;

    const value = cookie.slice(key.length + 1);
    try {
        return normalizeValue(decodeURIComponent(value));
    } catch {
        return normalizeValue(value);
    }
};

const buildFbcFromFbclid = (fbclid: string, timestampMs = Date.now()) =>
    `fb.1.${timestampMs}.${fbclid}`;

const deriveFbcFromEventSourceUrl = (eventSourceUrl?: string, requestUrl?: string) => {
    if (!eventSourceUrl) return undefined;

    try {
        const parsedUrl = new URL(eventSourceUrl, requestUrl);
        const fbclid = normalizeValue(parsedUrl.searchParams.get("fbclid"));
        if (!fbclid) return undefined;
        return buildFbcFromFbclid(fbclid);
    } catch {
        return undefined;
    }
};

const pickFirstDefined = (...values: Array<string | undefined>) =>
    values.map((value) => normalizeValue(value)).find(Boolean);

export async function POST(request: Request) {
    let body: BrowserMetaEventPayload;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body.eventName || !ALLOWED_EVENTS.has(body.eventName)) {
        return NextResponse.json(
            { success: false, error: "Unsupported or missing event name" },
            { status: 400 }
        );
    }

    const bodyFbp = normalizeValue(body.userData?.fbp);
    const bodyFbc = normalizeValue(body.userData?.fbc);

    const cookieFbp = getCookieValue(request, "_fbp");
    const cookieFbc = getCookieValue(request, "_fbc");
    const derivedFbc = deriveFbcFromEventSourceUrl(body.eventSourceUrl, request.url);

    const fbp = pickFirstDefined(bodyFbp, cookieFbp);
    const fbc = pickFirstDefined(bodyFbc, cookieFbc, derivedFbc);
    const clientIpAddress = getClientIp(request);
    const clientUserAgent = normalizeValue(request.headers.get("user-agent"));

    if (DEBUG_MATCH_KEYS) {
        console.info("Meta CAPI match key presence", {
            eventName: body.eventName,
            hasBodyFbp: Boolean(bodyFbp),
            hasBodyFbc: Boolean(bodyFbc),
            hasCookieFbp: Boolean(cookieFbp),
            hasCookieFbc: Boolean(cookieFbc),
            hasDerivedFbc: Boolean(derivedFbc),
            hasFinalFbp: Boolean(fbp),
            hasFinalFbc: Boolean(fbc),
            hasClientIpAddress: Boolean(clientIpAddress),
            hasClientUserAgent: Boolean(clientUserAgent),
        });
    }

    const result = await sendMetaEvent({
        eventName: body.eventName,
        eventId: body.eventId,
        eventSourceUrl: body.eventSourceUrl,
        customData: body.customData,
        userData: {
            ...body.userData,
            fbp,
            fbc,
            clientIpAddress,
            clientUserAgent,
        },
    });

    if (!result.success) {
        return NextResponse.json(
            { success: false, error: result.error || "Failed to send Meta CAPI event" },
            { status: 502 }
        );
    }

    return NextResponse.json({ success: true });
}
