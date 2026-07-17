import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import ContactFormEmail from "@/emails/contact-form.email";
import { z } from "zod";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(20).max(4000),
  subject: z.string().trim().max(150).optional(),
  // Honeypot field (must stay empty)
  company: z.string().optional(),
});

function getLocale(request: NextRequest) {
  return request.headers.get("x-locale") === "en" ? "en" : "fr";
}

function getApiMessages(locale: "fr" | "en") {
  if (locale === "en") {
    return {
      tooManyRequests: "Too many requests. Please try again later.",
      invalidRequest: "Invalid request",
      invalidData: "Invalid data",
      emailNotConfigured: "Email service is not configured",
      internalError: "Internal server error",
      newMessageSubject: (name: string) => `💬 New message from ${name}`,
    } as const;
  }

  return {
    tooManyRequests: "Trop de demandes. Réessayez plus tard.",
    invalidRequest: "Requête invalide",
    invalidData: "Données invalides",
    emailNotConfigured: "Service email non configuré",
    internalError: "Erreur interne du serveur",
    newMessageSubject: (name: string) => `💬 Nouveau message de ${name}`,
  } as const;
}


export async function POST(request: NextRequest) {
  const locale = getLocale(request);
  const messages = getApiMessages(locale);

  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp, { namespace: "send-email", windowMs: 15 * 60 * 1000, max: 5 })) {
      return NextResponse.json(
        { error: messages.tooManyRequests },
        { status: 429 }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { error: messages.invalidRequest },
        { status: 400 }
      );
    }

    const payload = ContactPayloadSchema.safeParse(rawBody);
    if (!payload.success) {
      return NextResponse.json(
        { error: messages.invalidData },
        { status: 400 }
      );
    }

    const { name, email, message, subject, company } = payload.data;

    // Honeypot: if filled, pretend success but don't send anything
    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        { error: messages.emailNotConfigured },
        { status: 503 }
      );
    }

    // Render React template to HTML
    const emailHtml = await render(
      ContactFormEmail({
        senderName: name,
        senderEmail: email,
        message: message,
        sentAt: new Date(),
      })
    );

    // Dynamic import to avoid build-time errors
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const requestId = request.headers.get("x-contact-request-id");
    const idempotencyKey =
      requestId && /^[a-f0-9-]{36}$/i.test(requestId)
        ? `portfolio-contact-${requestId}`
        : undefined;
    const { data, error } = await resend.emails.send(
      {
        from: fromEmail,
        to: [toEmail],
        subject: subject?.trim() || messages.newMessageSubject(name),
        replyTo: email,
        html: emailHtml,
      },
      idempotencyKey ? { idempotencyKey } : undefined
    );

    if (error) {
      console.error("Resend delivery failed");
      return NextResponse.json(
        { error: messages.internalError },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: messages.internalError },
      { status: 500 }
    );
  }
}
