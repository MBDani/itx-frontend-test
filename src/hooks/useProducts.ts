import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/api";
import type { ApiProduct } from "@/types";

export const useProducts = () => {
  return useQuery<ApiProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
