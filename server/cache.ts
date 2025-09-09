// Enhanced memory cache with performance optimizations for 5000+ concurrent players
class MemoryCache {
  private cache = new Map<string, { data: any; expiry: number; accessCount: number; lastAccess: number }>();
  private readonly DEFAULT_TTL = 300000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 10000; // Prevent memory leaks
  private readonly CLEANUP_INTERVAL = 60000; // 1 minute cleanup

  constructor() {
    // Auto-cleanup with performance tracking
    setInterval(() => {
      this.performanceCleanup();
    }, this.CLEANUP_INTERVAL);
  }

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    // Enforce cache size limit
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictLeastRecentlyUsed();
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl,
      accessCount: 0,
      lastAccess: Date.now()
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    // Update access statistics
    item.accessCount++;
    item.lastAccess = Date.now();
    
    return item.data;
  }

  // Batch operations for better performance
  getMultiple(keys: string[]): Record<string, any> {
    const results: Record<string, any> = {};
    const now = Date.now();
    
    for (const key of keys) {
      const item = this.cache.get(key);
      if (item && now <= item.expiry) {
        item.accessCount++;
        item.lastAccess = now;
        results[key] = item.data;
      }
    }
    
    return results;
  }

  setMultiple(entries: Record<string, any>, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    const expiry = now + ttl;
    
    for (const [key, data] of Object.entries(entries)) {
      if (this.cache.size >= this.MAX_CACHE_SIZE) {
        this.evictLeastRecentlyUsed();
      }
      
      this.cache.set(key, {
        data,
        expiry,
        accessCount: 0,
        lastAccess: now
      });
    }
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  // Delete all keys matching a pattern
  deletePattern(pattern: string): number {
    const regex = new RegExp(pattern);
    let deletedCount = 0;
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }
    
    return deletedCount;
  }

  clear(): void {
    this.cache.clear();
  }

  // Performance-optimized cleanup
  performanceCleanup(): void {
    const now = Date.now();
    let expiredCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
        expiredCount++;
      }
    }
    
    if (expiredCount > 0) {
      console.log(`🧹 Cache cleanup: removed ${expiredCount} expired entries`);
    }
  }

  // LRU eviction for memory management
  private evictLeastRecentlyUsed(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccess < oldestTime) {
        oldestTime = item.lastAccess;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  // Cleanup expired entries (legacy method)
  cleanup(): void {
    this.performanceCleanup();
  }

  getStats() {
    const now = Date.now();
    const validEntries = Array.from(this.cache.entries()).filter(([_, item]) => now <= item.expiry);
    const hotEntries = validEntries.filter(([_, item]) => item.accessCount > 5);
    
    return {
      size: this.cache.size,
      validEntries: validEntries.length,
      hotEntries: hotEntries.length,
      memoryEfficiency: ((validEntries.length / this.cache.size) * 100).toFixed(1) + '%',
      keys: Array.from(this.cache.keys())
    };
  }

  // Get performance metrics
  getPerformanceMetrics() {
    const now = Date.now();
    let totalAccess = 0;
    let hitCount = 0;
    
    for (const [_, item] of this.cache.entries()) {
      if (now <= item.expiry) {
        totalAccess += item.accessCount;
        if (item.accessCount > 0) hitCount++;
      }
    }
    
    return {
      totalEntries: this.cache.size,
      totalAccesses: totalAccess,
      hitRate: this.cache.size > 0 ? (hitCount / this.cache.size * 100).toFixed(1) + '%' : '0%',
      averageAccessesPerEntry: this.cache.size > 0 ? (totalAccess / this.cache.size).toFixed(1) : '0'
    };
  }
}

export const cache = new MemoryCache();

// Cache wrapper functions for common data patterns
export const cacheWrapper = {
  // Cache static data that rarely changes
  staticData: async <T>(key: string, fetchFn: () => Promise<T>, ttl = 3600000): Promise<T> => {
    const cached = cache.get(key);
    if (cached) return cached;
    
    const data = await fetchFn();
    cache.set(key, data, ttl); // 1 hour default for static data
    return data;
  },
  
  // Cache player data with shorter TTL
  playerData: async <T>(playerId: string, dataType: string, fetchFn: () => Promise<T>, ttl = 120000): Promise<T> => {
    const key = `player:${playerId}:${dataType}`;
    const cached = cache.get(key);
    if (cached) return cached;
    
    const data = await fetchFn();
    cache.set(key, data, ttl); // 2 minutes for player data
    return data;
  },
  
  // Cache leaderboard and other frequently accessed data
  dynamicData: async <T>(key: string, fetchFn: () => Promise<T>, ttl = 300000): Promise<T> => {
    const cached = cache.get(key);
    if (cached) return cached;
    
    const data = await fetchFn();
    cache.set(key, data, ttl); // 5 minutes for dynamic data
    return data;
  },
  
  // Invalidate player-specific cache entries
  invalidatePlayer: (playerId: string) => {
    cache.deletePattern(`player:${playerId}:.*`);
  },
  
  // Invalidate leaderboard cache
  invalidateLeaderboard: () => {
    cache.delete('leaderboard');
    cache.deletePattern('leaderboard:.*');
  }
};
setInterval(() => {
  cache.cleanup();
}, 600000);