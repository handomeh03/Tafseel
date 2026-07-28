import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Store } from "lucide-react";
import { getPublicProducts } from "../api/getPublicProducts";

interface ProductStore {
  id: string;
  storeName: string;
  logo?: string;
  city?: string;
}

interface Product {
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



export default async function CollectionSection() {
  const products = await getPublicProducts();

  return (
    <section id="catalog" className="relative py-16 md:py-24 bg-main text-brand-dark overflow-hidden" dir="rtl">
      
      
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
              استكشف أحدث منتجات <span className="text-brand-primary">تفصيل Store</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted max-w-sm font-normal leading-relaxed">
            تم تصنيعها بأيدي أفضل الحرفيين والورش المحلية باستخدام إسفنج عالي الكثافة وأقمشة فاخرة جاهزة للمعاينة والتوصيل.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.slice(0, 3).map((product:Product) => {
              const productImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : product.image ||
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80";

              return (
                <Link
                  key={product.id}
                  href={`/catalog/${product.id}`}
                  className="group relative flex flex-col justify-between h-[380px] sm:h-[420px] rounded-3xl overflow-hidden p-6 border border-white/20 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 bg-neutral-900">
                    <Image
                      src={productImage}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-300 group-hover:opacity-85" />
                  </div>

                  {/* Top Bar inside Card */}
                  <div className="relative z-10 flex items-center justify-between">
                    {product.store?.storeName ? (
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Store className="w-3 h-3 text-brand-primary" />
                        <span>{product.store.storeName}</span>
                      </span>
                    ) : (
                      <span className="bg-emerald-500/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                        متوفر الآن
                      </span>
                    )}

                    {/* Action Arrow Icon */}
                    <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-primary-accent group-hover:border-primary-accent group-hover:scale-110 transition-all duration-300">
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 text-right space-y-1.5">
                    <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-brand-primary transition-colors duration-300 line-clamp-1">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-xs text-gray-200 font-light leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    {product.price && (
                      <p className="text-sm font-black text-brand-primary pt-1">
                        {product.price} د.أ
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-brand-muted text-sm">
              لا توجد منتجات مجهزة للعرض حالياً
            </div>
          )}
        </div>

      </div>
    </section>
  );
}