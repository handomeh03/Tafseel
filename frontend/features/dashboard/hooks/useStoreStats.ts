"use client";

import api from "@/config/axoisconfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface StoreStats {
  totalStores: number;
  totalProducts: number;
  totalRequests: number;
  requestCounts: Record<"PENDING" | "APPROVED" | "REJECTED", number>;
}

export function useStoreStats() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["store-stats"],
    queryFn: async () => {
      try {
        const response = await api.get<StoreStats>("/store/store-stats");
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

  return { storeStats: data, isLoading, isError, error, isFetching };
}
