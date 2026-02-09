import { NextResponse } from "next/server";
import { z } from "zod";
import { addPersona, readAdminStore } from "@/admin/store";
import { getAdminSession } from "@/lib/admin-auth";

const CreatePersonaSchema = z.object({
  activityId: z.enum(["software", "event", "courier"]),
  name: z.string().trim().min(2).max(120),
  headline: z.string().trim().min(2).max(220),
  targetRoles: z.array(z.string().trim().min(2).max(120)).min(1).max(10),
  baseSummary: z.string().trim().min(10).max(1200),
  coreSkills: z.array(z.string().trim().min(1).max(60)).min(1).max(24),
  atsKeywords: z.array(z.string().trim().min(1).max(60)).min(1).max(30),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readAdminStore();
  return NextResponse.json({ personas: store.personas });
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

  const parsed = CreatePersonaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid persona payload." }, { status: 400 });
  }

  const store = await addPersona({
    activityId: parsed.data.activityId,
    name: parsed.data.name,
    headline: parsed.data.headline,
    targetRoles: parsed.data.targetRoles,
    baseSummary: parsed.data.baseSummary,
    coreSkills: parsed.data.coreSkills,
    atsKeywords: parsed.data.atsKeywords,
  });
  return NextResponse.json({ personas: store.personas }, { status: 201 });
}
