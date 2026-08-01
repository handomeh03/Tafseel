"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Package,
  Search,
  Eye,
  Loader2,
  Building2,
  Edit,
  MoreVertical,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { useGetOrders } from "@/features/order/hooks/useGetOrders";
import { useEditOrderStatus } from "@/features/order/hooks/useEditOrderStatus";
import OrderDetailsModal from "@/features/order/components/OrderDetailsModal";
import EditOrderStatusModal from "@/features/order/components/EditOrderStatusModal";
import { OrderStatus, STATUS_CONFIG } from "@/features/order/types/order-status";



export interface OrderStore {
  id: number;
  storeName: string;
}

export interface OrderProduct {
  id: number;
  title: string;
  images?: string[];
  price?: number;
  store?: OrderStore;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  city: string;
  shippingAddress: string;
  notes?: string | null;
  quantity: number;
  unitPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  createdAt: string;
  product?: OrderProduct;
}



function ActionsDropdownPortal({
  buttonRef,
  isOpen,
  onClose,
  onPreview,
  onEditStatus,
}: {
  buttonRef: HTMLButtonElement | null;
  isOpen: boolean;
  onClose: () => void;
  onPreview: () => void;
  onEditStatus: () => void;
}) {
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      const menuHeight = 90;
      const showAbove = rect.bottom + menuHeight > window.innerHeight;

      setCoords({
        top: showAbove ? rect.top - menuHeight : rect.bottom + 4,
        left: rect.left,
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        style={{
          position: "fixed",
          top: `${coords.top}px`,
          left: `${coords.left}px`,
        }}
        className="z-50 w-40 bg-white rounded-2xl border border-gray-100 shadow-2xl py-1.5 text-xs animate-in fade-in zoom-in-95 duration-100"
        dir="rtl"
      >
        <button
          onClick={onPreview}
          className="w-full text-right px-3 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
        >
          <Eye className="w-3.5 h-3.5 text-gray-400" />
          <span>تفاصيل الطلب</span>
        </button>

        <button
          onClick={onEditStatus}
          className="w-full text-right px-3 py-2 text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-medium border-t border-gray-100"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>تغيير الحالة</span>
        </button>
      </div>
    </>,
    document.body
  );
}

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToEditStatus, setOrderToEditStatus] = useState<Order | null>(null);

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

 
  const { ordersData, isLoading, isError, error, isFetching } = useGetOrders(
    currentPage,
    pageSize,
    searchTerm
  );

  const { editOrderStatus, isPending: isEditingStatus } = useEditOrderStatus();

  const orders: Order[] = ordersData?.data || [];
  const totalItems: number = ordersData?.totalOrders || 0;
  const totalPages: number = ordersData?.totalPages || 1;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  
  const handleStatusConfirm = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      await editOrderStatus({ orderId, status: newStatus });
      setOrderToEditStatus(null);
    } catch {
     
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="w-7 h-7 text-primary-accent" />
            جميع الطلبات
            {isFetching && (
              <Loader2 className="w-4 h-4 animate-spin text-primary-accent" />
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            متابعة وإدارة طلبات الزبائن وتغيير حالات الشحن عبر كافة المتاجر
          </p>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث برقم الطلب، اسم الزبون، أو الهاتف..."
            value={searchTerm}
            max={50}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-4 pr-9 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent"
          />
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <Table
          headers={["رقم الطلب", "تفاصيل الزبون", "المنتج", "المتجر", "الإجمالي", "حالة الطلب", "التاريخ"]}
          data={orders}
          keyExtractor={(order) => order.id}
          isLoading={isLoading}
          loadingText="جاري تحميل قائمة الطلبات..."
          isError={isError}
          error={error}
          emptyMessage="لا توجد طلبات مطابقة للبحث حالياً"
          renderRow={(order) => {
            const statusConfig =
              STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
            const productImage =
              order.product?.images && order.product.images.length > 0
                ? order.product.images[0]
                : null;

            return (
              <>
                {/* Order Number */}
                <td className="p-4 font-black text-primary-accent whitespace-nowrap">
                  {order.orderNumber}
                </td>

                {/* Customer Info */}
                <td className="p-4 space-y-0.5">
                  <p className="font-bold text-gray-900">
                    {order.customerName}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span dir="ltr">{order.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {order.city} - {order.shippingAddress}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={order.product?.title}
                        className="w-8 h-8 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        <Package className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-800 line-clamp-1">
                        {order.product?.title || "منتج غير معروف"}
                      </p>
                      <span className="text-xs text-gray-400">
                        الكمية: {order.quantity}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-4 text-gray-700 font-medium whitespace-nowrap">
                  {order.product?.store ? (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{order.product.store.storeName}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">غير مرتبط</span>
                  )}
                </td>

                <td className="p-4 font-extrabold text-gray-900 whitespace-nowrap">
                  {order.totalPrice} د.أ
                </td>

                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.className}`}
                  >
                    {statusConfig.label}
                  </span>
                </td>

                {/* Created At */}
                <td className="p-4 text-gray-500 text-xs whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {new Date(order.createdAt).toLocaleDateString(
                      "ar-EG"
                    )}
                  </div>
                </td>
              </>
            );
          }}
        >
          {(order) => (
            <>
              <button
                ref={(el) => {
                  buttonRefs.current[order.id] = el;
                }}
                onClick={() =>
                  setActiveMenuId(
                    activeMenuId === order.id ? null : order.id
                  )
                }
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              <ActionsDropdownPortal
                buttonRef={buttonRefs.current[order.id]}
                isOpen={activeMenuId === order.id}
                onClose={() => setActiveMenuId(null)}
                onPreview={() => {
                  setActiveMenuId(null);
                  setSelectedOrder(order);
                }}
                onEditStatus={() => {
                  setActiveMenuId(null);
                  setOrderToEditStatus(order);
                }}
              />
            </>
          )}
        </Table>

        {!isLoading && !isError && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalItems}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            isLoading={isFetching}
          />
        )}
      </div>

      
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {orderToEditStatus && (
        <EditOrderStatusModal
          isOpen={Boolean(orderToEditStatus)}
          order={orderToEditStatus}
          isLoading={isEditingStatus}
          onClose={() => setOrderToEditStatus(null)}
          onConfirm={handleStatusConfirm}
        />
      )}
    </div>
  );
}