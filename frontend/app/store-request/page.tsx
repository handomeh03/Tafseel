"use client";

import { useState } from "react";
import Link from "next/link";
import { Sofa, ArrowLeft } from "lucide-react";
import { StoreRequestFormData } from "@/features/store/types/storeRequestType";
import SuccessRequest from "@/features/store/components/SuccessRequest";
import StoreRequestForm from "@/features/store/components/StoreRequestForm";

export default function StoreReuestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
``
  const onSubmit = async (data: StoreRequestFormData) => {
    try {
      console.log("Submitting DTO Payload:", data);


      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting store request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-main text-brand-dark flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C87A3E_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />

      {/* Header Identity */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center relative z-10 space-y-3">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-primary-accent text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
            <Sofa className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-brand-dark">
            تفصيل <span className="text-brand-primary">Store</span>
          </span>
        </Link>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-brand-dark">
          طلب إنشاء متجر كنب وأثاث خاص
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto">
          املأ البيانات التالية لإنشاء متجرك الإلكتروني وعرض موديلاتك الجاهزة للبيع مباشرة
        </p>
      </div>

      {/* Form Container Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-card-custom py-8 px-6 sm:px-10 rounded-3xl border border-subtle shadow-xl">
          {isSubmitted ? (
            <SuccessRequest handleChange={() => setIsSubmitted(false)} />
          ) : (
            <StoreRequestForm onSubmit={onSubmit} />
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

      </div>

    </div>
  );
}