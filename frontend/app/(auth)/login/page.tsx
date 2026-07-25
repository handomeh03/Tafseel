"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sofa, ArrowLeft, ShieldCheck } from "lucide-react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { LoginFormData, loginSchema } from "@/features/auth/types/loginType";
import { useLogin } from "@/features/auth/hooks/uselogin";

export default function LoginPage() {
  const {login,isPending}=useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
     
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-main text-brand-dark flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#C87A3E_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />

      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 space-y-3">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-primary-accent text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
            <Sofa className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-brand-dark">
            تفصيل <span className="text-brand-primary">Store</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-dark">
          تسجيل الدخول
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted">
          أدخل بريدك الإلكتروني وكلمة المرور لمتابعة طلباتك
        </p>
      </div>

      {/* Form Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-card-custom py-8 px-6 sm:px-10 rounded-3xl border border-subtle shadow-xl space-y-6">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Field */}
            <Input
              id="email"
              type="email"
              dir="ltr"
              label="البريد الإلكتروني"
              placeholder="name@example.com"
              register={register("email")}
              error={errors.email?.message}
            />

            {/* Password Field */}
            <div>
              <Input
                id="password"
                type="password"
                label="كلمة المرور"
                placeholder="••••••••"
                register={register("password")}
                error={errors.password?.message}
              />

              {/* Forgot Password Link */}
              <div className="pt-1 text-left">
                <Link
                  href="#forgot-password"
                  className="text-[11px] font-semibold text-brand-primary hover:underline inline-block"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              isLoading={isPending}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              تسجيل الدخول
            </Button>

          </form>

          {/* Footer inside card */}
          <div className="pt-4 border-t border-subtle/60 text-center space-y-3">
            <p className="text-xs text-brand-muted">
              ليس لديك حساب بعد؟{" "}
              <Link href="#register" className="font-bold text-brand-primary hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>

           
          </div>

        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

      </div>

    </div>
  );
}