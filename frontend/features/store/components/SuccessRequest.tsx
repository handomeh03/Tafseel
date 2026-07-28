import { Button } from "@/components/Button";
import { CheckCircle2, RotateCcw } from "lucide-react";

interface SuccessRequestProps {
  handleChange: () => void;
}

export default function SuccessRequest({ handleChange }: SuccessRequestProps) {
  return (
    <div className="py-8 text-center space-y-4">
      {/* Icon Circle */}
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      {/* Message */}
      <h3 className="text-xl font-bold text-brand-dark">
        تم إرسال طلبك بنجاح
      </h3>
      <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-sm mx-auto">
        شكراً لاختيارك منصتنا. سيقوم فريقنا بمراجعة تفاصيل متجرك والتواصل معك عبر رقم الموبايل أو البريد لتفعيل المتجر فوراً
      </p>

      {/* Action Button */}
      <Button
        type="button"
        className="mt-4 bg-section-light border border-subtle text-brand-dark hover:bg-subtle/50 shadow-none"
        onClick={handleChange}
        icon={<RotateCcw className="w-4 h-4" />}
      >
        تقديم طلب متجر آخر
      </Button>
    </div>
  );
}