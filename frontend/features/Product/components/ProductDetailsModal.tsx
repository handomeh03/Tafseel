"use client";

import { 
  Package, 
  Store, 
  Tag, 
  Calendar, 
  X 
} from "lucide-react";

export interface ProductStore {
  id: string;
  storeName: string;
  logo?: string;
  city?: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price?: number;
  isAvailable: boolean;
  images?: string[];
  image?: string;
  createdAt: string;
  store?: ProductStore;
}

interface ProductDetailsModalProps {
  selectedProduct: Product | null;
  onClose: () => void;
}

export default function ProductDetailsModal({
  selectedProduct,
  onClose,
}: ProductDetailsModalProps) {
  if (!selectedProduct) return null;

  const productImage =
    selectedProduct.images && selectedProduct.images.length > 0
      ? selectedProduct.images[0]
      : selectedProduct.image;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 relative border border-gray-100 shadow-2xl"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-accent" />
            تفاصيل المنتج
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 p-1.5 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 text-sm text-gray-700">
          {/* Product Image & Title */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            {productImage ? (
              <img
                src={productImage}
                alt={selectedProduct.title}
                className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400">
                <Package className="w-8 h-8" />
              </div>
            )}
            <div>
              <h4 className="font-bold text-base text-gray-900">{selectedProduct.title}</h4>
              <p className="text-xs text-primary-accent font-extrabold mt-0.5">
                {selectedProduct.price ? `${selectedProduct.price} د.أ` : "السعر عند الطلب"}
              </p>
            </div>
          </div>

          {/* Store & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                <Store className="w-3.5 h-3.5" /> المتجر المالك
              </p>
              <p className="font-bold text-gray-900 mt-1">
                {selectedProduct.store?.storeName || "غير محدد"}
              </p>
            </div>

            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                <Tag className="w-3.5 h-3.5" /> الحالة
              </p>
              <p className="font-bold text-gray-900 mt-1">
                {selectedProduct.isAvailable ? (
                  <span className="text-emerald-600">متوفر</span>
                ) : (
                  <span className="text-rose-600">غير متوفر</span>
                )}
              </p>
            </div>
          </div>

          {/* Description */}
          {selectedProduct.description && (
            <div>
              <p className="text-xs text-gray-400 font-medium">وصف المنتج</p>
              <p className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600 mt-1 border border-gray-100 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>
          )}

          {/* Created At */}
          <div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" /> تاريخ الإضافة
            </p>
            <p className="font-medium text-gray-800 mt-0.5">
              {new Date(selectedProduct.createdAt).toLocaleDateString("ar-EG")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}