import { LucideIcon } from "lucide-react";

type Accent = "primary" | "blue" | "green" | "violet" | "amber" | "red";

const accentClasses: Record<Accent, { chip: string; icon: string }> = {
  primary: { chip: "bg-orange-50", icon: "text-primary-accent" },
  blue: { chip: "bg-blue-50", icon: "text-blue-600" },
  green: { chip: "bg-emerald-50", icon: "text-emerald-600" },
  violet: { chip: "bg-violet-50", icon: "text-violet-600" },
  amber: { chip: "bg-amber-50", icon: "text-amber-600" },
  red: { chip: "bg-red-50", icon: "text-red-600" },
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subLabel?: string;
  accent?: Accent;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  subLabel,
  accent = "primary",
}: StatCardProps) {
  const { chip, icon } = accentClasses[accent];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-gray-500 font-medium truncate">{label}</p>
        <p className="text-2xl font-black text-gray-900 mt-1.5 tracking-tight">
          {value}
        </p>
        {subLabel && (
          <p className="text-xs text-gray-400 mt-1 truncate">{subLabel}</p>
        )}
      </div>
      <div
        className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${chip}`}
      >
        <Icon className={`w-5 h-5 ${icon}`} />
      </div>
    </div>
  );
}
