import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readAdminStore } from "@/admin/store";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readAdminStore();

  return NextResponse.json({
    activities: store.activities,
    personas: store.personas,
    experienceAssets: store.experienceAssets,
    applications: store.applications,
    contentSnapshots: store.contentSnapshots,
    updatedAt: store.updatedAt,
  });
}
