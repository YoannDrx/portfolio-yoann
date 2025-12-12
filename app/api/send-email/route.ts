import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import ContactFormEmail from "@/emails/contact-form.email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, subject } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email invalide" },
        { status: 400 }
      );
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
      subject: subject || `💬 Nouveau message de ${name}`,
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
