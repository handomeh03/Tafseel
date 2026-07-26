"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/config/axoisconfig";
import { toast } from "sonner";
import { StoreRequestFormData } from "../types/storeRequestType";


interface StoreRequestResponse {
  message: string;
}

export function useStoreRequest() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (requestData: StoreRequestFormData): Promise<StoreRequestResponse> => {
      const response = await api.post<StoreRequestResponse>( "/store/request", requestData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(
        data?.message ||
          "تم تقديم طلب إنشاء المتجر بنجاح! سنقوم بالتواصل معك قريباً"
      );
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء إرسال طلب المتجر، يرجى المحاولة لاحقاً";
      toast.error(errorMessage);
    },
  });

  return {
    submitStoreRequest: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}