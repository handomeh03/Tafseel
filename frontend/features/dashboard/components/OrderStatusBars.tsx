import {
  Clock,
  CheckCircle2,
  PackageSearch,
  Truck,
  PackageCheck,
  XCircle,
} from "lucide-react";
import { OrderStatus } from "@/features/dashboard/hooks/useOrderStats";

export const STATUS_META: Record<
  OrderStatus,
  { label: string; icon: typeof Clock; bar: string; text: string; badge: string }
> = {
  PENDING: {
    label: "قيد الانتظار",
    icon: Clock,
    bar: "bg-amber-400",
    text: "text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },
  CONFIRMED: {
    label: "مؤكد",
    icon: CheckCircle2,
    bar: "bg-blue-500",
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
  },
  PREPARING: {
    label: "قيد التحضير",
    icon: PackageSearch,
    bar: "bg-violet-500",
    text: "text-violet-600",
    badge: "bg-violet-50 text-violet-700",
  },
  SHIPPED: {
    label: "تم الشحن",
    icon: Truck,
    bar: "bg-cyan-500",
    text: "text-cyan-600",
    badge: "bg-cyan-50 text-cyan-700",
  },
  DELIVERED: {
    label: "تم التسليم",
    icon: PackageCheck,
    bar: "bg-emerald-500",
    text: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
  },
  CANCELLED: {
    label: "ملغي",
    icon: XCircle,
    bar: "bg-red-500",
    text: "text-red-600",
    badge: "bg-red-50 text-red-700",
  },
};

const STATUS_ORDER: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

interface OrderStatusBarsProps {
  statusCounts: Record<OrderStatus, number>;
}

export default function OrderStatusBars({ statusCounts }: OrderStatusBarsProps) {
  const max = Math.max(1, ...Object.values(statusCounts));

  return (
    <div className="space-y-4">
      {STATUS_ORDER.map((status) => {
        const meta = STATUS_META[status];
        const Icon = meta.icon;
        const count = statusCounts[status] ?? 0;
        const widthPct = Math.round((count / max) * 100);

        return (
          <div key={status} className="flex items-center gap-3">
            <div className="w-32 shrink-0 flex items-center gap-2">
              <Icon className={`w-4 h-4 ${meta.text}`} />
              <span className="text-xs font-medium text-gray-600 truncate">
                {meta.label}
              </span>
            </div>
            <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${meta.bar} transition-all duration-500`}
                style={{ width: `${count === 0 ? 0 : Math.max(widthPct, 4)}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-sm font-bold text-gray-900 text-left">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
