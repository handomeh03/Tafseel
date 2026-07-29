import Link from "next/link";
import { Store, Zap, Palette, ArrowLeft, Sparkles, Sofa } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-main text-brand-dark relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#C87A3E_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-section-light text-brand-primary border border-subtle text-xs font-bold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تجربة تسوق مختلفة</span>
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
            ليه تشتري أثاث بيتك من <span className="text-brand-primary">معرضنا مباشرة؟</span>
          </h2>

          <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-normal">
            جمعنالك أفضل محلات ومعارض التنجيد بمكان واحد. بدل ضياع الوقت باللف على الورش، تصفح الموديلات الجاهزة واطلب طقمك المفضل بضغطة زر.
          </p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group bg-card-custom p-8 rounded-3xl border border-subtle shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-section-light text-brand-primary flex items-center justify-center border border-subtle/80 group-hover:bg-primary-accent group-hover:text-white transition-colors duration-300 shadow-2xs">
                <Store className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-brand-dark">من المحل لبيتك مباشرة</h3>
              
              <p className="text-brand-muted text-sm leading-relaxed">
                بدون وسطاء أو تكاليف معارض إضافية. بتطلب طقم الكنب مباشرة من المحل أو المنجد المُصنّع مع ضمان جودة القماش والإنهاء.
              </p>
            </div>

            <div className="pt-6 border-t border-subtle/60 flex items-center justify-between text-xs font-semibold text-brand-primary">
              <span>أسعار ورش حقيقية</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-card-custom p-8 rounded-3xl border border-subtle shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-section-light text-brand-primary flex items-center justify-center border border-subtle/80 group-hover:bg-primary-accent group-hover:text-white transition-colors duration-300 shadow-2xs">
                <Zap className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-brand-dark">جاهز للتسليم الفوري</h3>
              
              <p className="text-brand-muted text-sm leading-relaxed">
                تعبت من الانتظار بالأسابيع؟ كل الموديلات المعروضة جاهزة بالورش والمعارض للتوصيل الفوري والمعاينة السريعة.
              </p>
            </div>

            <div className="pt-6 border-t border-subtle/60 flex items-center justify-between text-xs font-semibold text-brand-primary">
              <span>توصيل خلال أيام</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-card-custom p-8 rounded-3xl border border-subtle shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-section-light text-brand-primary flex items-center justify-center border border-subtle/80 group-hover:bg-primary-accent group-hover:text-white transition-colors duration-300 shadow-2xs">
                <Palette className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-brand-dark">تنوع بالأجواء والألوان</h3>
              
              <p className="text-brand-muted text-sm leading-relaxed">
                تصفح تشكيلة واسعة من الكنب الزاوية L، الأمريكي، والمودرن بألوان وأقمشة متعددة تليق بديكور بيتك تماماً.
              </p>
            </div>

            <div className="pt-6 border-t border-subtle/60 flex items-center justify-between text-xs font-semibold text-brand-primary">
              <span>كتالوج متجدد يومياً</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
          </div>

        </div>

        
        <div className="relative rounded-3xl bg-hero text-white p-8 sm:p-12 border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-right max-w-xl">
              <h4 className="font-extrabold text-2xl sm:text-3xl text-white">
                لقيت طقم الكنب اللي ببالك؟
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                تصفح الموديلات الجاهزة الآن واطلب معاينتك أو استلم أثاثك الجديد فوراً!
              </p>
            </div>

            <Link
               href="/product"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-accent text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-brand-primary/25 shrink-0"
            >
              <span>تصفح التشكيلة الكاملة</span>
              <Sofa className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}