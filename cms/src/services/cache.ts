/**
 * High-performance In-Memory & SessionStorage Cache Manager for CMS
 * - Zero dependencies
 * - Instant sub-millisecond tab switching
 * - Survives browser F5 page refreshes (via sessionStorage)
 * - Automatic TTL expiry
 * - Granular tag-based invalidation upon create/update/delete mutations
 */

export interface CacheOptions {
  ttlMs?: number;
  tag?: string;
  force?: boolean;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
  tag: string;
}

class ApiCache {
  private memoryCache = new Map<string, CacheEntry<any>>();
  private readonly prefix = "islah_cms_cache_";

  /**
   * Store data with TTL and an invalidation tag
   */
  set<T>(key: string, data: T, ttlMs = 3 * 60 * 1000, tag = "default"): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttlMs,
      tag,
    };

    this.memoryCache.set(key, entry);

    try {
      sessionStorage.setItem(`${this.prefix}${key}`, JSON.stringify(entry));
    } catch {
      // Storage quota or restricted environment fallback to memory only
    }
  }

  /**
   * Retrieve cached data if not expired
   */
  get<T>(key: string): T | null {
    // 1. Check in-memory fast cache
    let entry = this.memoryCache.get(key);

    // 2. Fallback to sessionStorage
    if (!entry) {
      try {
        const stored = sessionStorage.getItem(`${this.prefix}${key}`);
        if (stored) {
          entry = JSON.parse(stored);
          if (entry) {
            this.memoryCache.set(key, entry);
          }
        }
      } catch {
        // Storage access error
      }
    }

    if (!entry) return null;

    // 3. Expiry verification
    const isExpired = Date.now() - entry.timestamp > entry.ttlMs;
    if (isExpired) {
      this.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): void {
    this.memoryCache.delete(key);
    try {
      sessionStorage.removeItem(`${this.prefix}${key}`);
    } catch {}
  }

  /**
   * Invalidate all cached queries matching a specific resource tag
   * (e.g. 'news', 'media', 'patients', 'applications', 'dashboard')
   */
  invalidateTag(tag: string): void {
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.tag === tag) {
        this.memoryCache.delete(key);
      }
    }

    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith(this.prefix)) {
          const raw = sessionStorage.getItem(k);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed.tag === tag) {
                keysToRemove.push(k);
              }
            } catch {}
          }
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    } catch {}
  }

  /**
   * Clear entire CMS cache
   */
  clear(): void {
    this.memoryCache.clear();
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith(this.prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    } catch {}
  }
}

export const apiCache = new ApiCache();

