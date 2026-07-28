"use client";

import api from "@/config/axoisconfig"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";


export interface UpdateProductPayload {
  title?: string;
  description?: string;
  price?: number;
  isAvailable?: boolean;
}

export function useEditProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: editProduct,
    isPending: isEditing,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async ({
      productId,
      payload,
    }: {
      productId: string | number;
      payload: UpdateProductPayload;
    }) => {
      const response = await api.patch(`/product/edit-product/${productId}`, payload);
      return response.data;
    },

    onSuccess: (data) => {
      
      toast.success(data?.message || "تم تحديث المنتج بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
     
    },

    onError: (error) => {
      let errorMessage = "حدث خطأ أثناء تعديل المنتج";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });

  return {
    editProduct,
    isEditing,
    isError,
    error,
    isSuccess,
  };
}