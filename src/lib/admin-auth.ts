import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { markAdminLogin, readAdminStore } from "@/admin/store";
import { verifyPassword } from "@/lib/password";

const ADMIN_COOKIE_NAME = "yoann_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

interface SessionPayload {
  sub: "admin";
  email: string;
  iat: number;
  exp: number;
  nonce: string;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-this-admin-session-secret";
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payloadEncoded: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payloadEncoded).digest("base64url");
}

function safeCompare(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

export function createAdminSessionToken(email: string) {
  const now = Math.floor(Date.now() / 1000);

  const payload: SessionPayload = {
    sub: "admin",
    email,
    iat: now,
    exp: now + SESSION_DURATION_SECONDS,
    nonce: crypto.randomBytes(8).toString("hex"),
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  if (!safeCompare(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (payload.sub !== "admin") return null;
    if (payload.exp <= now) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export async function isAdminCredentialsValid(input: { email: string; password: string }) {
  const store = await readAdminStore();
  const normalizedEmail = input.email.trim().toLowerCase();
  const user = store.adminUsers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!user || !user.isActive) {
    return {
      ok: false,
      message: "Invalid credentials.",
    } as const;
  }

  const passwordOk = verifyPassword(input.password, user.passwordSalt, user.passwordHash);
  if (!passwordOk) {
    return {
      ok: false,
      message: "Invalid credentials.",
    } as const;
  }

  await markAdminLogin(user.email);

  return { ok: true as const, message: "ok", email: user.email };
}

export function attachAdminSession(response: NextResponse, token: string) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export const adminCookieName = ADMIN_COOKIE_NAME;
