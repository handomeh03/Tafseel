"use client";

import api from "@/config/axoisconfig";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "use-debounce";

export function useGetProducts(
  url: string,
  currentPage: number = 1,
  pageSize: number = 10,
  search?: string
) {
  const [debouncedSearch] = useDebounce(search, 500);

  const {
    data: productsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    
    queryKey: [
      "products",
      url,
      { debouncedSearch, currentPage, pageSize },
    ],

    queryFn: async () => {
      try {
        const response = await api.get(url, { 
          params: {
            search: debouncedSearch || undefined,
            page: currentPage,
            limit: pageSize,
          },
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {

          const message = error.response?.data?.message || error.message;
          console.log(message);
          throw new Error(message);
        }
        throw new Error("حدث خطأ غير متوقع أثناء جلب المنتجات");
      }
    },

    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: false,
    enabled: Boolean(url),
  });

  return { 
    productsData, 
    isLoading, 
    isError, 
    error, 
    isFetching, 
    refetch 
  };
}