import { Request, Response, NextFunction } from "express";

interface CacheItem {
  data: any;
  contentType: string;
  expiresAt: number;
}

// In-memory cache store
const memoryCache = new Map<string, CacheItem>();

/**
 * Cache middleware for public GET endpoints.
 * @param durationSeconds Time in seconds to cache the response (default: 120s / 2 mins)
 * @param tag Resource tag used for bulk invalidation (e.g. 'settings', 'media', 'news', 'careers', 'publications', 'stories')
 */
export function cacheResponse(durationSeconds: number = 120, tag: string = "general") {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    // Skip caching if authenticated admin (admins should always see live data)
    if (req.headers.authorization) {
      return next();
    }

    // Generate unique cache key based on URL and query params
    const cacheKey = `${tag}:${req.originalUrl || req.url}`;
    const cached = memoryCache.get(cacheKey);

    if (cached && Date.now() < cached.expiresAt) {
      res.setHeader("X-Cache", "HIT");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Content-Type", cached.contentType);
      res.send(cached.data);
      return;
    }

    // Intercept res.send to capture and store response
    const originalSend = res.send.bind(res);
    res.setHeader("X-Cache", "MISS");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.send = (body: any) => {
      // Only cache successful 200 responses
      if (res.statusCode === 200) {
        const contentType = res.getHeader("Content-Type")?.toString() || "application/json";
        memoryCache.set(cacheKey, {
          data: body,
          contentType,
          expiresAt: Date.now() + durationSeconds * 1000,
        });
      }
      return originalSend(body);
    };

    next();
  };
}

/**
 * Invalidate all cached entries matching a tag (e.g. 'careers', 'publications', 'stories', 'media')
 */
export function invalidateCache(tag: string): void {
  const prefix = `${tag}:`;
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix) || tag === "*") {
      memoryCache.delete(key);
    }
  }
}

