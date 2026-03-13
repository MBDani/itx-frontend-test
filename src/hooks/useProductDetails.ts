import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "@/services/api";
import type { ApiProductDetails } from "@/types";

export const useProductDetails = (id: string | undefined) => {
  return useQuery<ApiProductDetails>({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id!),
    // Don't execute the query if we don't have an ID
    enabled: !!id,
  });
};
