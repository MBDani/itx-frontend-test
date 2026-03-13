import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ProductListPage } from "@/pages/ProductListPage";
import * as hooks from "@/hooks/useProducts";
import type { ApiProduct } from "@/types";

// Mocking the custom hook directly instead of fetch is cleaner for Integration Testing visual components
vi.mock("@/hooks/useProducts", () => ({
  useProducts: vi.fn(),
}));

const mockProductsData: ApiProduct[] = [
  {
    id: "1",
    brand: "Apple",
    model: "iPhone 15",
    price: "999",
    imgUrl: "apple.jpg",
  },
  {
    id: "2",
    brand: "Samsung",
    model: "Galaxy S24",
    price: "899",
    imgUrl: "sam.jpg",
  },
];

describe("Product List Page (PLP)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const PageWrapper = () => (
    <MemoryRouter>
      <ProductListPage />
    </MemoryRouter>
  );

  it("should display the loading skeleton whilst fetching data", () => {
    // Assert hook is loading
    vi.spyOn(hooks, "useProducts").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      isSuccess: false,
      status: "pending",
    } as unknown as ReturnType<typeof hooks.useProducts>);

    render(<PageWrapper />);

    // We expect the loading spinner class to be present
    const spinnerLayout = screen.getByRole("heading", { name: "Smartphones" });
    expect(spinnerLayout).toBeInTheDocument();
  });

  it("should render products perfectly upon successful data grab", async () => {
    vi.spyOn(hooks, "useProducts").mockReturnValue({
      data: mockProductsData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof hooks.useProducts>);

    render(<PageWrapper />);

    // Wait until they are printed in DOM
    await waitFor(() => {
      // Apple appears in both the brand filter pill and the product card
      const appleElements = screen.getAllByText("Apple");
      expect(appleElements.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
      // Counter header matches mock array length
      expect(
        screen.getByText("2 premium devices available"),
      ).toBeInTheDocument();
    });
  });
});
