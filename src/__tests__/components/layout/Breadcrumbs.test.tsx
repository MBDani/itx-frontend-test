import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

// Mock del Hook para forzar que el Breadcrumb crea que conoce el producto
vi.mock("@/hooks/useProductDetails", () => ({
  useProductDetails: (id: string | undefined) => ({
    data: id === "123" ? { brand: "Apple", model: "iPhone 15" } : undefined,
  }),
}));

describe("Breadcrumbs Component", () => {
  it("no renderiza nada en la ruta raíz (PLP)", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Breadcrumbs />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza la ruta formateada cuando navegas a un producto conocido", () => {
    // Simulamos que estamos en /product/123
    render(
      <MemoryRouter initialEntries={["/product/123"]}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    // Debe mostrar "Apple iPhone 15" en lugar de "123" gracias a nuestro React Query Magic
    expect(screen.getByText("Apple iPhone 15")).toBeInTheDocument();
  });

  it("renderiza rutas genéricas anidadas (ej. /settings/profile)", () => {
    render(
      <MemoryRouter initialEntries={["/settings/profile"]}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    // Settings es un Link porque no es el último eslabón
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();

    // Profile es texto plano porque es the current page
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
