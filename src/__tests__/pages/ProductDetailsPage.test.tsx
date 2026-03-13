import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductDetailsPage } from "@/pages/ProductDetailsPage";
import * as hooks from "@/hooks/useProductDetails";
import * as addHooks from "@/hooks/useAddToCart";
import type { ApiProductDetails } from "@/types";

vi.mock("@/hooks/useProductDetails", () => ({
  useProductDetails: vi.fn(),
}));
vi.mock("@/hooks/useAddToCart", () => ({
  useAddToCart: vi.fn(),
}));

const mockProductDetails: ApiProductDetails = {
  id: "123",
  brand: "Apple",
  model: "iPhone 15",
  price: "999",
  imgUrl: "apple.jpg",
  cpu: "A16",
  ram: "6GB",
  os: "iOS 17",
  displayResolution: "2556x1179",
  battery: "3349 mAh",
  weight: "171",
  dimentions: "147.6 x 71.6 x 7.8 mm",
  primaryCamera: ["48 MP", "12 MP"],
  secondaryCmera: "12 MP",
  options: {
    colors: [
      { code: 1, name: "Black" },
      { code: 2, name: "Blue" },
    ],
    storages: [
      { code: 10, name: "128GB" },
      { code: 20, name: "256GB" },
    ],
  },
} as unknown as ApiProductDetails;

describe("Product Details Page (PDP)", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(addHooks, "useAddToCart").mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof addHooks.useAddToCart>);
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter initialEntries={["/product/123"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

  it("renders deeply parsed product layout information (cameras array mapping, chips, etc)", () => {
    vi.spyOn(hooks, "useProductDetails").mockReturnValue({
      data: mockProductDetails,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof hooks.useProductDetails>);

    renderWithRouter();

    // Verify product name and price
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText("999€")).toBeInTheDocument();

    // Verify joined array properties (cameras parsing logic resilience)
    // Appears in both the spec card and the full specs table
    const cameraElements = screen.getAllByText(
      "Main: 48 MP, 12 MP | Front: 12 MP",
    );
    expect(cameraElements.length).toBeGreaterThanOrEqual(1);

    // Verify option chips exist
    expect(screen.getByRole("button", { name: "Black" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "256GB" })).toBeInTheDocument();
  });

  it("disables the add to cart button until complete variants are clicked", () => {
    vi.spyOn(hooks, "useProductDetails").mockReturnValue({
      data: mockProductDetails,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof hooks.useProductDetails>);

    renderWithRouter();

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    // Unselected chips => Add command should be frozen.
    expect(addToCartButton).toBeDisabled();

    // User selects exactly 1 color and strictly 1 storage
    fireEvent.click(screen.getByRole("button", { name: "Black" }));
    fireEvent.click(screen.getByRole("button", { name: "256GB" }));

    // The add to cart processor must unlock.
    expect(addToCartButton).not.toBeDisabled();

    // We emulate final clicking resolving into sending the ID & Choices over the hook.
    fireEvent.click(addToCartButton);
    expect(mockMutate).toHaveBeenCalledWith({
      id: "123",
      colorCode: 1,
      storageCode: 20,
    });
  });
});
