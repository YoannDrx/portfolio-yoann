import { NextResponse } from "next/server";
import { z } from "zod";
import { addAsset, readAdminStore, setAssetVerified } from "@/admin/store";
import { getAdminSession } from "@/lib/admin-auth";

const CreateAssetSchema = z.object({
  activityId: z.enum(["software", "event", "courier"]),
  title: z.string().trim().min(2).max(140),
  organization: z.string().trim().min(2).max(160),
  period: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(120),
  highlights: z.array(z.string().trim().min(2).max(220)).min(1).max(8),
  skills: z.array(z.string().trim().min(1).max(60)).min(1).max(16),
  metrics: z.array(z.string().trim().min(1).max(160)).max(8).optional(),
});

const UpdateAssetSchema = z.object({
  assetId: z.string().trim().min(3),
  verified: z.boolean(),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readAdminStore();
  return NextResponse.json({ assets: store.experienceAssets });
}

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

  const parsed = CreateAssetSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid asset payload." }, { status: 400 });
  }

  const store = await addAsset({
    activityId: parsed.data.activityId,
    title: parsed.data.title,
    organization: parsed.data.organization,
    period: parsed.data.period,
    location: parsed.data.location,
    highlights: parsed.data.highlights,
    skills: parsed.data.skills,
    metrics: parsed.data.metrics,
  });
  return NextResponse.json({ assets: store.experienceAssets }, { status: 201 });
}

export async function PATCH(request: Request) {
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

  const parsed = UpdateAssetSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid asset update payload." }, { status: 400 });
  }

  try {
    const store = await setAssetVerified(parsed.data.assetId, parsed.data.verified);
    return NextResponse.json({ assets: store.experienceAssets });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update asset." },
      { status: 404 }
    );
  }
}
