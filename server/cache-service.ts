/**
 * High-Performance In-Memory Cache Service
 * Optimized for 1000+ concurrent players
 */

interface CacheItem<T> {
  data: T;
  expires: number;
  lastAccessed: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly maxSize = 10000; // Maximum cache entries
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes default
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup expired entries every 2 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 2 * 60 * 1000);
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    const ttl = ttlMs || this.defaultTTL;
    const now = Date.now();
    
    // If at max capacity, remove oldest entries
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      expires: now + ttl,
      lastAccessed: now
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    
    // Check if expired
    if (item.expires < now) {
      this.cache.delete(key);
      return null;
    }

    // Update access time for LRU
    item.lastAccessed = now;
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Cache invalidation patterns
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern.replace('*', '.*'));
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.expires < now) {
        this.cache.delete(key);
      }
    }
    console.log(`🧹 Cache cleanup: ${this.cache.size} entries remaining`);
  }

  getStats(): { size: number; maxSize: number; hitRate?: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize
    };
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

// Singleton cache instance
export const cache = new PerformanceCache();

// Cache key generators for consistency
export const CacheKeys = {
  player: (id: string) => `player:${id}`,
  playerUpgrades: (playerId: string) => `player:${playerId}:upgrades`,
  playerAchievements: (playerId: string) => `player:${playerId}:achievements`,
  playerFriends: (playerId: string) => `player:${playerId}:friends`,
  pendingRequests: (playerId: string) => `player:${playerId}:pending-requests`,
  leaderboard: () => `leaderboard:global`,
  tokenBalance: (walletAddress: string) => `token:${walletAddress}:balance`,
  playerTokens: (playerId: string) => `player:${playerId}:tokens`,
  pendingPayouts: (network: string) => `payouts:${network}:pending`,
  activeEvents: () => `events:active`,
  guildInfo: (guildId: string) => `guild:${guildId}`,
} as const;

// Cache decorators for common patterns
export function cached<T>(
  keyFn: (...args: any[]) => string,
  ttlMs?: number
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<T> {
      const cacheKey = keyFn(...args);
      
      // Try cache first
      const cached = cache.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);
      
      // Cache the result
      if (result !== null && result !== undefined) {
        cache.set(cacheKey, result, ttlMs);
      }

      return result;
    };

    return descriptor;
  };
}

// Cache invalidation helpers
export const CacheInvalidation = {
  player: (playerId: string) => {
    cache.invalidatePattern(`player:${playerId}:*`);
    cache.delete(CacheKeys.player(playerId));
  },
  
  leaderboard: () => {
    cache.delete(CacheKeys.leaderboard());
  },
  
  friends: (playerId: string) => {
    cache.delete(CacheKeys.playerFriends(playerId));
    cache.delete(CacheKeys.pendingRequests(playerId));
  },
  
  tokens: (playerId: string, walletAddress?: string) => {
    cache.delete(CacheKeys.playerTokens(playerId));
    if (walletAddress) {
      cache.delete(CacheKeys.tokenBalance(walletAddress));
    }
  }
};

export default cache;