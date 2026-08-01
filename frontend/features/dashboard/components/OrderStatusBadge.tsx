import { STATUS_META } from "@/features/dashboard/components/OrderStatusBars";
import { OrderStatus } from "@/features/dashboard/hooks/useOrderStats";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status];

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 ${meta.badge}`}
    >
      <meta.icon className="w-3.5 h-3.5" />
      {meta.label}
    </span>
  );
}
