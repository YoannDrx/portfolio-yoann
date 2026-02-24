import { generateProfileImage } from "@/lib/profile-image-generator";
import { NextRequest, NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const HALO_COLOR_MAP: Record<string, string | null> = {
  blue: "#007AFF",
  indigo: "#5856D6",
  teal: "#5AC8FA",
  green: "#34C759",
  pink: "#FF2D55",
  orange: "#FF9500",
  violet: "#AF52DE",
  none: null,
};

const HALO_LABEL_FR: Record<string, string> = {
  blue: "Bleu",
  indigo: "Indigo",
  teal: "Cyan",
  green: "Vert",
  pink: "Rose",
  orange: "Orange",
  violet: "Violet",
};

const BG_LABEL_FR: Record<string, string> = {
  dark: "Fond-Sombre",
  light: "Fond-Clair",
  primary: "Fond-Primaire",
  midnight: "Fond-Midnight",
  ocean: "Fond-Ocean",
  forest: "Fond-Forest",
  plum: "Fond-Plum",
  sunset: "Fond-Sunset",
  royal: "Fond-Royal",
};

// Output dimensions (must match profile-image-generator.ts constants)
const DIMS: Record<string, { w: number; h: number }> = {
  raw: { w: 1024, h: 1536 },
  portrait: { w: 1400, h: 2100 },
  circle: { w: 1024, h: 1024 },
  square: { w: 1024, h: 1024 },
};

function generateFilename(
  shape: "portrait" | "circle" | "square" | "raw",
  background: string,
  halo: string | null,
  width: number,
  height: number
): string {
  if (shape === "raw") {
    return `Yoann_Andrieux_Portrait_Brut_${width}x${height}.png`;
  }

  const baseShape =
    shape === "portrait" ? "Portrait" : shape === "square" ? "Carre" : "Medaillon";
  let suffix = "";

  if (halo && halo !== "none") {
    suffix = `_Halo-${HALO_LABEL_FR[halo] || halo}`;
  } else if (background !== "transparent") {
    suffix = `_${BG_LABEL_FR[background] || background}`;
  }

  const ext = "png";
  return `Yoann_Andrieux_${baseShape}${suffix}_${width}x${height}.${ext}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get("preview") === "true";

    // Rate limit only actual downloads, not preview thumbnails
    if (!preview) {
      const clientIp = getClientIp(request);
      if (isRateLimited(clientIp, { namespace: "download-profile", windowMs: 60_000, max: 5 })) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    }

    const shape =
      (searchParams.get("shape") as "portrait" | "circle" | "square" | "raw") ||
      "portrait";
    const background =
      (searchParams.get("bg") as
        | "transparent"
        | "dark"
        | "light"
        | "primary"
        | "midnight"
        | "ocean"
        | "forest"
        | "plum"
        | "sunset"
        | "royal") || "transparent";
    const haloParam = searchParams.get("halo") || "none";

    if (!["portrait", "circle", "square", "raw"].includes(shape)) {
      return NextResponse.json({ error: "Invalid shape parameter" }, { status: 400 });
    }
    if (
      ![
        "transparent",
        "dark",
        "light",
        "primary",
        "midnight",
        "ocean",
        "forest",
        "plum",
        "sunset",
        "royal",
      ].includes(background)
    ) {
      return NextResponse.json({ error: "Invalid background parameter" }, { status: 400 });
    }
    if (!Object.keys(HALO_COLOR_MAP).includes(haloParam)) {
      return NextResponse.json({ error: "Invalid halo parameter" }, { status: 400 });
    }

    const haloColor = HALO_COLOR_MAP[haloParam];
    const dims = DIMS[shape];

    const imageBuffer = await generateProfileImage({
      shape,
      background,
      haloColor,
      preview,
    });

    const filename = generateFilename(
      shape,
      background,
      haloParam === "none" ? null : haloParam,
      dims.w,
      dims.h
    );

    const contentType = "image/png";

    const response = new NextResponse(new Uint8Array(imageBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": preview
          ? "public, s-maxage=86400, stale-while-revalidate=604800"
          : "no-store",
      },
    });

    if (!preview) {
      response.headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    }

    return response;
  } catch (error) {
    console.error("Profile image generation error:", error);
    return NextResponse.json({ error: "Failed to generate profile image" }, { status: 500 });
  }
}
