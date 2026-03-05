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

const getClientIp = (request: Request) =>
    getClientIpFromHeader(
        request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            request.headers.get("cf-connecting-ip")
    );

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

    const result = await sendMetaEvent({
        eventName: body.eventName,
        eventId: body.eventId,
        eventSourceUrl: body.eventSourceUrl,
        customData: body.customData,
        userData: {
            ...body.userData,
            clientIpAddress: getClientIp(request),
            clientUserAgent: request.headers.get("user-agent") || undefined,
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
