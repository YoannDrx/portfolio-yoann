/**
 * Browser launcher — shared Playwright chromium factory
 * Used by cv-pdf.ts and banner screenshot API
 */

import type { Browser } from "playwright-core";

export async function launchBrowser(): Promise<Browser> {
  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    const chromium = await import("@sparticuz/chromium");
    const { chromium: pw } = await import("playwright-core");
    return pw.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  }

  const { chromium: pw } = await import("playwright-core");
  return pw.launch({ headless: true });
}
