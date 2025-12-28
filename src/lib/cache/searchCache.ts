import type { SearchState } from '@/types/search';
import { SEARCH_CONFIG } from '@/constants/search';

interface CacheEntry {
  data: SearchState;
  timestamp: number;
}

interface CacheStore {
  [key: string]: CacheEntry;
}

class SearchCache {
  private cache: CacheStore = {};
  private accessOrder: string[] = [];

  private generateKey(query: string, page: number): string {
    return `${query.toLowerCase().trim()}:${page}`;
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > SEARCH_CONFIG.CACHE_TTL;
  }

  private evictOldest(): void {
    if (this.accessOrder.length >= SEARCH_CONFIG.MAX_CACHE_SIZE) {
      const oldestKey = this.accessOrder.shift();
      if (oldestKey) {
        delete this.cache[oldestKey];
      }
    }
  }

  private updateAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }

  get(query: string, page: number): SearchState | null {
    const key = this.generateKey(query, page);
    const entry = this.cache[key];

    if (!entry) {
      return null;
    }

    if (this.isExpired(entry)) {
      delete this.cache[key];
      const index = this.accessOrder.indexOf(key);
      if (index > -1) {
        this.accessOrder.splice(index, 1);
      }
      return null;
    }

    this.updateAccessOrder(key);
    return entry.data;
  }

  set(query: string, page: number, data: SearchState): void {
    const key = this.generateKey(query, page);

    this.evictOldest();

    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };

    this.updateAccessOrder(key);
  }

  clear(): void {
    this.cache = {};
    this.accessOrder = [];
  }

  invalidate(query: string): void {
    const prefix = query.toLowerCase().trim();
    Object.keys(this.cache).forEach((key) => {
      if (key.startsWith(prefix)) {
        delete this.cache[key];
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
          this.accessOrder.splice(index, 1);
        }
      }
    });
  }
}

export const searchCache = new SearchCache();
