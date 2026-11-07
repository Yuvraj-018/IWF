import { Request, Response, NextFunction } from "express";

/**
 * Cache middleware bypassed for development and real-time CMS synchronization.
 * Forces zero-cache headers so browsers and CDNs never store responses.
 */
export function cacheResponse(_durationSeconds: number = 0, _tag: string = "general") {
  return (_req: Request, res: Response, next: NextFunction): void => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("X-Cache", "BYPASS");
    next();
  };
}

/**
 * Invalidate cache helper - no-op when caching is bypassed.
 */
export function invalidateCache(_tag: string): void {
  // Caching is disabled; always live.
}

