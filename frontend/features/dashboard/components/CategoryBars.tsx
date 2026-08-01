const CATEGORY_LABELS: Record<string, string> = {
  SOFAS: "كنب",
  TABLES: "طاولات",
  BEDROOMS: "غرف نوم",
  DECOR: "ديكور",
  OTHER: "أخرى",
};

const CATEGORY_ORDER = ["SOFAS", "TABLES", "BEDROOMS", "DECOR", "OTHER"];

interface CategoryBarsProps {
  categoryCounts: Record<string, number>;
}

export default function CategoryBars({ categoryCounts }: CategoryBarsProps) {
  const max = Math.max(1, ...Object.values(categoryCounts));
  const categories = CATEGORY_ORDER.filter((c) => (categoryCounts[c] ?? 0) > 0);

  if (categories.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">
        لا توجد منتجات مضافة بعد
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const count = categoryCounts[category] ?? 0;
        const widthPct = Math.round((count / max) * 100);

        return (
          <div key={category} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-gray-600 truncate">
              {CATEGORY_LABELS[category] ?? category}
            </span>
            <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary-accent transition-all duration-500"
                style={{ width: `${Math.max(widthPct, 4)}%` }}
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
