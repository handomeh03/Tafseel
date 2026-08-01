export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-gray-100 rounded-full" />
        <div className="flex items-center justify-between gap-2">
          <div className="h-3.5 w-2/3 bg-gray-100 rounded-full" />
          <div className="h-3.5 w-10 bg-gray-100 rounded-full" />
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-8 bg-gray-100 rounded-xl" />
          <div className="h-8 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
