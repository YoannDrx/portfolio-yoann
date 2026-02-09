import { NextResponse } from "next/server";
import { z } from "zod";
import {
  attachAdminSession,
  createAdminSessionToken,
  isAdminCredentialsValid,
} from "@/lib/admin-auth";

const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const loginRateLimitStore = new Map<string, { count: number; windowStart: number }>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const entry = loginRateLimitStore.get(clientId);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    loginRateLimitStore.set(clientId, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  loginRateLimitStore.set(clientId, {
    ...entry,
    count: entry.count + 1,
  });

  return false;
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: "Too many attempts. Please retry later." }, { status: 429 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials payload." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const validation = await isAdminCredentialsValid({ email, password });

  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 401 });
  }

  const token = createAdminSessionToken(validation.email || email);
  const response = NextResponse.json({ success: true });
  attachAdminSession(response, token);

  return response;
}
