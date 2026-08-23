import { renderCvHtml } from "@/lib/cv-renderer";
import { generateCvPdfBuffer } from "@/lib/cv-pdf";
import { isLocale } from "@/i18n/locales";

export const maxDuration = 60;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const locale = isLocale(body.locale) ? body.locale : "fr";
  const html = renderCvHtml(locale);
  const pdfBytes = await generateCvPdfBuffer(html);

  const prefix = locale === "en" ? "Resume" : "CV";
  const filename = `${prefix}_Yoann_Andrieux_2026.pdf`;

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
