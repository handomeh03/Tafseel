"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import {
  X,
  Package,
  User,
  Phone,
  MapPin,
  Building2,
  Calendar,
  FileText,
  Truck,
  Hash,
} from "lucide-react";
import { Order } from "@/app/(superAdmin)/admin/orders/page";
import { STATUS_CONFIG } from "../types/order-status";




interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (order) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [order]);

  if (!order || !mounted) return null;

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const productImage =
    order.product?.images && order.product.images.length > 0
      ? order.product.images[0]
      : null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
      
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary-accent/10 text-primary-accent">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-gray-900">
                  طلب {order.orderNumber}
                </h2>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.className}`}
                >
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString("ar-EG")} -{" "}
                {new Date(order.createdAt).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              بيانات العميل والتوصيل
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">اسم الزبون</span>
                  <span className="font-bold text-gray-900">{order.customerName}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">رقم الهاتف</span>
                  <span className="font-bold text-gray-900 dir-ltr inline-block">
                    {order.customerPhone}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-gray-700 sm:col-span-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-gray-400 block">العنوان</span>
                  <span className="font-medium text-gray-800">
                    {order.city} - {order.shippingAddress}
                  </span>
                </div>
              </div>

              {order.notes && (
                <div className="flex items-start gap-2 text-gray-700 sm:col-span-2 border-t border-slate-200/60 pt-2.5 mt-1">
                  <FileText className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 block">ملاحظات الزبون</span>
                    <span className="text-xs font-medium text-amber-900 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60 inline-block mt-0.5">
                      {order.notes}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              تفاصيل المنتج والمتجر
            </h3>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              {productImage ? (
                <img
                  src={productImage}
                  alt={order.product?.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                  <Package className="w-8 h-8" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">
                  {order.product?.title || "منتج غير معروف"}
                </h4>

                {order.product?.store && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>المتجر: <strong className="text-gray-700">{order.product.store.storeName}</strong></span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3 text-gray-400" />
                    الكمية: <strong className="text-gray-900">{order.quantity}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    سعر القطعة: <strong className="text-gray-900">{order.unitPrice} د.أ</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>مجموع العناصر ({order.quantity}):</span>
              <span className="font-bold text-gray-800">
                {order.unitPrice * order.quantity} د.أ
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-gray-400" />
                أجرة التوصيل:
              </span>
              <span className="font-bold text-gray-800">
                {order.deliveryPrice} د.أ
              </span>
            </div>

            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center text-base">
              <span className="font-black text-gray-900">المجموع الكلي:</span>
              <span className="font-black text-primary-accent text-lg">
                {order.totalPrice} د.أ
              </span>
            </div>
          </div>
        </div>

        
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-100 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}