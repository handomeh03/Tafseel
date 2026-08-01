"use client";

import api from "@/config/axoisconfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ProductStats {
  totalProducts: number;
  availableProducts: number;
  unavailableProducts: number;
  categoryCounts: Record<string, number>;
}

export function useProductStats() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["product-stats"],
    queryFn: async () => {
      try {
        const response = await api.get<ProductStats>("/product/product-stats");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    staleTime: 60_000,
    retry: false,
  });

  return { productStats: data, isLoading, isError, error, isFetching };
}
