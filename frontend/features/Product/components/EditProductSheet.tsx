"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2, Edit3, CheckCircle, AlertCircle } from "lucide-react";
import { UpdateProductPayload, useEditProduct } from "../hooks/useEditProduct";


export interface Product {
  id: string | number;
  title: string;
  description?: string;
  price?: number;
  isAvailable: boolean;
}

interface EditProductSheetProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function EditProductSheet({
  isOpen,
  product,
  onClose,
}: EditProductSheetProps) {
  const { editProduct, isEditing } = useEditProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProductPayload>();


  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        description: product.description || "",
        price: product.price ? Number(product.price) : undefined,
        isAvailable: product.isAvailable,
      });
    }
  }, [product, reset]);

  if (!isOpen || !product) return null;

  const onSubmit = (data: UpdateProductPayload) => {
    editProduct(
      {
        productId: product.id,
        payload: {
          ...data,
          price: data.price ? Number(data.price) : undefined,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
      
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0">
        
        <div className="w-screen max-w-md bg-white shadow-2xl border-r border-gray-100 flex flex-col justify-between animate-in slide-in-from-left duration-300">
          
          {/* 1️⃣ Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary-accent/10 text-primary-accent flex items-center justify-center font-bold">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">تعديل بيانات المنتج</h2>
                <p className="text-xs text-gray-400">معرف المنتج: #{product.id}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2️⃣ Form Fields */}
          <form
            id="edit-product-form"
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-5 overflow-y-auto flex-1"
          >
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">اسم المنتج</label>
              <input
                type="text"
                {...register("title", { required: "اسم المنتج مطلوب" })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent transition-colors"
                placeholder="أدخل اسم المنتج..."
              />
              {errors.title && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">السعر (بالدينار)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  min: { value: 0, message: "السعر لا يمكن أن يكون بالسالب" },
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent transition-colors"
                placeholder="مثال: 150"
              />
              {errors.price && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Availability Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">حالة التوفر</label>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    {...register("isAvailable")}
                    className="w-4 h-4 rounded text-primary-accent focus:ring-primary-accent border-gray-300"
                  />
                  <span>المنتج متوفر للطلب</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">وصف المنتج</label>
              <textarea
                rows={4}
                {...register("description")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
                placeholder="أدخل تفاصيل ومواصفات المنتج..."
              />
            </div>

            {/* ملاحظة بشأن الصور */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 text-amber-800 text-xs leading-relaxed">
              💡 <b>ملاحظة:</b> إدارة وتعديل الصور سنربطها بخصائص مستقلة لاحقاً
            </div>
          </form>

          {/* 3️⃣ Actions Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <button
              type="submit"
              form="edit-product-form"
              disabled={isEditing}
              className="flex-1 py-3 bg-primary-accent text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              {isEditing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>حفظ التغييرات</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isEditing}
              className="py-3 px-5 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}