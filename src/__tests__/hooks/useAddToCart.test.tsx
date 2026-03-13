import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCartStore } from "@/store/cartStore";

// We mock the API layer so we don't actually hit the network during tests
vi.mock("@/services/api", () => ({
  addToCart: vi.fn().mockResolvedValue({ count: 1 }),
}));

describe("useAddToCart Hook", () => {
  let queryClient: QueryClient;

  // Before each test, run a clean instance of React Query to avoid false positives
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    // Ensure our mock store asserts properly
    useCartStore.setState({ count: 0 });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should successfully call API and increment global Zustand cart", async () => {
    const { result } = renderHook(() => useAddToCart(), { wrapper });

    // Ensure cart starts empty
    expect(useCartStore.getState().count).toBe(0);

    // Act
    result.current.mutate({ id: "1", colorCode: 1000, storageCode: 2000 });

    // Assert using Wait For since mutations are Async React Query processes
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Validate that Zustand received the command and mutated global state
    expect(useCartStore.getState().count).toBe(1);
  });
});
