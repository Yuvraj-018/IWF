import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const CLOUDFLARE_DEMO_PASS_SECRET = "1x0000000000000000000000000000000AA";
const CLOUDFLARE_DEMO_FAIL_SECRET = "2x0000000000000000000000000000000AA";

export interface TurnstileVerificationResult {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export interface VerifyTurnstileOptions {
  action?: string;
  required?: boolean;
}

/**
 * Validates a Turnstile token against Cloudflare's canonical siteverify endpoint.
 */
export async function checkTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp?: string,
  idempotencyKey?: string
): Promise<TurnstileVerificationResult> {
  // If demo pass key is used with standard dummy test token, immediately succeed
  if (
    secretKey === CLOUDFLARE_DEMO_PASS_SECRET &&
    (!token || token === "XXXX.DUMMY.TOKEN.XXXX" || token.startsWith("1x") || token.startsWith("demo"))
  ) {
    return {
      success: true,
      challenge_ts: new Date().toISOString(),
      hostname: "localhost",
    };
  }

  // If demo fail key is used, immediately fail
  if (secretKey === CLOUDFLARE_DEMO_FAIL_SECRET) {
    return {
      success: false,
      "error-codes": ["invalid-input-response"],
    };
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }
  if (idempotencyKey) {
    formData.append("idempotency_key", idempotencyKey);
  }

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = (await res.json()) as TurnstileVerificationResult;
  return data;
}

/**
 * Canonical Cloudflare Turnstile Express Middleware
 * Supports optional options like { action: "contact" }
 */
export function createTurnstileMiddleware(options: VerifyTurnstileOptions = {}) {
  return async function verifyTurnstile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    // If no secret key is configured at all in development, pass through
    if (!secretKey) {
      if (process.env.NODE_ENV === "production") {
        console.error("❌ [TURNSTILE] Critical: TURNSTILE_SECRET_KEY is missing in production environment!");
      }
      return next();
    }

    // Extract token from body or headers
    const token =
      req.body?.turnstileToken ||
      req.body?.["cf-turnstile-response"] ||
      (req.headers["cf-turnstile-response"] as string);

    // Development bypass for demo key when no token is supplied in development test suites
    if (
      secretKey === CLOUDFLARE_DEMO_PASS_SECRET &&
      process.env.NODE_ENV !== "production" &&
      !token
    ) {
      return next();
    }

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Bot protection verification required (missing Turnstile token).",
        errorCodes: ["missing-input-response"],
      });
      return;
    }

    try {
      const clientIp = req.ip || req.socket.remoteAddress;
      const idempotencyKey = crypto.randomUUID();

      const verification = await checkTurnstileToken(
        token,
        secretKey,
        clientIp,
        idempotencyKey
      );

      if (!verification.success) {
        console.warn("[TURNSTILE] Validation failed:", verification["error-codes"]);

        // Handle specific Cloudflare error codes
        const errorCodes = verification["error-codes"] || [];
        let userMessage = "Security verification failed. Please refresh and try again.";
        if (errorCodes.includes("timeout-or-duplicate")) {
          userMessage = "Verification token expired or already used. Please complete the challenge again.";
        }

        res.status(403).json({
          success: false,
          message: userMessage,
          errorCodes,
        });
        return;
      }

      // If an expected action was configured, verify it matches
      if (options.action && verification.action && verification.action !== options.action) {
        console.warn(`[TURNSTILE] Action mismatch: expected '${options.action}', got '${verification.action}'`);
        res.status(403).json({
          success: false,
          message: "Verification action mismatch. Potential unauthorized submission.",
        });
        return;
      }

      return next();
    } catch (err: any) {
      console.error("[TURNSTILE] Siteverify network error:", err);
      // In development, fail-open to not block developers if internet is offline
      if (process.env.NODE_ENV !== "production" || secretKey === CLOUDFLARE_DEMO_PASS_SECRET) {
        return next();
      }

      res.status(500).json({
        success: false,
        message: "Unable to verify bot challenge at this time. Please try again shortly.",
      });
    }
  };
}

// Default instance for basic route middleware usage
export const verifyTurnstile = createTurnstileMiddleware();
