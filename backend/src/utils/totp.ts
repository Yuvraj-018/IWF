import crypto from "crypto";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateBase32Secret(byteLength = 20): string {
  const buffer = crypto.randomBytes(byteLength);
  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

export function base32ToBuffer(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/=+$/, "").replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(clean[i]);
    if (idx === -1) continue;

    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

/**
 * Generate 6-digit TOTP token for given secret and counter
 */
export function generateTOTPCode(secretBase32: string, timeStep = 30, forTime = Date.now()): string {
  const counter = Math.floor(forTime / 1000 / timeStep);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter));

  const key = base32ToBuffer(secretBase32);
  const hmac = crypto.createHmac("sha1", key).update(counterBuffer).digest();

  const offset = hmac[hmac.length - 1] & 0x0f;
  const codeInt =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = codeInt % 1000000;
  return otp.toString().padStart(6, "0");
}

/**
 * Verifies TOTP code against secret with +/- 1 time-step tolerance
 */
export function verifyTOTPCode(secretBase32: string, token: string, timeStep = 30): boolean {
  if (!token || !secretBase32) return false;
  const cleanToken = token.trim();
  if (cleanToken.length !== 6) return false;

  const now = Date.now();
  const windows = [-1, 0, 1];

  for (const win of windows) {
    const checkTime = now + win * timeStep * 1000;
    const generated = generateTOTPCode(secretBase32, timeStep, checkTime);
    if (crypto.timingSafeEqual(Buffer.from(cleanToken, "utf8"), Buffer.from(generated, "utf8"))) {
      return true;
    }
  }

  return false;
}

/**
 * Generates OTPAuth URI for QR code generation
 */
export function getOtpAuthUri(email: string, secret: string, issuer = "ISLAH Welfare Foundation"): string {
  const encodedIssuer = encodeURIComponent(issuer);
  const label = `${encodedIssuer}:${encodeURIComponent(email)}`;
  return `otpauth://totp/${label}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Generates 8 random recovery codes and their SHA256 hashes
 */
export function generateRecoveryCodes(count = 8): { plainCodes: string[]; hashedCodes: string[] } {
  const plainCodes: string[] = [];
  const hashedCodes: string[] = [];

  for (let i = 0; i < count; i++) {
    const raw = crypto.randomBytes(5).toString("hex").toUpperCase(); // 10 chars
    const formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    plainCodes.push(formatted);
    const hash = crypto.createHash("sha256").update(formatted).digest("hex");
    hashedCodes.push(hash);
  }

  return { plainCodes, hashedCodes };
}

export function verifyAndConsumeRecoveryCode(
  providedCode: string,
  storedHashedCodes: string[]
): { valid: boolean; remainingHashedCodes: string[] } {
  const clean = providedCode.trim().toUpperCase();
  const hash = crypto.createHash("sha256").update(clean).digest("hex");

  const idx = storedHashedCodes.indexOf(hash);
  if (idx === -1) {
    return { valid: false, remainingHashedCodes: storedHashedCodes };
  }

  const remaining = [...storedHashedCodes];
  remaining.splice(idx, 1);
  return { valid: true, remainingHashedCodes: remaining };
}
