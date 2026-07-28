"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalCount === 0) return null;


  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="bg-gray-50/70 border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <p className="text-xs text-gray-500">
        عرض <span className="font-bold text-gray-900">{startIndex}</span> إلى{" "}
        <span className="font-bold text-gray-900">{endIndex}</span> من أصل{" "}
        <span className="font-bold text-gray-900">{totalCount}</span> عنصر
      </p>

      
      <div className="flex items-center gap-1.5">
        
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1 || isLoading}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
              currentPage === page
                ? "bg-primary-accent text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || isLoading}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}