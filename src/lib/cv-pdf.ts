/**
 * CV PDF Generator
 * Utilise browser.ts pour générer un PDF depuis du HTML
 */

import { renderHtmlToPdf } from "./browser";

export async function generateCvPdfBuffer(html: string): Promise<Uint8Array> {
  return renderHtmlToPdf({
    html,
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
  });
}
