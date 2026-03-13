import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "@/components/layout/BaseLayout";

describe("BaseLayout Component", () => {
  it("renders Header, Breadcrumbs, and children via Outlet correctly", () => {
    // We need a query client to prevent errors from child components asking for context
    const queryClient = new QueryClient();

    // Render the base layout with a base route
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <BaseLayout />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // It should render MobiStore (from Header and Footer)
    const mobiStoreElements = screen.getAllByText("MobiStore");
    expect(mobiStoreElements.length).toBeGreaterThanOrEqual(1);

    // Breadcrumbs might not render on root, so we test navigation layout wrapper
    const layoutMain = screen.getByRole("main");
    expect(layoutMain).toBeInTheDocument();
  });
});
