"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X, Check, RefreshCw } from "lucide-react";
import { Order } from "@/app/(superAdmin)/admin/orders/page";
import { OrderStatus } from "../types/order-status";
import { Button } from "@/components/Button";

const STATUS_OPTIONS: {
  value: OrderStatus;
  label: string;
  description: string;
  className: string;
}[] = [
  {
    value: "PENDING",
    label: "قيد الانتظار",
    description: "الطلب جديد وبانتظار المراجعة أو التأكيد",
    className: "border-amber-200 bg-amber-50/50 text-amber-900 peer-checked:border-amber-500 peer-checked:bg-amber-100/60",
  },
  {
    value: "CONFIRMED",
    label: "تم التأكيد",
    description: "تم تأكيد الطلب من الزبون وجاهز للتنفيذ",
    className: "border-blue-200 bg-blue-50/50 text-blue-900 peer-checked:border-blue-500 peer-checked:bg-blue-100/60",
  },
  {
    value: "PREPARING",
    label: "قيد التجهيز",
    description: "الطلب حالياً قيد التصنيع والتغليف داخل الورشة/المتجر",
    className: "border-indigo-200 bg-indigo-50/50 text-indigo-900 peer-checked:border-indigo-500 peer-checked:bg-indigo-100/60",
  },
  {
    value: "SHIPPED",
    label: "تم الشحن",
    description: "تم تسليم الطلب لكابتن التوصيل وهو في الطريق",
    className: "border-purple-200 bg-purple-50/50 text-purple-900 peer-checked:border-purple-500 peer-checked:bg-purple-100/60",
  },
  {
    value: "DELIVERED",
    label: "تم التسليم",
    description: "تم استلام الطلب بنجاح وتحصيل المبلغ من الزبون",
    className: "border-emerald-200 bg-emerald-50/50 text-emerald-900 peer-checked:border-emerald-500 peer-checked:bg-emerald-100/60",
  },
  {
    value: "CANCELLED",
    label: "ملغي",
    description: "تم إلغاء الطلب ولن يتم استكماله",
    className: "border-rose-200 bg-rose-50/50 text-rose-900 peer-checked:border-rose-500 peer-checked:bg-rose-100/60",
  },
];

interface EditOrderStatusModalProps {
  order: Order | null;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: (orderId: number, newStatus: OrderStatus) => void;
}

export default function EditOrderStatusModal({
  order,
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}: EditOrderStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("PENDING");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [order]);

  if (!isOpen || !order || !mounted) return null;

  const handleSave = () => {
    if (selectedStatus === order.status) {
      onClose();
      return;
    }
    onConfirm(order.id, selectedStatus);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary-accent/10 text-primary-accent">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900">
                تعديل حالة الطلب #{order.orderNumber}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                اختر الحالة الجديدة لتحديثها فورياً على النظام
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {STATUS_OPTIONS.map((option) => {
            const isCurrent = order.status === option.value;
            const isSelected = selectedStatus === option.value;

            return (
              <label
                key={option.value}
                className={`relative flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${option.className}`}
              >
                <input
                  type="radio"
                  name="orderStatus"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => setSelectedStatus(option.value)}
                  className="peer sr-only"
                />

                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-primary-accent bg-primary-accent text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">
                      {option.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-extrabold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        الحالية
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {option.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs shadow-none"
          >
            إلغاء
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            isLoading={isLoading}
            disabled={selectedStatus === order.status}
            className="px-5 py-2.5 text-xs"
          >
            حفظ التغييرات
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}