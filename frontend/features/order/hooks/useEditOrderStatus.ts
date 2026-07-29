"use client";


import api from "@/config/axoisconfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { OrderStatus } from "../types/order-status";


export interface EditOrderStatusPayload {
  orderId: number;
  status: OrderStatus;
}

export interface EditOrderStatusResponse {
  message: string;
  data?: any;
}

export function useEditOrderStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: EditOrderStatusPayload): Promise<EditOrderStatusResponse> => {
      try {
        const response = await api.patch<EditOrderStatusResponse>(
          "/order/edit-order",
          {
            orderId: Number(orderId), 
            status,
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message);
        }
        throw new Error("حدث خطأ غير متوقع أثناء تحديث حالة الطلب");
      }
    },

    onSuccess: (data) => {
      toast.success(data?.message || "تم تحديث حالة الطلب بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: (error: Error) => {
      toast.error(
        error.message || "حدث خطأ أثناء تحديث حالة الطلب، يرجى المحاولة لاحقاً"
      );
    },
  });

  return {
    editOrderStatus: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}