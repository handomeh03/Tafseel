import api from "@/config/axoisconfig";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "use-debounce";

export function UseGetStoreRequests(
  currentPage: number = 1,
  pageSize: number = 10,
  search?: string,
  status?: string
) {
  const [debouncedSearch] = useDebounce(search, 500);

  const { data: storeRequests, isLoading, isError, error, isFetching,} = useQuery({
    queryKey: [
      "store-requests",
      { debouncedSearch, status, currentPage, pageSize },
    ],

    queryFn: async () => {
      try {
        const response = await api.get("/store/get-requests", {
          params: {
            search: debouncedSearch || undefined,
            status: status && status !== "ALL" ? status : undefined,
            page: currentPage,
            limit: pageSize,
          },
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message);
        }
        throw new Error("An unexpected error occurred");
      }
    },

    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: false,
    enabled: true,
  });

  return { storeRequests, isLoading, isError, error, isFetching };
}