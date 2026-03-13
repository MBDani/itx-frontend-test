import type {
  ApiProduct,
  ApiProductDetails,
  AddToCartPayload,
  AddToCartResponse,
} from "@/types";

const API_BASE_URL = "https://itx-frontend-test.onrender.com/api";

/**
 * Custom error class to handle API failures gracefully
 */
class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/**
 * Generic fetch wrapper to handle JSON and errors
 */
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Network Error: ${response.statusText}`,
    );
  }

  // The API might return non-JSON on 204 or empty responses, so we guard
  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

/**
 * GET: Fetches the complete list of mobile phones.
 */
export const getProducts = (): Promise<ApiProduct[]> => {
  return fetcher<ApiProduct[]>("/product");
};

/**
 * GET: Fetches the details of a specific product.
 */
export const getProductDetails = (id: string): Promise<ApiProductDetails> => {
  return fetcher<ApiProductDetails>(`/product/${id}`);
};

/**
 * POST: Adds a product with specific options to the cart.
 */
export const addToCart = (
  payload: AddToCartPayload,
): Promise<AddToCartResponse> => {
  return fetcher<AddToCartResponse>("/cart", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
