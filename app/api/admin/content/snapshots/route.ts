import { NextResponse } from "next/server";
import { z } from "zod";
import { addSnapshot, publishSnapshot, readAdminStore } from "@/admin/store";
import { getAdminSession } from "@/lib/admin-auth";

const CreateSnapshotSchema = z.object({
  label: z.string().trim().min(2).max(180),
  notes: z.string().trim().max(500),
});

const PublishSnapshotSchema = z.object({
  snapshotId: z.string().trim().min(3),
  action: z.literal("publish"),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readAdminStore();
  return NextResponse.json({ snapshots: store.contentSnapshots });
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

  const parsed = CreateSnapshotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid snapshot payload." }, { status: 400 });
  }

  const store = await addSnapshot({
    label: parsed.data.label,
    notes: parsed.data.notes,
    updatedBy: session.email,
  });

  return NextResponse.json({ snapshots: store.contentSnapshots }, { status: 201 });
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

  const parsed = PublishSnapshotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid snapshot update payload." }, { status: 400 });
  }

  try {
    const store = await publishSnapshot(parsed.data.snapshotId);
    return NextResponse.json({ snapshots: store.contentSnapshots });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to publish snapshot." },
      { status: 404 }
    );
  }
}
