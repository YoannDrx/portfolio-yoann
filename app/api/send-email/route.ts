import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import ContactFormEmail from "@/emails/contact-form.email";
import { z } from "zod";

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(4000),
  subject: z.string().trim().max(150).optional(),
  // Honeypot field (must stay empty)
  company: z.string().optional(),
});

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientId, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  rateLimitStore.set(clientId, { ...entry, count: entry.count + 1 });
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez plus tard." },
        { status: 429 }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Requête invalide" },
        { status: 400 }
      );
    }

    const payload = ContactPayloadSchema.safeParse(rawBody);
    if (!payload.success) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    const { name, email, message, subject, company } = payload.data;

    // Honeypot: if filled, pretend success but don't send anything
    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Service email non configuré" },
        { status: 503 }
      );
    }

    // Email de destination (ton email)
    const toEmail = process.env.CONTACT_EMAIL || "yoann.andrieux@gmail.com";

    // Domaine d'envoi
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

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

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject?.trim() || `💬 Nouveau message de ${name}`,
      replyTo: email,
      html: emailHtml,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
