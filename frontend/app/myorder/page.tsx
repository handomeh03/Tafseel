"use client";

import { useState, FormEvent } from "react";
import {
  PackageSearch,
  Search,
  Loader2,
  Package,
  MapPin,
  User,
  Calendar,
  Store,
  Clock,
  CheckCircle2,
  PackageCheck,
  Truck,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/features/landing/components/Navbar";
import { useGetOrderByNumber } from "@/features/order/hooks/useGetOrderByNumber";
import { OrderStatus } from "@/features/order/types/order-status";

const TIMELINE_STEPS: { status: OrderStatus; label: string; icon: typeof Clock }[] = [
  { status: "PENDING", label: "قيد الانتظار", icon: Clock },
  { status: "CONFIRMED", label: "تم التأكيد", icon: CheckCircle2 },
  { status: "PREPARING", label: "قيد التجهيز", icon: Package },
  { status: "SHIPPED", label: "تم الشحن", icon: Truck },
  { status: "DELIVERED", label: "تم التسليم", icon: PackageCheck },
];

export default function MyOrderPage() {
  const [orderNumberInput, setOrderNumberInput] = useState("");
  const [searchedOnce, setSearchedOnce] = useState(false);

  const { order, isLoading, isError, error, refetch } =
    useGetOrderByNumber(orderNumberInput);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderNumberInput.trim()) return;
    setSearchedOnce(true);
    refetch();
  };

  const currentStepIndex = order
    ? TIMELINE_STEPS.findIndex((step) => step.status === order.status)
    : -1;
  const isCancelled = order?.status === "CANCELLED";

  return (
    <div className="min-h-screen bg-main flex flex-col" dir="rtl">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary-accent/10 text-primary-accent flex items-center justify-center mx-auto">
            <PackageSearch className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            تتبع طلبك
          </h1>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            أدخل رقم الطلب الذي استلمته عند تأكيد الشراء لمعرفة حالة طلبك الحالية.
          </p>
        </div>

        {/* Search box */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-subtle shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={orderNumberInput}
              onChange={(e) => setOrderNumberInput(e.target.value)}
              placeholder="مثال: TAF-12345"
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-subtle bg-section-light/50 text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-right dir-ltr"
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !orderNumberInput.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-accent text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>البحث عن الطلب</span>
          </button>
        </form>

        {/* Results */}
        <div className="mt-8">
          {isError && searchedOnce && (
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-10 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-red-500 font-bold text-sm">
                {error instanceof Error ? error.message : "لم يتم العثور على الطلب"}
              </p>
              <p className="text-xs text-gray-400">
                تأكد من رقم الطلب وحاول مجدداً.
              </p>
            </div>
          )}

          {!isError && !order && searchedOnce && !isLoading && (
            <div className="bg-white rounded-2xl border border-subtle shadow-sm p-10 text-center space-y-2">
              <Package className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-sm text-gray-400">لم يتم العثور على أي طلب بهذا الرقم</p>
            </div>
          )}

          {order && (
            <div className="space-y-6">
              {/* Order summary card */}
              <div className="bg-white rounded-2xl border border-subtle shadow-sm p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-subtle">
                  <div>
                    <p className="text-xs text-brand-muted font-medium">رقم الطلب</p>
                    <p className="font-black text-lg text-brand-dark dir-ltr text-right">
                      {order.orderNumber}
                    </p>
                  </div>
                  {isCancelled && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3.5 h-3.5" />
                      تم إلغاء الطلب
                    </span>
                  )}
                </div>

                {/* Timeline */}
                {!isCancelled && (
                  <div className="flex items-start justify-between relative px-1">
                    <div className="absolute top-4 right-4 left-4 h-0.5 bg-gray-100 -z-0" />
                    <div
                      className="absolute top-4 right-4 h-0.5 bg-primary-accent transition-all duration-500 -z-0"
                      style={{
                        width:
                          currentStepIndex <= 0
                            ? "0%"
                            : `calc(${(currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100}% - ${(currentStepIndex / (TIMELINE_STEPS.length - 1)) * 32}px)`,
                      }}
                    />
                    {TIMELINE_STEPS.map((step, index) => {
                      const Icon = step.icon;
                      const isDone = index <= currentStepIndex;
                      return (
                        <div
                          key={step.status}
                          className="relative z-10 flex flex-col items-center gap-2 flex-1"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                              isDone
                                ? "bg-primary-accent border-primary-accent text-white"
                                : "bg-white border-gray-200 text-gray-300"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs font-semibold text-center ${
                              isDone ? "text-brand-dark" : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Product */}
                <div className="flex items-center gap-4 pt-4 border-t border-subtle">
                  {order.product.images?.[0] ? (
                    <img
                      src={order.product.images[0]}
                      alt={order.product.title}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300">
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-brand-dark truncate">
                      {order.product.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted mt-1">
                      <Store className="w-3.5 h-3.5 text-primary-accent" />
                      <span>{order.product.store.storeName}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-brand-muted">الكمية: {order.quantity}</p>
                    <p className="font-black text-brand-dark">
                      {order.totalPrice} <span className="text-xs text-primary-accent">د.أ</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery details card */}
              <div className="bg-white rounded-2xl border border-subtle shadow-sm p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-primary-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-brand-muted">اسم الزبون</p>
                    <p className="text-sm font-semibold text-brand-dark">
                      {order.customerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-brand-muted">عنوان التوصيل</p>
                    <p className="text-sm font-semibold text-brand-dark">
                      {order.city} - {order.shippingAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-primary-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-brand-muted">تاريخ الطلب</p>
                    <p className="text-sm font-semibold text-brand-dark">
                      {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-brand-muted">آخر تحديث</p>
                    <p className="text-sm font-semibold text-brand-dark">
                      {new Date(order.updatedAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
