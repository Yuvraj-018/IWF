import type { Request, Response, NextFunction } from "express";

/**
 * Cloudflare Turnstile Verification Middleware:
 * Currently in passive pass-through mode so no users or forms are blocked
 * while Cloudflare billing/card setup is pending.
 */
export async function verifyTurnstile(
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  return next();
}
