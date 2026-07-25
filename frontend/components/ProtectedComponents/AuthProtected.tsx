
"use client";


import { useAuth } from "@/store/Context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("SUPER_ADMIN" | "STORE_OWNER" | "CUSTOMER")[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/"); 
      }
    }
  }, [user, isLoading, router, allowedRoles, redirectTo]);

  
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-brand-dark border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  
  if (!user) return null;

  
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;


  return <>{children}</>;
}