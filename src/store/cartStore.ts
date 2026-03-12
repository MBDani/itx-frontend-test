import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  count: number;
  incrementCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      count: 0,
      incrementCart: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'itx-cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
