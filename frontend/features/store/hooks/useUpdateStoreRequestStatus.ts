"use client";

import api from "@/config/axoisconfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface UpdateStoreRequestPayload {
  requestId: string;
  status: RequestStatus;
  rejectionReason?: string;
}

export interface UpdateStoreRequestResponse {
  message: string;
}

export function useUpdateStoreRequestStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: UpdateStoreRequestPayload): Promise<UpdateStoreRequestResponse> => {
      try {
        const response = await api.patch<UpdateStoreRequestResponse>(
          `/store/edit-request/${requestId}/status`,
          {
            status 
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

    onSuccess: (data, variables) => {
      const actionText = variables.status === "APPROVED" ? "قبول" : "رفض";
      toast.success(data?.message || `تم ${actionText} طلب المتجر بنجاح`);
      queryClient.invalidateQueries({
        queryKey: ["store-requests"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء تحديث حالة الطلب، يرجى المحاولة لاحقاً");
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}