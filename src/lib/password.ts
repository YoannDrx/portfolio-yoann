import crypto from "node:crypto";

function safeCompareHex(aHex: string, bHex: string) {
  const a = Buffer.from(aHex, "hex");
  const b = Buffer.from(bHex, "hex");

  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function hashPassword(password: string, salt?: string) {
  const normalizedSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, normalizedSalt, 64).toString("hex");

  return {
    salt: normalizedSalt,
    hash,
  };
}

export function verifyPassword(password: string, salt: string, expectedHash: string) {
  const actual = hashPassword(password, salt);
  return safeCompareHex(actual.hash, expectedHash);
}
