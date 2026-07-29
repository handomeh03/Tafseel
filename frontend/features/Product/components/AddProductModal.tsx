"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Plus,
  Package,
  UploadCloud,
  Trash2,
  CheckCircle2,
  ChevronDown,
  Layers,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { CreateProductFormData, createProductSchema } from "../types/createProductType";
import { ProductCategory } from "../types/productCategory";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.SOFAS]: "أطقم كنبات",
  [ProductCategory.TABLES]: "طاولات وطعام",
  [ProductCategory.BEDROOMS]: "غرف نوم",
  [ProductCategory.DECOR]: "ديكورات وإكسسوارات",
  [ProductCategory.OTHER]: "تصنيفات أخرى",
};

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
}: AddProductModalProps) {
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { createProduct, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: ProductCategory.SOFAS,
      isAvailable: true,
      images: [],
    },
  });

  const selectedCategory = watch("category");
  const isAvailableValue = watch("isAvailable");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`الملف ${file.name} يتجاوز الحجم المسموح (5MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          newImages.push(reader.result);
          if (newImages.length === fileArray.length) {
            const updated = [...imagesList, ...newImages];
            setImagesList(updated);
            setValue("images", updated);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const updated = imagesList.filter((_, i) => i !== index);
    setImagesList(updated);
    setValue("images", updated);
  };

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      await createProduct(data);
      reset();
      setImagesList([]);
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // Error handling
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      dir="rtl"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary-accent/10 text-primary-accent">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900">إضافة منتج جديد</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                أدخل تفاصيل المنتج ورَفْع الصّوَر لعرضها بداخل متجرك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="p-5 space-y-4 overflow-y-auto max-h-[65vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <Input
              id="title"
              label="عنوان المنتج *"
              placeholder="مثال: طقم كنبات أرقوان فاخر"
              error={errors.title?.message}
              register={register("title")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <Input
                id="price"
                label="السعر (د.أ) *"
                type="number"
                step="0.01"
                placeholder="0.00"
                error={errors.price?.message}
                register={register("price")}
              />

              <div className="space-y-1.5 text-right relative" ref={dropdownRef}>
                <label className="block text-xs font-bold text-brand-dark">
                  تصنيف المنتج *
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsSelectOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border bg-section-light/60 text-brand-dark text-xs transition-all duration-200 ${
                    isSelectOpen
                      ? "border-brand-primary ring-2 ring-brand-primary/20 bg-white"
                      : "border-subtle hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary-accent" />
                    <span className="font-semibold">
                      {selectedCategory ? CATEGORY_LABELS[selectedCategory] : "اختر التصنيف..."}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isSelectOpen ? "rotate-180 text-brand-primary" : ""
                    }`}
                  />
                </button>

                {isSelectOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-subtle rounded-2xl shadow-xl z-30 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    {Object.values(ProductCategory).map((categoryVal) => {
                      const isSelected = selectedCategory === categoryVal;
                      return (
                        <button
                          key={categoryVal}
                          type="button"
                          onClick={() => {
                            setValue("category", categoryVal, { shouldValidate: true });
                            setIsSelectOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-right transition-colors ${
                            isSelected
                              ? "bg-primary-accent/10 text-primary-accent font-bold"
                              : "text-gray-700 hover:bg-gray-50 font-medium"
                          }`}
                        >
                          <span>{CATEGORY_LABELS[categoryVal]}</span>
                          {isSelected && <Check className="w-4 h-4 text-primary-accent" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {errors.category && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-bold text-brand-dark">
                حالة التوفر
              </label>
              <button
                type="button"
                onClick={() => setValue("isAvailable", !isAvailableValue)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isAvailableValue
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-700"
                }`}
              >
                <span>{isAvailableValue ? "متوفر للبيع" : "غير متوفر حالياً"}</span>
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isAvailableValue ? "text-emerald-600" : "text-rose-400 opacity-40"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-1.5 text-right">
              <label htmlFor="description" className="block text-xs font-bold text-brand-dark">
                وصف المنتج
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="أدخل وصفاً تفصيلياً عن خامة المنتج، الأبعاد، والألوان المتاحة..."
                {...register("description")}
                className="w-full px-4 py-3 rounded-xl border border-subtle bg-section-light/60 text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all text-right resize-none"
              />
              {errors.description && (
                <p className="text-[11px] text-red-500 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2 text-right">
              <label className="block text-xs font-bold text-brand-dark">
                صور المنتج 
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 hover:border-primary-accent/60 bg-gray-50/50 hover:bg-primary-accent/5 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 group-hover:text-primary-accent group-hover:scale-110 transition-all">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700">
                    اضغط هنا لاختيار الصور من جهازك
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    يدعم PNG, JPG, WEBP حتى 5MB لكل صورة
                  </p>
                </div>
              </div>

              {imagesList.length > 0 && (
                <div className="grid grid-cols-4 gap-2.5 pt-2">
                  {imagesList.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="relative group rounded-2xl overflow-hidden border border-gray-200 aspect-square bg-gray-100 shadow-sm"
                    >
                      <img
                        src={imgSrc}
                        alt={`product-upload-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute inset-0 bg-slate-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-rose-400 hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-none"
            >
              إلغاء
            </Button>

            <Button
              type="submit"
              isLoading={isPending}
              icon={<Plus className="w-4 h-4" />}
              className="px-6 py-2.5 text-xs"
            >
              إضافة المنتج
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}