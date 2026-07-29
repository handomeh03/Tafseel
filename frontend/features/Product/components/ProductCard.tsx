"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Info,
  Package,
  ChevronRight,
  ChevronLeft,
  Store,
} from "lucide-react";

import { Button } from "@/components/Button";
import { ProductCategory } from "@/features/Product/types/productCategory";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.SOFAS]: "أطقم كنبات",
  [ProductCategory.TABLES]: "طاولات وطعام",
  [ProductCategory.BEDROOMS]: "غرف نوم",
  [ProductCategory.DECOR]: "ديكورات وإكسسوارات",
  [ProductCategory.OTHER]: "تصنيفات أخرى",
};

export interface ProductStore {
  id: string | number;
  storeName: string;
  logo?: string;
  city?: string;
}

export interface Product {
  id: string | number;
  title: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  isAvailable: boolean;
  images?: string[];
  image?: string;
  createdAt: string;
  store?: ProductStore;
}

interface ProductCardProps {
  product: Product;
  onPreview: () => void;
  onOrder: () => void; // 👈 تم إضافة الخاصية هنا
}

export default function ProductCard({
  product,
  onPreview,
  onOrder, // 👈 واستقبالها هنا
}: ProductCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const hasMultipleImages = productImages.length > 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* 🖼️ Box الصورة */}
      <div
        className="relative aspect-[4/3] bg-gray-50/80 overflow-hidden cursor-pointer"
        onClick={onPreview}
      >
        {productImages.length > 0 ? (
          <img
            src={productImages[currentImgIndex]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-1.5">
            <Package className="w-8 h-8 stroke-[1.2]" />
            <span className="text-[11px] font-medium text-gray-400">لا تتوفر صور</span>
          </div>
        )}

        {/* Badge الفئة الشفاف بأعلى اليمين */}
        {product.category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/80 text-gray-800 backdrop-blur-md shadow-xs border border-white/50">
            {CATEGORY_LABELS[product.category]}
          </span>
        )}

        {/* حالة التوفر فقط إذا غير متوفر */}
        {!product.isAvailable && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/90 text-white backdrop-blur-md">
            غير متوفر
          </span>
        )}

        {/* أزرار السلايدر في حال وجود أكثر من صورة */}
        {hasMultipleImages && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImgIndex((prev) =>
                  prev === 0 ? productImages.length - 1 : prev - 1
                );
              }}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImgIndex((prev) =>
                  prev === productImages.length - 1 ? 0 : prev + 1
                );
              }}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 📄 تفاصيل المنتج */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* اسم المتجر */}
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
            <Store className="w-3.5 h-3.5 text-primary-accent" />
            <span>{product.store?.storeName || "متجري"}</span>
          </div>

          {/* العنوان والسعر بصف واحد */}
          <div className="flex items-start justify-between gap-2 pt-0.5">
            <h3
              onClick={onPreview}
              className="font-bold text-sm text-gray-900 line-clamp-1 cursor-pointer hover:text-primary-accent transition-colors flex-1"
            >
              {product.title}
            </h3>

            <span className="font-black text-gray-900 text-sm whitespace-nowrap">
              {product.price ? (
                <>
                  {product.price} <span className="text-[10px] font-bold text-primary-accent">د.أ</span>
                </>
              ) : (
                <span className="text-xs font-normal text-gray-400">غير محدد</span>
              )}
            </span>
          </div>

          {/* الوصف */}
          {product.description && (
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* 🔘 الأزرار السفلية */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Button
            type="button"
            onClick={onPreview}
            icon={<Info className="w-3.5 h-3.5" />}
            className="py-2 px-3 bg-gray-50 border border-gray-200/60 text-gray-700 hover:bg-gray-100 text-xs font-semibold shadow-none rounded-xl cursor-pointer"
          >
            التفاصيل
          </Button>

          <Button
            type="button"
            onClick={onOrder} // 👈 تم ربطه بدالة الطلب المباشر بنجاح
            disabled={!product.isAvailable}
            icon={<ShoppingBag className="w-3.5 h-3.5" />}
            className="py-2 px-3 text-xs bg-primary-accent hover:opacity-95 rounded-xl shadow-xs cursor-pointer"
          >
            اطلب الآن
          </Button>
        </div>
      </div>
    </div>
  );
}