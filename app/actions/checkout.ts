"use server";

import { headers } from "next/headers";
import { getClientIpFromHeader, sendMetaEvent } from "@/lib/meta-conversions";

type CheckoutOrderItem = {
    id?: string;
    name?: string;
    quantity?: number;
    price?: number;
};

type CheckoutOrderData = {
    email?: string;
    fullName?: string;
    phone?: string;
    items?: CheckoutOrderItem[];
    totalAmount?: number;
    metaEventId?: string;
    metaEventSourceUrl?: string;
    metaBrowserData?: {
        fbp?: string;
        fbc?: string;
    };
};

const toOrderData = (value: unknown): CheckoutOrderData => {
    if (!value || typeof value !== "object") return {};
    return value as CheckoutOrderData;
};

const getFirstName = (fullName?: string) => fullName?.trim().split(/\s+/).filter(Boolean)[0];

const toMetaContents = (items?: CheckoutOrderItem[]) =>
    (items || []).map((item) => ({
        id: item.id || "",
        quantity: item.quantity || 1,
        item_price: item.price || 0,
    }));

const submitOrderToSheet = async (webhookUrl: string, orderData: unknown) => {
    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        console.error("Failed to submit order to Google Sheet", response.statusText);
        return { success: false, error: "Failed to submit order" };
    }

    return { success: true };
};

const submitPurchaseToMeta = async (orderData: CheckoutOrderData) => {
    const headerList = await headers();
    const contentIds = (orderData.items || []).map((item) => item.id).filter(Boolean) as string[];
    const contents = toMetaContents(orderData.items);

    const ipHeader =
        headerList.get("x-forwarded-for") ||
        headerList.get("x-real-ip") ||
        headerList.get("cf-connecting-ip");

    return sendMetaEvent({
        eventName: "Purchase",
        eventId: orderData.metaEventId,
        eventSourceUrl: orderData.metaEventSourceUrl || headerList.get("referer") || undefined,
        customData: {
            currency: "DZD",
            value: orderData.totalAmount || 0,
            content_ids: contentIds,
            contents,
            num_items: contents.reduce((sum, item) => sum + item.quantity, 0),
            content_type: "product",
        },
        userData: {
            email: orderData.email,
            firstName: getFirstName(orderData.fullName),
            phone: orderData.phone,
            fbp: orderData.metaBrowserData?.fbp,
            fbc: orderData.metaBrowserData?.fbc,
            clientIpAddress: getClientIpFromHeader(ipHeader),
            clientUserAgent: headerList.get("user-agent") || undefined,
        },
    });
};

export async function submitOrderToGoogleSheet(orderData: unknown) {
    const parsedOrderData = toOrderData(orderData);
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    try {
        if (!webhookUrl) {
            console.warn("GOOGLE_SHEET_WEBHOOK_URL is not defined in environment variables.");
        }

        const sheetResult = webhookUrl
            ? await submitOrderToSheet(webhookUrl, orderData)
            : { success: true };

        if (!sheetResult.success) {
            return { success: false, error: sheetResult.error || "Failed to submit order" };
        }

        const metaResult = await submitPurchaseToMeta(parsedOrderData);
        if (!metaResult.success) {
            console.warn("Meta Purchase event was not sent successfully:", metaResult.error);
        }

        return { success: true, metaTracked: metaResult.success };
    } catch (error) {
        console.error("Error submitting order / Meta event:", error);
        return { success: false, error: "Error submitting order" };
    }
}
