"use client";

import {
  LayoutDashboard,
  Loader2,
  Package,
  ShoppingCart,
  Wallet,
  PackageCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/store/Context/UserContext";
import { useOrderStats } from "@/features/dashboard/hooks/useOrderStats";
import { useProductStats } from "@/features/dashboard/hooks/useProductStats";
import Table from "@/components/Table";
import StatCard from "@/features/dashboard/components/StatCard";
import OrderStatusBars from "@/features/dashboard/components/OrderStatusBars";
import OrderStatusBadge from "@/features/dashboard/components/OrderStatusBadge";
import CategoryBars from "@/features/dashboard/components/CategoryBars";

export default function StoreOwnerDashboardPage() {
  const { user } = useAuth();
  const { orderStats, isLoading: isOrdersLoading, isFetching } = useOrderStats();
  const { productStats, isLoading: isProductsLoading } = useProductStats();

  const isLoading = isOrdersLoading || isProductsLoading;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-primary-accent" />
          الرئيسية والإحصائيات
          {isFetching && <Loader2 className="w-4 h-4 animate-spin text-primary-accent" />}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          أهلاً {user?.name || "بك"}، إليك نظرة عامة على أداء متجرك
        </p>
      </div>

      {isLoading ? (
        <div className="p-16 bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
          <p className="text-sm">جاري تحميل الإحصائيات...</p>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Package}
              label="منتجات المتجر"
              value={productStats?.totalProducts ?? 0}
              subLabel={`${productStats?.availableProducts ?? 0} متاح للطلب`}
              accent="primary"
            />
            <StatCard
              icon={PackageCheck}
              label="منتجات غير متاحة"
              value={productStats?.unavailableProducts ?? 0}
              accent="amber"
            />
            <StatCard
              icon={ShoppingCart}
              label="إجمالي الطلبات الواردة"
              value={orderStats?.totalOrders ?? 0}
              accent="blue"
            />
            <StatCard
              icon={Wallet}
              label="إيرادات الطلبات المسلّمة"
              value={`${(orderStats?.totalRevenue ?? 0).toLocaleString("en-US")} د.أ`}
              accent="green"
            />
          </div>

          {/* Order status + Category breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">حالة الطلبات</h2>
              {orderStats && (
                <OrderStatusBars statusCounts={orderStats.statusCounts} />
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">
                المنتجات حسب الفئة
              </h2>
              {productStats && (
                <CategoryBars categoryCounts={productStats.categoryCounts} />
              )}
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 pb-0 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">أحدث الطلبات الواردة</h2>
              <Link
                href="/storeowner/order"
                className="text-xs font-medium text-primary-accent flex items-center gap-1 hover:underline"
              >
                عرض الكل
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="mt-3">
              <Table
                headers={["رقم الطلب", "العميل", "المنتج", "المبلغ", "الحالة"]}
                data={orderStats?.recentOrders ?? []}
                keyExtractor={(order) => order.id}
                emptyMessage="لا توجد طلبات بعد"
                renderRow={(order) => (
                  <>
                    <td className="p-3 px-5 font-bold text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="p-3 text-gray-700">{order.customerName}</td>
                    <td className="p-3 text-gray-600 truncate max-w-40">
                      {order.product.title}
                    </td>
                    <td className="p-3 text-gray-900 font-medium">
                      {order.totalPrice} د.أ
                    </td>
                    <td className="p-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </>
                )}
              />
            </div>
            <div className="h-5" />
          </div>
        </>
      )}
    </div>
  );
}
