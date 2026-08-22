import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import ContactFormEmail from "@/emails/contact-form.email";
import { z } from "zod";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

type ContactEmailInput = {
  emailHtml: string;
  fromEmail: string;
  idempotencyKey: string;
  locale: "fr" | "en";
  message: string;
  name: string;
  replyTo: string;
  subject: string;
  toEmail: string;
};

type ContactEmailResult = {
  id: string;
  status: string;
};

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

function contactEmailProvider() {
  return process.env.CONTACT_EMAIL_PROVIDER === "yodev_mail"
    ? "yodev_mail"
    : "resend";
}

async function sendWithResend(input: ContactEmailInput): Promise<ContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("resend_not_configured");

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(
    {
      from: input.fromEmail,
      to: [input.toEmail],
      subject: input.subject,
      replyTo: input.replyTo,
      html: input.emailHtml,
    },
    { idempotencyKey: input.idempotencyKey },
  );

  if (error || !data?.id) throw new Error("resend_delivery_failed");
  return { id: data.id, status: "accepted" };
}

async function sendWithYodevMail(input: ContactEmailInput): Promise<ContactEmailResult> {
  const apiKey = process.env.YODEV_MAIL_API_KEY;
  const templateId = process.env.YODEV_MAIL_TEMPLATE_ID;
  if (!apiKey || !templateId) throw new Error("yodev_mail_not_configured");

  const apiUrl = process.env.YODEV_MAIL_API_URL ?? "https://api.mail.yodev.fr";
  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/emails`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      "idempotency-key": input.idempotencyKey,
    },
    body: JSON.stringify({
      from: { email: input.fromEmail, name: "Portfolio Yoann" },
      to: { email: input.toEmail },
      replyTo: input.replyTo,
      category: "portfolio_contact",
      content: {
        templateId,
        variables: {
          locale: input.locale,
          message: input.message,
          senderEmail: input.replyTo,
          senderName: input.name,
        },
      },
      metadata: { referenceId: input.idempotencyKey },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });

  const payload = await response.json().catch(() => null) as {
    data?: { id?: string; status?: string };
    error?: { code?: string };
  } | null;
  if (!response.ok || !payload?.data?.id || !payload.data.status) {
    console.error("Mail by Yodev rejected portfolio contact", {
      code: payload?.error?.code ?? "invalid_response",
      referenceId: input.idempotencyKey,
      status: response.status,
    });
    throw new Error("yodev_mail_delivery_failed");
  }

  return {
    id: payload.data.id,
    status: payload.data.status,
  };
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

    const provider = contactEmailProvider();
    const toEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? process.env.RESEND_FROM_EMAIL;
    const providerConfigured = provider === "yodev_mail"
      ? Boolean(process.env.YODEV_MAIL_API_KEY && process.env.YODEV_MAIL_TEMPLATE_ID)
      : Boolean(process.env.RESEND_API_KEY);
    if (!toEmail || !fromEmail || !providerConfigured) {
      return NextResponse.json(
        { error: messages.emailNotConfigured },
        { status: 503 }
      );
    }

    const requestId = request.headers.get("x-contact-request-id");
    if (!requestId || !/^[a-f0-9-]{36}$/i.test(requestId)) {
      return NextResponse.json(
        { error: messages.invalidRequest },
        { status: 400 },
      );
    }
    const idempotencyKey = `portfolio-contact:${requestId}`;

    const emailHtml = provider === "resend"
      ? await render(
        ContactFormEmail({
          senderName: name,
          senderEmail: email,
          message,
          sentAt: new Date(),
        }),
      )
      : "";

    const input: ContactEmailInput = {
      emailHtml,
      fromEmail,
      idempotencyKey,
      locale,
      message,
      name,
      replyTo: email,
      subject: subject?.trim() || messages.newMessageSubject(name),
      toEmail,
    };
    const data = provider === "yodev_mail"
      ? await sendWithYodevMail(input)
      : await sendWithResend(input);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const code = error instanceof Error ? error.message : "unknown_error";
    console.error("Portfolio contact delivery failed", { code });
    return NextResponse.json(
      { error: messages.internalError },
      { status: 502 }
    );
  }
}
