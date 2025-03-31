// Simple in-memory cache for database queries
// This helps reduce database load for frequently accessed data

type CacheEntry<T> = {
  data: T
  expiry: number
}

class QueryCache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private defaultTTL: number = 60 * 1000 // 1 minute in milliseconds

  // Get an item from the cache
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if the entry has expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  // Set an item in the cache
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl,
    })
  }

  // Delete an item from the cache
  delete(key: string): void {
    this.cache.delete(key)
  }

  // Clear all items from the cache
  clear(): void {
    this.cache.clear()
  }

  // Get a cached query result or execute the query
  async getOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl: number = this.defaultTTL): Promise<T> {
    const cached = this.get<T>(key)

    if (cached !== null) {
      return cached
    }

    const data = await fetchFn()
    this.set(key, data, ttl)
    return data
  }
}

// Export a singleton instance
export const queryCache = new QueryCache()

