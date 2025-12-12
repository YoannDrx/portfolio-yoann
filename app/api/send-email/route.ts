import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, subject } = await request.json();

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    // Dynamic import to avoid build-time errors
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['yoann.andrieux@gmail.com'],
      subject: subject || `Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Nouveau message</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0070f3 0%, #00c4cc 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message depuis ton portfolio</h1>
            </div>

            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Nom:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e5e5e7;">
              <h3 style="margin: 0 0 15px 0; color: #1d1d1f;">Message:</h3>
              <p style="margin: 0; color: #424245; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #86868b; font-size: 12px; margin-top: 20px; text-align: center;">
              Ce message a été envoyé depuis ton portfolio.
            </p>
          </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
