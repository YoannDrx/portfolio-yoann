import { renderCvHtml } from "@/lib/cv-renderer";
import { generateCvPdfBuffer } from "@/lib/cv-pdf";
import { isLocale } from "@/i18n/locales";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const locale = isLocale(body.locale) ? body.locale : "fr";

  const html = renderCvHtml(locale);
  const pdfBytes = await generateCvPdfBuffer(html);

  const filename =
    locale === "en"
      ? "Resume_Yoann_Andrieux_2026.pdf"
      : "CV_Yoann_Andrieux_2026.pdf";

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
