"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  Package,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

import { useGetProducts } from "@/features/Product/hooks/useGetProduct";

import Pagination from "@/components/Pagenation";
import ProductDetailsModal from "@/features/Product/components/ProductDetailsModal";
import ProductCard, { Product } from "@/features/Product/components/ProductCard";
import { ProductCategory } from "@/features/Product/types/productCategory";
import { useCreateOrder } from "@/features/order/hooks/useCreateOrder";
import { CreateOrderFormValues } from "@/features/order/types/orderProductType";
import OrderProductModal from "@/features/order/components/OrderProductModal";


const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.SOFAS]: "أطقم كنبات",
  [ProductCategory.TABLES]: "طاولات وطعام",
  [ProductCategory.BEDROOMS]: "غرف نوم",
  [ProductCategory.DECOR]: "ديكورات وإكسسوارات",
  [ProductCategory.OTHER]: "تصنيفات أخرى",
};

const HERO_SLIDES = [
  {
    id: 1,
    title: "أطقم كنبات مودرن وفاخرة",
    subtitle: "تصاميم مخصصة بأجود أنواع الخشب الطبيعي والأقمشة المقاومة للبقع",
    badge: "تشكيلة الكنب",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    title: "غرف نوم ماستر بتصاميم كلاسيكية وعصرية",
    subtitle: "راحة لا مثيل لها مع لمسات فندقية راقية تفصل خصيصاً لمساحتك",
    badge: "غرف النوم",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    title: "ديكورات وطاولات طعام مميزة",
    subtitle: "أضف لمسة جمالية استثنائية لبيتك مع أرقى التشكيلات المتاحة",
    badge: "الديكور والأثاث",
    image:
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1600",
  },
];

export default function PublicProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);

  
  const { createOrder, isPending: isSubmittingOrder } = useCreateOrder();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const { productsData, isLoading, isError, error, isFetching } = useGetProducts(
    "/product/public",
    currentPage,
    pageSize,
    searchTerm
  );

  const products: Product[] = productsData?.data || [];
  const totalItems: number = productsData?.totalCount || 0;
  const totalPages: number = productsData?.totalPages || 1;

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "ALL") return true;
    return product.category === selectedCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const closeDetailsModal = useCallback(() => setSelectedProductForDetails(null), []);
  const closeOrderModal = useCallback(() => setSelectedProductForOrder(null), []);

  
  const handleOrderSubmit = async (formData: CreateOrderFormValues) => {
    try {
      await createOrder(formData);
      closeOrderModal();
    } catch (err) {
   
      console.error("Order submission failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 pb-20" dir="rtl">
      
      <div
        className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] bg-gray-900 overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-10000 ease-linear"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 max-w-7xl mx-auto z-20 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-accent/90 text-white text-xs font-bold w-fit shadow-sm backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl leading-tight">
                  {slide.title}
                </h1>

                <p className="text-gray-200 text-xs sm:text-sm max-w-xl leading-relaxed font-normal">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={prevSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-brand-dark backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-brand-dark backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-primary-accent"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-7 relative z-30">
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-subtle flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن اسم المنتج أو الوصف..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-subtle bg-section-light/50 text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-right"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 [scrollbar-width:none]">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0 ml-1 hidden md:block" />
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "ALL"
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/60"
              }`}
            >
              الكل
            </button>

            {Object.values(ProductCategory).map((catKey) => (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === catKey
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                {CATEGORY_LABELS[catKey]}
              </button>
            ))}
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 space-y-8">
        {isLoading ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
            <p className="text-sm font-medium">جاري تحميل معرض المنتجات...</p>
          </div>
        ) : isError ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-red-100 shadow-sm max-w-md mx-auto my-12 space-y-2">
            <p className="text-red-500 font-bold text-sm">
              {error instanceof Error ? error.message : "حدث خطأ أثناء جلب المنتجات"}
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPreview={() => setSelectedProductForDetails(product)}
                  onOrder={() => setSelectedProductForOrder(product)}
                />
              ))}
            </div>

            <div className="bg-white border border-subtle rounded-2xl p-2 shadow-sm transition-all">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalItems}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                isLoading={isFetching}
              />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-subtle shadow-sm max-w-md mx-auto my-12 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-accent/10 text-primary-accent flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-dark text-base">
              لا توجد منتجات مطابقة
            </h3>
            <p className="text-xs text-gray-400">
              جرّب البحث بكلمات مختلفة أو تغيير التصنيف المحدد.
            </p>
          </div>
        )}
      </div>

      
      {selectedProductForDetails && (
        <ProductDetailsModal
          selectedProduct={selectedProductForDetails}
          onClose={closeDetailsModal}
          onOrderNow={(product) => {
            closeDetailsModal();
            setSelectedProductForOrder(product);
          }}
        />
      )}

      
      {selectedProductForOrder && (
        <OrderProductModal
          product={selectedProductForOrder}
          isOpen={Boolean(selectedProductForOrder)}
          isLoading={isSubmittingOrder}
          onClose={closeOrderModal}
          onSubmitOrder={handleOrderSubmit}
        />
      )}
    </div>
  );
}