"use client";

import api from "@/config/axoisconfig"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { CreateProductFormData } from "../types/createProductType";


export interface CreateProductResponse {
  message: string;
  data?: any;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateProductFormData): Promise<CreateProductResponse> => {
      try {
        const response = await api.post<CreateProductResponse>(
          "/product/create-product",
          payload
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message);
        }
        throw new Error("حدث خطأ غير متوقع أثناء إضافة المنتج");
      }
    },

    onSuccess: (data) => {
      toast.success(data?.message || "تم إضافة المنتج بنجاح");
      
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["store-products"] });
    },

    onError: (error: Error) => {
      toast.error(
        error.message || "حدث خطأ أثناء إضافة المنتج، يرجى المحاولة لاحقاً"
      );
    },
  });

  return {
    createProduct: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}