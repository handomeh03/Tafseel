"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Package,
  Store,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Copy,
  Check,
  PackageSearch,
} from "lucide-react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Product } from "@/features/Product/components/ProductCard";
import { ProductCategory } from "@/features/Product/types/productCategory";
import { CreateOrderFormValues, createOrderSchema } from "../types/orderProductType";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.SOFAS]: "أطقم كنبات",
  [ProductCategory.TABLES]: "طاولات وطعام",
  [ProductCategory.BEDROOMS]: "غرف نوم",
  [ProductCategory.DECOR]: "ديكورات وإكسسوارات",
  [ProductCategory.OTHER]: "تصنيفات أخرى",
};

const JORDAN_CITIES = [
  "عمان",
  "إربد",
  "الزرقاء",
  "البلقاء",
  "العقبة",
  "مأدبا",
  "جرش",
  "عجلون",
  "الكرك",
  "الطفيلة",
  "معان",
  "المفرق",
];

const SHIPPING_FEE = 15;

interface OrderProductModalProps {
  product: Product | null;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmitOrder: (
    formData: CreateOrderFormValues
  ) => Promise<string | undefined | void>;
}

export default function OrderProductModal({
  product,
  isOpen,
  isLoading = false,
  onClose,
  onSubmitOrder,
}: OrderProductModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      city: "عمان",
      shippingAddress: "",
      notes: "",
      quantity: 1,
      productId: "",
    },
  });

  const quantity = watch("quantity");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = "hidden";
      reset({
        customerName: "",
        customerPhone: "",
        city: "عمان",
        shippingAddress: "",
        notes: "",
        quantity: 1,
        productId: product.id,
      });
      setCurrentImgIndex(0);
      setSuccessOrderNumber(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, product, reset]);

  if (!isOpen || !product || !mounted) return null;

  const handleValidSubmit = async (formData: CreateOrderFormValues) => {
    const orderNumber = await onSubmitOrder(formData);
    if (orderNumber) {
      setSuccessOrderNumber(orderNumber);
    }
  };

  const handleCopyOrderNumber = async () => {
    if (!successOrderNumber) return;
    try {
      await navigator.clipboard.writeText(successOrderNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const subtotal = product.price ? product.price * quantity : 0;
  const grandTotal = product.price ? subtotal + SHIPPING_FEE : null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary-accent/10 text-primary-accent">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900">
                {successOrderNumber ? "تم إرسال طلبك بنجاح" : "إتمام طلب شراء المنتج"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {successOrderNumber
                  ? "احتفظ برقم الطلب لمتابعة حالة الشحن لاحقاً"
                  : "أدخل تفاصيل التوصيل لنقوم بتأكيد طلبك وتجهيزه فوراً"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successOrderNumber ? (
          /* Success State */
          <div className="p-6 sm:p-10 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-black text-lg text-gray-900">
                شكراً لك، تم استلام طلبك!
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
                سيتواصل معك المتجر قريباً لتأكيد التفاصيل. احتفظ برقم الطلب أدناه لتتمكن من تتبع حالته في أي وقت.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3">
              <span className="font-black text-lg text-primary-accent dir-ltr">
                {successOrderNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyOrderNumber}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="نسخ رقم الطلب"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto pt-1">
              <Link
                href="/myorder"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-accent text-white text-xs font-bold hover:opacity-90 transition-all w-full sm:w-auto"
              >
                <PackageSearch className="w-4 h-4" />
                تتبع طلبك الآن
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all w-full sm:w-auto cursor-pointer"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        ) : (
        /* Body Container */
        <div className="overflow-y-auto p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">


          <div className="md:col-span-5 flex flex-col space-y-4 border-b md:border-b-0 md:border-l border-gray-100 pb-6 md:pb-0 md:pl-6">
            
            {/* Image Slider Box */}
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-inner group">
              {productImages.length > 0 ? (
                <img
                  src={productImages[currentImgIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                  <Package className="w-10 h-10 stroke-1" />
                  <span className="text-xs font-medium">لا توجد صور متوفرة</span>
                </div>
              )}

              {productImages.length > 1 && (
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImgIndex((prev) =>
                        prev === 0 ? productImages.length - 1 : prev - 1
                      )
                    }
                    className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImgIndex((prev) =>
                        prev === productImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Meta */}
            <div className="space-y-3 bg-gray-50/60 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-500 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-primary-accent" />
                  {product.store?.storeName || "متجري"}
                </span>

                {product.category && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-primary-accent/10 text-primary-accent">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug line-clamp-2">
                {product.title}
              </h3>

              {/* Quantity Controls */}
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">الكمية المطلوبة:</span>

                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-gray-200 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setValue("quantity", Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isLoading}
                    className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="w-6 text-center font-bold text-xs text-gray-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setValue("quantity", quantity + 1)}
                    disabled={isLoading}
                    className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              
              <div className="pt-3 border-t border-gray-200/60 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>سعر المنتجات:</span>
                  <span className="font-semibold">
                    {product.price ? `${subtotal} د.أ` : "غير محدد"}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-primary-accent" /> أجور التوصيل:
                  </span>
                  <span className="font-semibold">{SHIPPING_FEE} د.أ</span>
                </div>

                <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-900">المجموع النهائي:</span>
                  <span className="font-black text-primary-accent text-base">
                    {grandTotal ? `${grandTotal} د.أ` : "غير محدد"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          
          <form onSubmit={handleSubmit(handleValidSubmit)} className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              
              {/* Customer Name using Custom Input */}
              <Input
                label="اسم الزبون الكامل *"
                placeholder="أدخل اسمك الكريم..."
                error={errors.customerName?.message}
                register={register("customerName")}
              />

              
              <Input
                label="رقم الهاتف (للتواصل وتأكيد الطلب) *"
                placeholder="0791234567"
                error={errors.customerPhone?.message}
                register={register("customerPhone")}
              />

              
              <div className="space-y-1 text-right w-full">
                <label className="block text-xs font-bold text-brand-dark">
                  المدينة / المحافظة *
                </label>
                <div className="relative">
                  <select
                    {...register("city")}
                    className="w-full px-4 py-3 rounded-xl border border-subtle bg-section-light/60 text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all appearance-none cursor-pointer text-right"
                  >
                    {JORDAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.city && (
                  <p className="text-[11px] text-red-500 font-medium">{errors.city.message}</p>
                )}
              </div>

              
              <Input
                label="عنوان التوصيل التفصيلي *"
                placeholder="اسم الحي، الشارع، رقم المبنى..."
                error={errors.shippingAddress?.message}
                register={register("shippingAddress")}
              />

              {/* Notes */}
              <div className="space-y-1 text-right w-full">
                <label className="block text-xs font-bold text-brand-dark">
                  ملاحظات أو مواصفات خاصة (اختياري)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute right-3.5 top-3 text-gray-400" />
                  <textarea
                    rows={2}
                    placeholder="أي ألوان إضافية أو تفاصيل خاصة..."
                    {...register("notes")}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-subtle bg-section-light/60 text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all resize-none text-right"
                  />
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5 mt-2">
              <Button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold shadow-none rounded-xl cursor-pointer"
              >
                إلغاء
              </Button>

              <Button
                type="submit"
                isLoading={isLoading}
                icon={<CheckCircle2 className="w-4 h-4" />}
                className="px-6 py-2.5 text-xs bg-primary-accent hover:opacity-90 text-white rounded-xl shadow-md cursor-pointer"
              >
                تأكيد وإرسال الطلب
              </Button>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>,
    document.body
  );
}