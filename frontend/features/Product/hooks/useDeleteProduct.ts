"use client";

import api from "@/config/axoisconfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";


export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending: isDeleting,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (productId: string | number) => {
      const response = await api.delete(`/product/delete-product/${productId}`);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف المنتج بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    },

    onError: (error) => {
      let errorMessage = "حدث خطأ أثناء محاولة حذف المنتج";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });

  return {
    deleteProduct,
    isDeleting,
    isError,
    error,
    isSuccess,
  };
}