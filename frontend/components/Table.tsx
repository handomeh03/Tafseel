"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface TableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  children?: (item: T, index: number) => ReactNode;
  actionsHeader?: string;
  isLoading?: boolean;
  loadingText?: string;
  isError?: boolean;
  error?: unknown;
  emptyMessage?: string;
}

export default function Table<T>({
  headers,
  data,
  renderRow,
  keyExtractor,
  children,
  actionsHeader = "الإجراءات",
  isLoading = false,
  loadingText = "جاري تحميل البيانات...",
  isError = false,
  error,
  emptyMessage = "لا توجد بيانات لعرضها",
}: TableProps<T>) {
  const hasActions = Boolean(children);
  const colSpan = headers.length + (hasActions ? 1 : 0);

  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
        <p className="text-sm">{loadingText}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center text-red-500 text-sm font-medium">
        {error instanceof Error ? error.message : "حدث خطأ أثناء جلب البيانات"}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-4">
                {header}
              </th>
            ))}
            {hasActions && <th className="p-4 text-center">{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={keyExtractor(item, index)} className="hover:bg-gray-50/60 transition-colors">
                {renderRow(item, index)}
                {hasActions && (
                  <td className="p-4 text-center">{children!(item, index)}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colSpan} className="p-8 text-center text-gray-400 text-sm">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
