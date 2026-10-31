import type { Request, Response, NextFunction } from "express";

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}

interface RateLimitRecord {
  timestamps: number[];
}

/**
 * High-performance, zero-dependency sliding window rate limiter
 */
export function createRateLimiter(options: RateLimitOptions) {
  const store = new Map<string, RateLimitRecord>();

  // Periodically clean up expired entries
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < options.windowMs);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();
    const key = options.keyGenerator
      ? options.keyGenerator(req)
      : (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.ip ||
        req.socket.remoteAddress ||
        "unknown_client";

    const record = store.get(key) || { timestamps: [] };
    record.timestamps = record.timestamps.filter((t) => now - t < options.windowMs);

    if (record.timestamps.length >= options.max) {
      const oldest = record.timestamps[0];
      const resetTime = Math.ceil((oldest + options.windowMs - now) / 1000);
      res.setHeader("Retry-After", resetTime);
      res.setHeader("X-RateLimit-Limit", options.max);
      res.setHeader("X-RateLimit-Remaining", 0);
      res.status(429).json({
        success: false,
        message: options.message || "Too many requests. Please try again later.",
        retryAfterSeconds: resetTime,
      });
      return;
    }

    record.timestamps.push(now);
    store.set(key, record);

    res.setHeader("X-RateLimit-Limit", options.max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, options.max - record.timestamps.length));
    next();
  };
}

/**
 * 1. Strict OTP Limiter:
 * Max 3 requests per 10 minutes per Identifier (Phone/Member ID) or IP.
 */
export const otpRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many OTP requests. For security reasons, please wait 10 minutes before trying again.",
  keyGenerator: (req) => {
    const identifier = (req.body?.identifier || req.body?.phone || req.body?.mobile || "").trim();
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown";
    return identifier ? `otp_${identifier.toLowerCase()}` : `otp_ip_${ip}`;
  },
});

/**
 * 2. Form Submissions Limiter (Contact & Applications):
 * Max 5 submissions per 15 minutes per IP.
 */
export const formSubmissionLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many form submissions from this network. Please try again after 15 minutes.",
});

/**
 * 3. Payment Order Creation Limiter:
 * Max 10 order initializations per 10 minutes per IP to prevent payment card testing.
 */
export const orderRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many checkout attempts initiated. Please wait a few minutes before trying again.",
});

/**
 * 4. Global API Limiter:
 * Max 150 requests per minute per IP for general endpoints.
 */
export const apiGlobalLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 150,
  message: "Too many requests. Please slow down.",
});

