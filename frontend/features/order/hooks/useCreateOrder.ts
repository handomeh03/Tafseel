"use client";

import api from "@/config/axoisconfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { CreateOrderFormValues } from "../types/orderProductType";


export interface CreateOrderResponse {
  message: string;
  data?: any;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateOrderFormValues): Promise<CreateOrderResponse> => {
      try {
        const response = await api.post<CreateOrderResponse>(
          "/order/create-order",
          payload
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message);
        }
        throw new Error("حدث خطأ غير متوقع أثناء إرسال الطلب");
      }
    },

    onSuccess: (data) => {
      toast.success(data?.message || "تم إرسال طلبك بنجاح");
      
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error: Error) => {
      toast.error(
        error.message || "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً"
      );
    },
  });

  return {
    createOrder: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}