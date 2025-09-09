import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Enhanced caching configuration for different data types
const getCacheConfig = (queryKey: readonly unknown[]) => {
  const key = queryKey.join('/');
  
  // Long-lived static data (rarely changes)
  if (key.includes('/api/upgrades') || key.includes('/api/achievements')) {
    return {
      staleTime: 60 * 60 * 1000, // 1 hour - upgrades rarely change
      gcTime: 2 * 60 * 60 * 1000, // 2 hours
    };
  }
  
  // Moderate cache for semi-static data
  if (key.includes('/api/marketplace') || key.includes('/api/staking/pools')) {
    return {
      staleTime: 15 * 60 * 1000, // 15 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
    };
  }
  
  // Short cache for dynamic data
  if (key.includes('/api/leaderboard') || key.includes('/api/players') || key.includes('/tokens')) {
    return {
      staleTime: 2 * 60 * 1000, // 2 minutes
      gcTime: 5 * 60 * 1000, // 5 minutes
    };
  }
  
  // Default cache settings
  return {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      retry: 1, // Retry once on failure
      // Dynamic cache configuration based on query key
      staleTime: (context) => getCacheConfig(context.queryKey).staleTime,
      gcTime: (context) => getCacheConfig(context.queryKey).gcTime,
    },
    mutations: {
      retry: 1, // Retry failed mutations once
      // Optimistic cache invalidation patterns
      onSuccess: (data, variables, context, mutation) => {
        // Auto-invalidate related queries after successful mutations
        const mutationKey = mutation.meta?.invalidates as string[];
        if (mutationKey) {
          mutationKey.forEach(key => {
            queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      },
    },
  },
});
