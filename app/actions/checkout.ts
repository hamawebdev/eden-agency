"use server";

export async function submitOrderToGoogleSheet(orderData: unknown) {
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn("GOOGLE_SHEET_WEBHOOK_URL is not defined in environment variables.");
        // We return success anyway so the user's checkout flow works locally without a sheet
        return { success: true };
    }

    try {
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
    } catch (error) {
        console.error("Error submitting order to Google Sheet:", error);
        return { success: false, error: "Error submitting order" };
    }
}
