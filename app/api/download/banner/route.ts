import { renderHtmlToImage } from "@/lib/browser";
import { renderBannerHtml, type BannerDesign } from "@/lib/banner-renderer";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import sharp from "sharp";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const design = (searchParams.get("design") || "dark-gradient") as BannerDesign;
    const preview = searchParams.get("preview") === "true";

    // Rate limit only actual downloads, not preview thumbnails
    if (!preview) {
      const clientIp = getClientIp(request);
      if (isRateLimited(clientIp, { namespace: "download-banner", windowMs: 60_000, max: 5 })) {
        return new Response("Too many requests. Please try again later.", { status: 429 });
      }
    }
    const inline = searchParams.get("inline") === "true";

    const validDesigns: BannerDesign[] = [
      "dark-gradient",
      "minimal-light",
      "gradient-mesh",
      "code-terminal",
      "portrait",
      "portrait-indigo",
      "portrait-teal",
      "portrait-pink",
    ];

    if (!validDesigns.includes(design)) {
      return new Response("Invalid design parameter", { status: 400 });
    }

    const html = renderBannerHtml(design);

    let screenshot = await renderHtmlToImage({
      html,
      width: 1584,
      height: 396,
      fullPage: true,
    });

    if (preview) {
      screenshot = await sharp(screenshot)
        .resize(792, 198, { fit: "cover" })
        .png()
        .toBuffer();
    }

    const designPascalCase = design
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

    const filename = `Yoann_Andrieux_Banner_${designPascalCase}_1584x396.png`;

    const headers: Record<string, string> = {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    };

    if (!preview && !inline) {
      headers["Content-Disposition"] = `attachment; filename="${filename}"`;
    }

    return new Response(new Uint8Array(screenshot), { headers });
  } catch (error) {
    console.error("Banner screenshot error:", error);
    return new Response("Failed to generate banner", { status: 500 });
  }
}
