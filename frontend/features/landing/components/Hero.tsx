"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sofa, Check, Store, Clock, ArrowLeft, Sparkles } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop",
    title: "طقم زاوية مودرن رويال",
    store: "منجرة وبروفايل الفخامة",
    price: "540 د.أ",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
    title: "طقم أمريكي ملكي 7 مقاعد",
    store: "معرض دار التنجيد",
    price: "720 د.أ",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop",
    title: "طقم كنب كلاسيك مخمل",
    store: "محل الأناقة للأثاث",
    price: "490 د.أ",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-hero text-white py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden min-h-[550px] md:min-h-[620px] flex items-center">
      
      {/* Background Image Slider with Crossfade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-105 transition-transform duration-[6000ms]"
                : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/75 to-black/50 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        
        {/* Text Content Block */}
        <div className="space-y-4 sm:space-y-6 text-right order-1">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-light border border-white/15 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>معرض الكنب والأثاث الأول</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
            جدّد بيتك بـ <span className="text-brand-primary">أطقم كنب جاهزة</span> مباشرة من أفضل المحلات
          </h1>

          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-light">
            تصفح أحدث الموديلات والألوان الجاهزة للتسليم الفوري. اختر التصميم اللي بيناسب ذوقك واطلبه مباشرة من المحل المُصنّع بضغطة زر
          </p>

          {/* Bullet Points */}
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-200">
            <div className="flex items-start sm:items-center gap-2.5">
              <Check className="w-4 h-4 text-brand-primary font-bold shrink-0 mt-0.5 sm:mt-0" />
              <span>موديلات متنوعة (مودرن، كلاسيك، زوايا L، وأمريكي)</span>
            </div>
            <div className="flex items-start sm:items-center gap-2.5">
              <Check className="w-4 h-4 text-brand-primary font-bold shrink-0 mt-0.5 sm:mt-0" />
              <span>أسعار واضحة ومواصفات تفصيلية لكل طقم</span>
            </div>
            <div className="flex items-start sm:items-center gap-2.5">
              <Check className="w-4 h-4 text-brand-primary font-bold shrink-0 mt-0.5 sm:mt-0" />
              <span>طلب مباشر ومعاينة قبل التوصيل</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4">
            <Link
               href="/product"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-primary-accent text-white font-bold text-center text-xs sm:text-sm hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <span>استكشف الموديلات الجاهزة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Slide Indicators (Dots) */}
          <div className="flex items-center gap-2 pt-1 sm:pt-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all touch-manipulation ${
                  idx === currentSlide
                    ? "w-7 sm:w-8 bg-brand-primary"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`الذهاب للشريحة ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* E-Commerce Floating Product Card */}
        <div className="relative order-2 w-full max-w-md mx-auto md:max-w-none">
          <div className="bg-card-custom/95 backdrop-blur-md text-brand-dark rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between pb-2.5 border-b border-subtle">
              <span className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-brand-light">
                <Sofa className="w-4 h-4 text-brand-primary" />
                <span>الموديل المعروض الآن</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-800 bg-emerald-100 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold">
                <Clock className="w-3 h-3 text-emerald-700" />
                <span>تسليم خلال 48 ساعة</span>
              </span>
            </div>

            {/* Live Slide Card Details */}
            <div className="p-3 sm:p-4 bg-section-light/80 rounded-xl border border-subtle space-y-3 transition-all duration-500">
              <div className="relative w-full h-36 sm:h-44 md:h-48 rounded-lg overflow-hidden border border-subtle">
                <Image
                  src={SLIDES[currentSlide].image}
                  alt={SLIDES[currentSlide].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-brand-light truncate">
                    {SLIDES[currentSlide].title}
                  </h3>
                  <p className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-brand-light truncate mt-0.5">
                    <Store className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>المحل: {SLIDES[currentSlide].store}</span>
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-bold text-brand-primary text-sm sm:text-base">
                    {SLIDES[currentSlide].price}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}