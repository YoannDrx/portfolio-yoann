import { launchBrowser } from "@/lib/browser";
import { renderBannerHtml, type BannerDesign } from "@/lib/banner-renderer";
import sharp from "sharp";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const design = (searchParams.get("design") || "dark-gradient") as BannerDesign;
    const preview = searchParams.get("preview") === "true";

    const validDesigns: BannerDesign[] = [
      "dark-gradient",
      "minimal-light",
      "gradient-mesh",
      "code-terminal",
      "portrait",
    ];

    if (!validDesigns.includes(design)) {
      return new Response("Invalid design parameter", { status: 400 });
    }

    const html = renderBannerHtml(design);

    let browser;
    try {
      browser = await launchBrowser();
      const page = await browser.newPage();

      await page.setViewportSize({ width: 1584, height: 396 });
      await page.setContent(html, { waitUntil: "networkidle" });

      let screenshot = await page.screenshot({ type: "png", fullPage: true });

      if (preview) {
        screenshot = await sharp(screenshot)
          .resize(792, 198, { fit: "cover" })
          .png()
          .toBuffer();
      }

      await page.close();
      await browser.close();

      const designPascalCase = design
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-");

      const filename = `Yoann_Andrieux_Banner_${designPascalCase}_1584x396.png`;

      const headers: Record<string, string> = {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      };

      if (!preview) {
        headers["Content-Disposition"] = `attachment; filename="${filename}"`;
      }

      return new Response(screenshot, { headers });
    } finally {
      if (browser) {
        await browser.close().catch(() => {});
      }
    }
  } catch (error) {
    console.error("Banner screenshot error:", error);
    return new Response("Failed to generate banner", { status: 500 });
  }
}
