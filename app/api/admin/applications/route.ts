import { NextResponse } from "next/server";
import { z } from "zod";
import { addApplication, readAdminStore, setApplicationStatus } from "@/admin/store";
import { getAdminSession } from "@/lib/admin-auth";

const CreateApplicationSchema = z.object({
  company: z.string().trim().min(2).max(140),
  role: z.string().trim().min(2).max(140),
  personaId: z.string().trim().min(2).max(140),
  source: z.string().trim().min(1).max(120),
  status: z.enum(["target", "applied", "interview", "offer", "rejected"]).optional(),
});

const UpdateApplicationSchema = z.object({
  applicationId: z.string().trim().min(3),
  status: z.enum(["target", "applied", "interview", "offer", "rejected"]),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readAdminStore();
  return NextResponse.json({ applications: store.applications, personas: store.personas });
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

  const parsed = CreateApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application payload." }, { status: 400 });
  }

  try {
    const store = await addApplication({
      company: parsed.data.company,
      role: parsed.data.role,
      personaId: parsed.data.personaId,
      source: parsed.data.source,
      status: parsed.data.status,
    });
    return NextResponse.json({ applications: store.applications }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create application." },
      { status: 400 }
    );
  }
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

  const parsed = UpdateApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application update payload." }, { status: 400 });
  }

  try {
    const store = await setApplicationStatus(parsed.data.applicationId, parsed.data.status);
    return NextResponse.json({ applications: store.applications });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update application." },
      { status: 404 }
    );
  }
}
