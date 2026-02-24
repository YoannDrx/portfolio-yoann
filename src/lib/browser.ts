/**
 * Browser renderer — HTML to PNG screenshot & PDF
 * Uses puppeteer-core + @sparticuz/chromium on Vercel (serverless),
 * and playwright-core locally (dev).
 */

export interface RenderOptions {
  html: string;
  width: number;
  height: number;
  fullPage?: boolean;
  omitBackground?: boolean;
}

export async function renderHtmlToImage(options: RenderOptions): Promise<Buffer> {
  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    return renderWithPuppeteer(options);
  }
  return renderWithPlaywright(options);
}

async function renderWithPuppeteer(options: RenderOptions): Promise<Buffer> {
  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = (await import("puppeteer-core")).default;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: options.width, height: options.height });
    await page.setContent(options.html, { waitUntil: "networkidle0" });

    const screenshot = await page.screenshot({
      type: "png",
      fullPage: options.fullPage ?? true,
      omitBackground: options.omitBackground ?? false,
    });

    await page.close();
    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}

async function renderWithPlaywright(options: RenderOptions): Promise<Buffer> {
  const { chromium } = await import("playwright-core");
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: options.width, height: options.height });
    await page.setContent(options.html, { waitUntil: "networkidle" });

    const screenshot = await page.screenshot({
      type: "png",
      fullPage: options.fullPage ?? true,
      omitBackground: options.omitBackground ?? false,
    });

    await page.close();
    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}

// ─── PDF Generation ─────────────────────────────────────────────

export interface PdfOptions {
  html: string;
  format?: "A4" | "Letter";
  printBackground?: boolean;
  margin?: { top: string; right: string; bottom: string; left: string };
}

export async function renderHtmlToPdf(options: PdfOptions): Promise<Uint8Array> {
  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    return pdfWithPuppeteer(options);
  }
  return pdfWithPlaywright(options);
}

async function pdfWithPuppeteer(options: PdfOptions): Promise<Uint8Array> {
  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = (await import("puppeteer-core")).default;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(options.html, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");

    const bytes = await page.pdf({
      format: options.format ?? "A4",
      printBackground: options.printBackground ?? true,
      margin: options.margin ?? { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    return new Uint8Array(bytes);
  } finally {
    await browser.close();
  }
}

async function pdfWithPlaywright(options: PdfOptions): Promise<Uint8Array> {
  const { chromium } = await import("playwright-core");
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setContent(options.html, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const bytes = await page.pdf({
      format: options.format ?? "A4",
      printBackground: options.printBackground ?? true,
      margin: options.margin ?? { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    return bytes;
  } finally {
    await browser.close();
  }
}
