"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Store, 
  Tag, 
  Calendar, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Layers,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/Button";
import { ProductCategory } from "../types/productCategory";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.SOFAS]: "أطقم كنبات",
  [ProductCategory.TABLES]: "طاولات وطعام",
  [ProductCategory.BEDROOMS]: "غرف نوم",
  [ProductCategory.DECOR]: "ديكورات وإكسسوارات",
  [ProductCategory.OTHER]: "تصنيفات أخرى",
};

export interface ProductStore {
  id: string |number;
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

interface ProductDetailsModalProps {
  selectedProduct: Product | null;
  onClose: () => void;
  onOrderNow?: (product: Product) => void; // 👈 تم تعريف الدالة هنا لتستقبل المنتج وتحوله لمودال الطلب
}

export default function ProductDetailsModal({
  selectedProduct,
  onClose,
  onOrderNow,
}: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productImages: string[] = 
    selectedProduct?.images && selectedProduct.images.length > 0
      ? selectedProduct.images
      : selectedProduct?.image
      ? [selectedProduct.image]
      : [];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 relative border border-gray-100 shadow-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-accent" />
            تفاصيل المنتج
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 p-1.5 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview Box */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3] flex items-center justify-center group">
          {productImages.length > 0 ? (
            <>
              <img
                src={productImages[activeImageIndex]}
                alt={`${selectedProduct.title} - ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-slate-900/60 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
                    {activeImageIndex + 1} / {productImages.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
              <Package className="w-12 h-12 stroke-1" />
              <span className="text-xs">لا تتوفر صور للمنتج</span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {productImages.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 dir-rtl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? "border-primary-accent shadow-sm scale-105"
                    : "border-gray-200 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail-${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Title and Price */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 flex justify-between items-start gap-4">
          <div className="space-y-1">
            {selectedProduct.category && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-primary-accent/10 text-primary-accent text-[11px] font-bold">
                <Layers className="w-3 h-3" />
                <span>{CATEGORY_LABELS[selectedProduct.category]}</span>
              </div>
            )}
            <h4 className="font-bold text-base text-gray-900">{selectedProduct.title}</h4>
          </div>
          <div className="text-left">
            <p className="text-sm text-primary-accent font-black">
              {selectedProduct.price ? `${selectedProduct.price} د.أ` : "السعر عند الطلب"}
            </p>
          </div>
        </div>

        {/* Store & Availability */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100 space-y-1">
            <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
              <Store className="w-3.5 h-3.5 text-primary-accent" /> المتجر المالك
            </p>
            <p className="font-bold text-gray-900 text-xs">
              {selectedProduct.store?.storeName || "متجري"}
            </p>
          </div>

          <div className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100 space-y-1">
            <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
              <Tag className="w-3.5 h-3.5 text-primary-accent" /> حالة التوفر
            </p>
            <div>
              {selectedProduct.isAvailable ? (
                <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                  متوفر للبيع
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-bold text-rose-600">
                  غير متوفر
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {selectedProduct.description && (
          <div className="space-y-1.5">
            <p className="text-xs text-gray-400 font-medium">وصف المنتج</p>
            <p className="bg-gray-50/50 p-3.5 rounded-2xl text-xs text-gray-700 border border-gray-100 leading-relaxed whitespace-pre-line">
              {selectedProduct.description}
            </p>
          </div>
        )}

        {/* Footer Actions & Date */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(selectedProduct.createdAt).toLocaleDateString("ar-EG")}
            </span>
          </div>

          {/* زر الشراء المباشر من المودال */}
          {onOrderNow && (
            <Button
              type="button"
              onClick={() => onOrderNow(selectedProduct)}
              disabled={!selectedProduct.isAvailable}
              icon={<ShoppingBag className="w-4 h-4" />}
              className="py-2.5 px-5 text-xs bg-primary-accent hover:opacity-90 rounded-xl shadow-xs cursor-pointer"
            >
              اطلب الآن
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}