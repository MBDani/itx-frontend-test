import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/store/cartStore";

describe("Cart Store (Zustand)", () => {
  // Reset the store before each run to avoid state leakage between tests
  beforeEach(() => {
    useCartStore.setState({ count: 0 });
  });

  it("should initialize with a count of 0", () => {
    const { count } = useCartStore.getState();
    expect(count).toBe(0);
  });

  it("should increment the cart count by 1 when incrementCart is called", () => {
    const store = useCartStore.getState();

    // Action
    store.incrementCart();

    // Assertion
    expect(useCartStore.getState().count).toBe(1);

    // Additional Action
    useCartStore.getState().incrementCart();
    expect(useCartStore.getState().count).toBe(2);
  });
});
