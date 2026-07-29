export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface StatusConfigItem {
  label: string;
  className: string;
}

export const STATUS_CONFIG: Record<OrderStatus, StatusConfigItem> = {
  PENDING: {
    label: "قيد الانتظار",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  CONFIRMED: {
    label: "تم التأكيد",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  PREPARING: {
    label: "قيد التجهيز",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  SHIPPED: {
    label: "تم الشحن",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  DELIVERED: {
    label: "تم التسليم",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  CANCELLED: {
    label: "ملغي",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
};