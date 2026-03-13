import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { useCartStore } from "@/store/cartStore";

describe("Header Component", () => {
  it("displays the main logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText("MobiStore")).toBeInTheDocument();
  });

  it("displays the precise cart count drawn from global store", () => {
    // Force 5 items in cart
    useCartStore.setState({ count: 5 });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
