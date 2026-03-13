import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts, getProductDetails } from "@/services/api";

// Create a global mock for fetch to simulate internet responses
globalThis.fetch = vi.fn();

describe("API Service Layer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getProducts should fetch the product list and parse JSON correctly", async () => {
    const mockProducts = [
      { id: "1", brand: "Test", model: "Mobile", price: "100", imgUrl: "" },
    ];

    // Fake the browser fetch API returning ok: true and JSON text
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockProducts)),
    } as unknown as Response);

    const result = await getProducts();

    expect(fetch).toHaveBeenCalledWith(
      "https://itx-frontend-test.onrender.com/api/product",
      expect.any(Object),
    );
    expect(result).toEqual(mockProducts);
  });

  it("getProductDetails should throw an ApiError if the network fails (e.g. 404)", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as unknown as Response);

    // When an async function throws, we test it catching it
    await expect(getProductDetails("invalid-id")).rejects.toThrowError(
      "Network Error: Not Found",
    );
  });
});
