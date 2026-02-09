import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeOffer } from "@/admin/logic/offer-matching";
import { readAdminStore } from "@/admin/store";
import { getAdminSession } from "@/lib/admin-auth";

const AnalyzeSchema = z.object({
  offerText: z.string().trim().min(40).max(25000),
  personaId: z.string().trim().min(2).max(120),
});

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = AnalyzeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid analyze payload." }, { status: 400 });
  }

  try {
    const store = await readAdminStore();
    const analysis = analyzeOffer({
      offerText: parsed.data.offerText,
      personaId: parsed.data.personaId,
    }, {
      personas: store.personas,
      experienceAssets: store.experienceAssets,
    });
    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unexpected error.",
      },
      { status: 500 }
    );
  }
}
