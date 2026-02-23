/**
 * CV PDF Generator
 * Utilise playwright-core pour générer un PDF depuis du HTML
 */

import { launchBrowser } from "./browser";

export async function generateCvPdfBuffer(html: string): Promise<Uint8Array> {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const bytes = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    return bytes;
  } finally {
    await browser.close();
  }
}
