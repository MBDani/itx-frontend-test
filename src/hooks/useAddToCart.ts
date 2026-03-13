import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/services/api";
import { useCartStore } from "@/store/cartStore";

export const useAddToCart = () => {
  const incrementCart = useCartStore((state) => state.incrementCart);

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // The API responds with { count: 1 } indicating 1 item was added
      // We trigger our global Zustand store to increment the header cart
      incrementCart();
    },
  });
};
