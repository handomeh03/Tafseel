"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/config/axoisconfig";
import { toast } from "sonner";
import { useAuth } from "@/store/Context/UserContext";
import { LoginFormData } from "../types/loginType";


interface LoginResponse {
  accessToken: string;
  role: "SUPER_ADMIN" | "STORE_OWNER" | "CUSTOMER";
}

export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth(); 

  function getRoleRedirectPath(roleName: string): string {
    switch (roleName) {
      case "SUPER_ADMIN":
        return "/admin";
      case "STORE_OWNER":
        return "/";
      case "CUSTOMER":
        return "/";
      default:
        return "/login";
    }
  }

  const mutation = useMutation({
    mutationFn: async (loginData: LoginFormData): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>("/auth/login", loginData);
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      try {

        const meResponse = await api.get("/auth/me");
        setUser(meResponse.data);

        toast.success("تم تسجيل الدخول بنجاح!");
      } catch (err) {
        console.error("Failed to fetch user profile after login:", err);
      }

      const redirectPath = getRoleRedirectPath(data?.role);
      router.push(redirectPath);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "حدث خطأ في عملية تسجيل الدخول";
      toast.error(errorMessage);
    },
  });

  return {
    login: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}