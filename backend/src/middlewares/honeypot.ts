import type { Request, Response, NextFunction } from "express";

/**
 * Honeypot Middleware:
 * Traps automated bots filling hidden inputs that human users cannot see.
 * If any honeypot field is filled, silently returns success without processing.
 */
export function honeypotCheck(req: Request, res: Response, next: NextFunction): void {
  const honeypot =
    req.body?.user_website_url ||
    req.body?.website_hp ||
    req.body?.company_fax;

  if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
    console.warn(`[BOT BLOCKED] Honeypot triggered from IP: ${req.ip}. Value: "${honeypot}"`);
    res.status(200).json({
      success: true,
      message: "Submission received.",
    });
    return;
  }

  next();
}

