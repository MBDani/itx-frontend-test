import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

export const ONE_HOUR_IN_MS = 1000 * 60 * 60;

// Create a query client with global defaults exactly as requested in the technical test
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1. the data will be considered "fresh" for exactly 1 hour. It won't refetch on mount.
      staleTime: ONE_HOUR_IN_MS, 
      // 2. The data will not be garbage collected from memory until at least 1 hour passes
      gcTime: ONE_HOUR_IN_MS,
      // Refetch rules
      refetchOnWindowFocus: false, // Do not refetch merely if the user tabs away and back
      retry: 1, // Retry only once if API fails
    },
  },
});

// Create a persister using localStorage.
// This is what implements "Caché en cliente" that survives page reloads.
export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});
