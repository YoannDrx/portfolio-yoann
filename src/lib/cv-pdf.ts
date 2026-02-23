/**
 * CV PDF Generator
 * Utilise playwright-core pour générer un PDF depuis du HTML
 */

export async function generateCvPdfBuffer(html: string): Promise<Uint8Array> {
  const isVercel = !!process.env.VERCEL;

  let browser;

  if (isVercel) {
    const chromium = await import("@sparticuz/chromium");
    const { chromium: playwrightChromium } = await import("playwright-core");
    browser = await playwrightChromium.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  } else {
    const { chromium: playwrightChromium } = await import("playwright-core");
    browser = await playwrightChromium.launch({ headless: true });
  }

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
