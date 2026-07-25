import Link from "next/link";
import { Sofa, PhoneCall, ChevronLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-hero text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Top Section: Brand Info & Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Identity Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-accent text-white flex items-center justify-center font-bold text-xl shadow-sm">
                <Sofa className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                تفصيل <span className="text-brand-primary">Store</span>
              </span>
            </Link>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              معرضك الأول لتصفح وشراء أطقم الكنب والأثاث الجاهز مباشرة من أفضل المحلات والورش المحلية بأعلى جودة وأفضل سعر.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white border-b border-white/10 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#collection" className="hover:text-brand-primary transition-colors inline-flex items-center gap-1 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-brand-primary transition-transform group-hover:-translate-x-1" />
                  <span>التشكيلة الجاهزة</span>
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-brand-primary transition-colors inline-flex items-center gap-1 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-brand-primary transition-transform group-hover:-translate-x-1" />
                  <span>عن المعرض</span>
                </Link>
              </li>
              <li>
                <Link href="#styles" className="hover:text-brand-primary transition-colors inline-flex items-center gap-1 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-brand-primary transition-transform group-hover:-translate-x-1" />
                  <span>أنماط الديكور</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white border-b border-white/10 pb-2">
              أقسام الكنب
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>• كنب مودرن زاوية (L-Shape)</li>
              <li>• أطقم كنب أمريكي</li>
              <li>• كنب كلاسيك ومخمل</li>
              <li>• أطقم شقق ومساحات صغيرة</li>
            </ul>
          </div>

          {/* Support / Contact Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white border-b border-white/10 pb-2">
              خدمة العملاء
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              حبيت تفاصيل طقم معين أو عندك استفسار قبل الطلب؟ فريقنا بساعدك مباشرة.
            </p>
            <div className="pt-1">
              <Link
                href="#collection"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-accent text-white text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تواصل معنا للطلب</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} - تفصيل Store.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-200 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}