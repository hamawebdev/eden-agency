import { NextResponse } from "next/server";
import { z } from "zod";

// Contact form schema for server-side validation
const ContactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// Format message for Telegram with clear labels
function formatTelegramMessage(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Algiers",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
📬 *New Contact Form Submission*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone || "Not provided"}
💬 *Message:*
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 *Submitted:* ${timestamp}
  `.trim();
}

// Send message to Telegram Bot
async function sendToTelegram(message: string): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram credentials not configured");
    return { success: false, error: "Telegram not configured" };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      return { success: false, error: result.description || "Failed to send message" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return { success: false, error: "Network error" };
  }
}

export async function POST(request: Request) {
  let body: ContactFormData;

  // Parse request body
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Server-side validation
  const validation = ContactFormSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return NextResponse.json(
      { success: false, error: "Validation failed", errors },
      { status: 400 }
    );
  }

  // Format and send message to Telegram
  const message = formatTelegramMessage(validation.data);
  const result = await sendToTelegram(message);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, message: "Message sent successfully" });
}
