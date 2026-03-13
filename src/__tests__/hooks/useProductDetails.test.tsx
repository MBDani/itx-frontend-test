import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProductDetails } from "@/hooks/useProductDetails";
import * as api from "@/services/api";
import type { ApiProductDetails } from "@/types";

vi.mock("@/services/api");

describe("useProductDetails Hook", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should not trigger fetch if id is undefined (guard clause)", () => {
    const { result } = renderHook(() => useProductDetails(undefined), {
      wrapper,
    });

    expect(result.current.isPending).toBe(true);
    expect(api.getProductDetails).not.toHaveBeenCalled();
  });

  it("should explicitly fetch product details when a concrete id is given", async () => {
    const mockData = {
      id: "123",
      brand: "Test",
      model: "M",
      price: "10",
      imgUrl: "",
      options: { colors: [], storages: [] },
    } as unknown as ApiProductDetails;
    vi.spyOn(api, "getProductDetails").mockResolvedValue(mockData);

    const { result } = renderHook(() => useProductDetails("123"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(api.getProductDetails).toHaveBeenCalledWith("123");
  });
});
