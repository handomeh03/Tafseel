"use client";
import api from "@/config/axoisconfig"; 
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";


export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export function useChangePassword() {
  const mutation = useMutation({
    mutationFn: async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
      try {
        const response = await api.patch<ChangePasswordResponse>(
          "/auth/change-password", 
          payload
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message);
        }
        throw new Error("حدث خطأ غير متوقع أثناء تغيير كلمة المرور");
      }
    },

    onSuccess: (data) => {
      toast.success(data?.message || "تم تغيير كلمة المرور بنجاح");
    },

    onError: (error: Error) => {
      toast.error(
        error.message || "حدث خطأ أثناء تغيير كلمة المرور، يرجى المحاولة لاحقاً"
      );
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}