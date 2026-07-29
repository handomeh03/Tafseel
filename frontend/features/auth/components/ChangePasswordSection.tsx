"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, Check, ShieldCheck } from "lucide-react";
import { ChangePasswordFormData, changePasswordSchema } from "../types/changePasswordType";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useChangePassword } from "../hooks/useChangePasssword";

interface ChangePasswordSectionProps {
  onSubmitPassword?: (data: ChangePasswordFormData) => Promise<void>;
}

export default function ChangePasswordSection({
  onSubmitPassword,
}: ChangePasswordSectionProps) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  
  const { changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  
  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      if (onSubmitPassword) {
        await onSubmitPassword(data);
      } else {
        await changePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        });
      }
      reset();
    } catch {
      
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Section Header */}
      <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-accent" />
            تغيير كلمة السر
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            احرص على استخدام كلمة سر قوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز
          </p>
        </div>
        <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>

      {/* Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        {/* Old Password */}
        <div className="relative">
          <Input
            id="oldPassword"
            label="كلمة السر الحالية *"
            type={showOld ? "text" : "password"}
            placeholder="أدخل كلمة السر الحالية"
            error={errors.oldPassword?.message}
            register={register("oldPassword")}
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute left-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <Input
            id="newPassword"
            label="كلمة السر الجديدة *"
            type={showNew ? "text" : "password"}
            placeholder="أدخل كلمة السر الجديدة"
            error={errors.newPassword?.message}
            register={register("newPassword")}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute left-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <Input
            id="confirmPassword"
            label="تأكيد كلمة السر الجديدة *"
            type={showConfirm ? "text" : "password"}
            placeholder="أعد إدخال كلمة السر الجديدة"
            error={errors.confirmPassword?.message}
            register={register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute left-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            icon={<Check className="w-4 h-4" />}
            className="px-6 py-2.5 text-xs"
          >
            حفظ كلمة السر الجديدة
          </Button>
        </div>
      </form>
    </div>
  );
}