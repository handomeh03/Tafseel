"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { StoreRequestFormData, storeRequestSchema } from "../types/storeRequestType";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

interface StoreRequestFormProps {
    onSubmit: (data: StoreRequestFormData) => Promise<void> | void;
    isPending:boolean;
}

export default function StoreRequestForm({ onSubmit,isPending }: StoreRequestFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StoreRequestFormData>({
        resolver: zodResolver(storeRequestSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* storeName */}
                <Input
                    id="storeName"
                    label="اسم المتجر / المعرض *"
                    placeholder="مثال: منجرة الفخامة"
                    register={register("storeName")}
                    error={errors.storeName?.message}
                />

                {/* ownerName */}
                <Input
                    id="ownerName"
                    label="اسم المالك *"
                    placeholder="اسمك الكامل"
                    register={register("ownerName")}
                    error={errors.ownerName?.message}
                />
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* email */}
                <Input
                    id="email"
                    type="email"
                    dir="ltr"
                    label="البريد الإلكتروني *"
                    placeholder="name@example.com"
                    register={register("email")}
                    error={errors.email?.message}
                    className="text-left"
                />

                {/* phone */}
                <Input
                    id="phone"
                    type="tel"
                    dir="ltr"
                    label="رقم الموبايل *"
                    placeholder="0791234567"
                    register={register("phone")}
                    error={errors.phone?.message}
                />
            </div>

            {/* city (Optional) */}
            <Input
                id="city"
                label="المدينة / المحافظة (اختياري)"
                placeholder="عمان، الزرقاء، إربد..."
                register={register("city")}
                error={errors.city?.message}
            />

            {/* notes (Optional) */}
            <div className="space-y-1 text-right w-full">
                <label htmlFor="notes" className="block text-xs font-bold text-brand-dark">
                    ملاحظات أو تفاصيل إضافية (اختياري)
                </label>
                <textarea
                    id="notes"
                    rows={3}
                    placeholder="اكتب هنا أي تفاصيل عن ورشتك أو أنواع الكنب التي تصنعها..."
                    {...register("notes")}
                    className="w-full px-4 py-3 rounded-xl border border-subtle bg-section-light/60 text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all text-right resize-none"
                />
                {errors.notes && (
                    <p className="text-[11px] text-red-500 font-medium">
                        {errors.notes.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full"
                isLoading={isPending}
                icon={<ArrowLeft className="w-4 h-4" />}
            >
                إرسال طلب إنشاء المتجر
            </Button>
        </form>
    );
}