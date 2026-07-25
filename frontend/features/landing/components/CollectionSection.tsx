import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

const categories = [
  {
    id: "sofas",
    title: "أطقم الكنب والزوايا",
    subtitle: "تصاميم مودرن وكلاسيك جاهزة للتسليم الفوري بجميع الألوان",
    count: "+32 طقم متاح",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    href: "/catalog/sofas",
  },
  {
    id: "armchairs",
    title: "الكراسي والمفردات",
    subtitle: "كراسي استرخاء وأسرة ديكورية مصنوعة يدويًا بدقة عالية",
    count: "+18 قطعة",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    href: "/catalog/armchairs",
  },
  {
    id: "chairs",
    title: "كراسي السفرة والطاولات",
    subtitle: "خشب متين مع إسفنج عالي الكثافة وقماش مقاوم للبقع",
    count: "+24 تصميم",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    href: "/catalog/chairs",
  },
];

export default function CollectionSection() {
  return (
    <section id="catalog" className="relative py-16 md:py-24 bg-main text-brand-dark overflow-hidden">
      
      {/* Background Accent Subtle Pattern */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#C87A3E_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6 border-b border-subtle pb-6 text-right">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-section-light text-brand-primary border border-subtle text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>كتالوج التشكيلة الجاهزة</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight">
              استكشف مجموعات <span className="text-brand-primary">تفصيل Store</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted max-w-sm font-normal leading-relaxed">
            تم تصنيعها بأيدي أفضل الحرفيين والورش المحلية باستخدام إسفنج عالي الكثافة وأقمشة فاخرة جاهزة للمعاينة والتوصيل.
          </p>
        </div>

        {/* Grid of Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col justify-between h-[380px] sm:h-[440px] md:h-[480px] rounded-3xl overflow-hidden p-6 sm:p-8 border border-white/20 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Image with Dynamic Scaling */}
              <div className="absolute inset-0 z-0 bg-neutral-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-300 group-hover:opacity-85" />
              </div>

              {/* Top Bar inside Card */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3.5 py-1 rounded-full tracking-wide shadow-sm">
                  {item.count}
                </span>

                {/* Action Arrow Icon */}
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-primary-accent group-hover:border-primary-accent group-hover:scale-110 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 text-right space-y-1.5">
                <h3 className="font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}