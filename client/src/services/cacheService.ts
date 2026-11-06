/**
 * Universal Client-Side Cache Service for ISLAH Web App
 * - In-memory fast cache + sessionStorage fallback
 * - Configurable TTL (default 5 minutes)
 * - Prevents duplicate backend API hits for static/universal commons (site settings, media maps, news, careers, publications)
 * - Supports forceRefresh to bypass cache
 */

export interface CacheOptions {
  ttlMs?: number;
  forceRefresh?: boolean;
  tag?: string;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
  tag: string;
}

class UniversalClientCache {
  private memoryCache = new Map<string, CacheEntry<any>>();
  private readonly storagePrefix = "iwf_cache_";

  /**
   * Set cached data
   */
  set<T>(key: string, data: T, ttlMs = 5 * 60 * 1000, tag = "general"): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttlMs,
      tag,
    };

    this.memoryCache.set(key, entry);

    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(`${this.storagePrefix}${key}`, JSON.stringify(entry));
      }
    } catch {
      // Storage quota or SSR fallback
    }
  }

  /**
   * Get cached data if valid
   */
  get<T>(key: string): T | null {
    // 1. Fast Memory lookup
    let entry = this.memoryCache.get(key);

    // 2. Storage fallback (browser navigation/reload)
    if (!entry && typeof window !== "undefined" && window.sessionStorage) {
      try {
        const item = window.sessionStorage.getItem(`${this.storagePrefix}${key}`);
        if (item) {
          entry = JSON.parse(item);
          if (entry) {
            this.memoryCache.set(key, entry);
          }
        }
      } catch {
        // Parse error or access denied
      }
    }

    if (!entry) return null;

    // 3. Expiry check
    if (Date.now() - entry.timestamp > entry.ttlMs) {
      this.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Delete specific key
   */
  delete(key: string): void {
    this.memoryCache.delete(key);
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem(`${this.storagePrefix}${key}`);
      }
    } catch {}
  }

  /**
   * Invalidate by resource tag (e.g. 'settings', 'careers', 'publications', 'stories')
   */
  invalidateTag(tag: string): void {
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.tag === tag || tag === "*") {
        this.memoryCache.delete(key);
      }
    }

    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const toRemove: string[] = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const k = window.sessionStorage.key(i);
          if (k && k.startsWith(this.storagePrefix)) {
            try {
              const val = JSON.parse(window.sessionStorage.getItem(k) || "");
              if (val.tag === tag || tag === "*") {
                toRemove.push(k);
              }
            } catch {}
          }
        }
        toRemove.forEach((k) => window.sessionStorage.removeItem(k));
      }
    } catch {}
  }

  /**
   * Helper to wrap any async fetcher function with automatic caching
   */
  async wrap<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const { ttlMs = 5 * 60 * 1000, forceRefresh = false, tag = "general" } = options;

    if (!forceRefresh) {
      const cached = this.get<T>(key);
      if (cached !== null) {
        return cached;
      }
    }

    const freshData = await fetcher();
    if (freshData !== null && freshData !== undefined) {
      this.set(key, freshData, ttlMs, tag);
    }
    return freshData;
  }
}

export const clientCache = new UniversalClientCache();

