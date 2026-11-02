import type { Request, Response, NextFunction } from "express";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEMO_SECRET_KEY = "1x0000000000000000000000000000000AA";

/**
 * Cloudflare Turnstile Verification Middleware:
 * Validates the Turnstile token against Cloudflare's siteverify API.
 * Supports Cloudflare's official dummy keys in development or when configured.
 */
export async function verifyTurnstile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If no secret key is configured at all, pass through with warning
  if (!secretKey) {
    return next();
  }

  // Token can be sent in body (turnstileToken, cf-turnstile-response) or header
  const token =
    req.body?.turnstileToken ||
    req.body?.["cf-turnstile-response"] ||
    (req.headers["cf-turnstile-response"] as string);

  // If in development with demo secret and no token passed or demo token, pass through
  if (
    secretKey === DEMO_SECRET_KEY &&
    (!token ||
      token === "XXXX.DUMMY.TOKEN.XXXX" ||
      token.startsWith("1x") ||
      token.startsWith("demo"))
  ) {
    return next();
  }

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Bot protection verification required (missing Turnstile token).",
    });
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    const ip = req.ip || req.socket.remoteAddress;
    if (ip) formData.append("remoteip", ip);

    const result = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data: any = await result.json();

    if (!data.success) {
      console.warn("[TURNSTILE] Verification failed:", data["error-codes"]);
      // If using demo key, allow pass-through
      if (secretKey === DEMO_SECRET_KEY) {
        return next();
      }

      res.status(403).json({
        success: false,
        message: "Bot protection verification failed. Please try again.",
        errors: data["error-codes"],
      });
      return;
    }

    return next();
  } catch (err) {
    console.error("[TURNSTILE] Siteverify network error:", err);
    // Fail-open in development or if demo secret
    if (secretKey === DEMO_SECRET_KEY || process.env.NODE_ENV !== "production") {
      return next();
    }
    res.status(500).json({
      success: false,
      message: "Unable to verify bot protection. Please try again later.",
    });
  }
}
