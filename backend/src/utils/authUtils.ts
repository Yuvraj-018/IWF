import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("FATAL: JWT_SECRET environment variable is missing. Startup aborted.");
  }
  return secret;
}

// Fail-fast boot check: guarantees secret is defined
const JWT_SECRET = getJwtSecret();

/**
 * High-security password hashing using native scrypt with unique salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!password || !stored || !stored.includes(":")) return false;
  const [salt, originalHash] = stored.split(":");
  if (!salt || !originalHash) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  try {
    const hashBuf = Buffer.from(hash, "utf8");
    const origBuf = Buffer.from(originalHash, "utf8");
    if (hashBuf.length !== origBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, origBuf);
  } catch {
    return false;
  }
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString();
}

/**
 * Signs a standard JWT with 12h validity
 */
export function signToken(payload: Record<string, any>, expiresInHours = 12): string {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const fullPayload = { ...payload, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Validates JWT signature and expiration with timing-safe comparison
 */
export function verifyToken(token: string): { valid: boolean; payload?: any } {
  if (!token) return { valid: false };
  const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
  const parts = cleanToken.split(".");
  if (parts.length !== 3) return { valid: false };

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  // Constant-time signature verification
  const sigBuf = Buffer.from(signature, "utf8");
  const expectedSigBuf = Buffer.from(expectedSignature, "utf8");
  if (sigBuf.length !== expectedSigBuf.length || !crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return { valid: false };
    }
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
