import { generateProfileImage } from "@/lib/profile-image-generator";
import { NextRequest, NextResponse } from "next/server";

const HALO_COLOR_MAP: Record<string, string | null> = {
  blue: "#007AFF",
  indigo: "#5856D6",
  teal: "#5AC8FA",
  green: "#34C759",
  pink: "#FF2D55",
  none: null,
};

const HALO_LABEL_FR: Record<string, string> = {
  blue: "Bleu",
  indigo: "Indigo",
  teal: "Cyan",
  green: "Vert",
  pink: "Rose",
};

const BG_LABEL_FR: Record<string, string> = {
  dark: "Fond-Sombre",
  light: "Fond-Clair",
  primary: "Fond-Primaire",
};

// Output dimensions (must match profile-image-generator.ts constants)
const DIMS: Record<string, { w: number; h: number }> = {
  raw: { w: 1024, h: 1536 },
  portrait: { w: 1400, h: 2100 },
  circle: { w: 1024, h: 1024 },
};

function generateFilename(
  shape: "portrait" | "circle" | "raw",
  background: string,
  halo: string | null,
  width: number,
  height: number
): string {
  if (shape === "raw") {
    return `Yoann_Andrieux_Portrait_Brut_${width}x${height}.png`;
  }

  const baseShape = shape === "portrait" ? "Portrait" : "Medaillon";
  let suffix = "";

  if (halo && halo !== "none") {
    suffix = `_Halo-${HALO_LABEL_FR[halo] || halo}`;
  } else if (background !== "transparent") {
    suffix = `_${BG_LABEL_FR[background] || background}`;
  }

  const ext = background === "transparent" ? "png" : "jpg";
  return `Yoann_Andrieux_${baseShape}${suffix}_${width}x${height}.${ext}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const shape = (searchParams.get("shape") as "portrait" | "circle" | "raw") || "portrait";
    const background = (searchParams.get("bg") as "transparent" | "dark" | "light" | "primary") || "transparent";
    const haloParam = searchParams.get("halo") || "none";
    const preview = searchParams.get("preview") === "true";

    if (!["portrait", "circle", "raw"].includes(shape)) {
      return NextResponse.json({ error: "Invalid shape parameter" }, { status: 400 });
    }
    if (!["transparent", "dark", "light", "primary"].includes(background)) {
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

    const contentType =
      shape === "raw" || background === "transparent" ? "image/png" : "image/jpeg";

    const response = new NextResponse(new Uint8Array(imageBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
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
