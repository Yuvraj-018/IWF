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
  private readonly storagePrefix = "iwf_cache_";

  constructor() {
    // Clear any leftover cached entries from sessionStorage
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const toRemove: string[] = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const k = window.sessionStorage.key(i);
          if (k && k.startsWith(this.storagePrefix)) {
            toRemove.push(k);
          }
        }
        toRemove.forEach((k) => window.sessionStorage.removeItem(k));
      }
    } catch {}
  }

  set<T>(_key: string, _data: T, _ttlMs = 0, _tag = "general"): void {
    // Bypassed: always fresh
  }

  get<T>(_key: string): T | null {
    // Bypassed: always return null so caller fetches live data
    return null;
  }

  delete(_key: string): void {
    // No-op
  }

  invalidateTag(_tag: string): void {
    // No-op
  }

  /**
   * Directly executes fetcher without any caching layer
   */
  async wrap<T>(
    _key: string,
    fetcher: () => Promise<T>,
    _options: CacheOptions = {}
  ): Promise<T> {
    return await fetcher();
  }
}

export const clientCache = new UniversalClientCache();

