import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "@/hooks/useProducts";
import * as api from "@/services/api";

vi.mock("@/services/api");

describe("useProducts Hook", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch and return an array of products successfully", async () => {
    const mockData = [
      { id: "1", brand: "Test", model: "Device", price: "100", imgUrl: "" },
    ];
    vi.spyOn(api, "getProducts").mockResolvedValue(mockData);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });
});
