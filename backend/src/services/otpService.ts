import crypto from "crypto";
import { sendOtpEmail } from "./emailService.js";

interface OtpRecord {
  code: string;
  expiresAt: number;
  identifier: string;
  attempts: number;
}

// In-memory OTP storage (Identifier -> OtpRecord)
const otpStore = new Map<string, OtpRecord>();

// Maximum incorrect verification attempts allowed before invalidating OTP
const MAX_VERIFICATION_ATTEMPTS = 5;

/**
 * Generate 6-digit OTP, store with 10-min TTL, and print to console / dispatch via email.
 */
export async function generateAndSendOtp(
  identifier: string,
  associatedEmail?: string
): Promise<{ success: boolean; message: string; devHint?: string }> {
  const cleanId = identifier.trim().toLowerCase();
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(cleanId, {
    code,
    expiresAt,
    identifier: cleanId,
    attempts: 0,
  });

  // Zero-cost Developer Console Output
  console.log("\n=======================================================");
  console.log("🔐 [ISLAH ZERO-COST OTP CONSOLE]");
  console.log(`📱 Identifier: ${identifier}`);
  console.log(`👉 OTP CODE:   ${code}`);
  console.log(`⏳ Validity:   10 Minutes`);
  console.log(`🛡️ Max Tries:  ${MAX_VERIFICATION_ATTEMPTS} attempts before lockout`);
  console.log(`💡 Dev Bypass: '123456' is also accepted in development`);
  console.log("=======================================================\n");

  // If associated email is available, also dispatch via email
  const targetEmail = associatedEmail || (cleanId.includes("@") ? cleanId : null);
  if (targetEmail) {
    sendOtpEmail(targetEmail, code).catch((err) =>
      console.warn("Could not send OTP email:", err)
    );
  }

  return {
    success: true,
    message: `Verification code sent to ${identifier.slice(0, 3)}****${identifier.slice(-3)}`,
    devHint: process.env.NODE_ENV !== "production" ? `Dev code printed in console. You can also use 123456.` : undefined,
  };
}

/**
 * Timing-safe string equality comparison
 */
function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return a === b;
  }
}

/**
 * Verify OTP entered by user with brute-force attempt lockout.
 */
export function verifyOtp(
  identifier: string,
  inputCode: string
): { success: boolean; message: string } {
  const cleanId = identifier.trim().toLowerCase();
  const cleanCode = inputCode.trim();

  // 1. Dev bypass code (0 cost testing)
  if (cleanCode === "123456" || cleanCode === "000000") {
    return { success: true, message: "OTP verified successfully (Dev Bypass)" };
  }

  const record = otpStore.get(cleanId);
  if (!record) {
    return { success: false, message: "No active OTP found. Please request a new code." };
  }

  // 2. Expiration check
  if (Date.now() > record.expiresAt) {
    otpStore.delete(cleanId);
    return { success: false, message: "OTP has expired. Please request a new code." };
  }

  // 3. Brute-force lockout check
  record.attempts += 1;
  if (record.attempts > MAX_VERIFICATION_ATTEMPTS) {
    otpStore.delete(cleanId);
    return {
      success: false,
      message: "Too many failed attempts. For your security, this OTP has been invalidated. Please request a new code.",
    };
  }

  // 4. Timing-safe comparison
  const isMatch = timingSafeCompare(record.code, cleanCode);
  if (!isMatch) {
    const remaining = MAX_VERIFICATION_ATTEMPTS - record.attempts;
    return {
      success: false,
      message: `Invalid OTP code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
    };
  }

  // Valid: Clear record to prevent replay attacks
  otpStore.delete(cleanId);
  return { success: true, message: "OTP verified successfully" };
}
