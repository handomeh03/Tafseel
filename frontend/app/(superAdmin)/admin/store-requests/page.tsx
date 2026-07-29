"use client";

import { useState } from "react";
import {
  ClipboardList,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Eye,
  Loader2
} from "lucide-react";
import { UseGetStoreRequests } from "@/features/store/hooks/useGetAllStoreRequest";
import Pagination from "@/components/Pagenation";
import StoreRequestDetailsModal from "@/features/store/components/StoreRequestDetailsModal";


interface StoreRequest {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  city?: string;
  notes?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export default function StoreRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const [selectedRequest, setSelectedRequest] = useState<StoreRequest | null>(null);


  const { storeRequests, isLoading, isError, error, isFetching } = UseGetStoreRequests(
    currentPage,
    pageSize,
    searchTerm,
    statusFilter
  );

  const requests: StoreRequest[] = storeRequests?.data || [];
  const totalItems: number = storeRequests?.totalCount || 0;
  const totalPages: number = storeRequests?.totalPages || 1;
  const hasNextPage: boolean = storeRequests?.hasNextPage || false;
  const hasPreviousPage: boolean = storeRequests?.hasPreviousPage || false;


  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return (
    <div className="space-y-6">


      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-primary-accent" />
            طلبات إنشاء المتاجر
            {isFetching && <Loader2 className="w-4 h-4 animate-spin text-primary-accent" />}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            مراجعة وتقييم طلبات التنجيد والمتاجر المرفوعة للانضمام لـ منصة تفصيل.
          </p>
        </div>
      </div>


      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث باسم المتجر، المالك، أو الهاتف..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-4 pr-9 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: "الكل", value: "ALL" },
            { label: "قيد الانتظار", value: "PENDING" },
            { label: "مقبولة", value: "APPROVED" },
            { label: "مرفوضة", value: "REJECTED" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleStatusFilterChange(tab.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${statusFilter === tab.value
                  ? "bg-primary-accent text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm relative">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
            <p className="text-sm">جاري تحميل طلبات المتاجر...</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center text-red-500 text-sm font-medium">
            {error instanceof Error ? error.message : "حدث خطأ أثناء جلب البيانات"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs">
                <tr>
                  <th className="p-4">اسم المتجر</th>
                  <th className="p-4">اسم المالك</th>
                  <th className="p-4">رقم الهاتف</th>
                  <th className="p-4">المدينة</th>
                  <th className="p-4">تاريخ الطلب</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {req.storeName}
                      </td>
                      <td className="p-4 text-gray-700">{req.ownerName}</td>
                      <td className="p-4 text-gray-600 dir-ltr text-right">{req.phone}</td>
                      <td className="p-4 text-gray-600">{req.city || "غير محدد"}</td>
                      <td className="p-4 text-gray-500 text-xs">
                        {new Date(req.createdAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="p-2 text-gray-500 hover:text-primary-accent hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          <span>التفاصيل</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 text-sm">
                      لا توجد طلبات متاجر مطابقة للبحث حالياً.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}


        {!isLoading && !isError && totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalItems}
            pageSize={pageSize}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            isLoading={isFetching}
          />

        )}
      </div>

      {/* Modal Preview Details */}
      {selectedRequest && (
        <StoreRequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

    </div>
  );
}

function StatusBadge({ status }: { status: StoreRequest["status"] }) {
  if (status === "APPROVED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" /> مقبول
      </span>
    );
  }
  if (status === "REJECTED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
        <XCircle className="w-3.5 h-3.5" /> مرفوض
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      <Clock className="w-3.5 h-3.5" /> قيد الانتظار
    </span>
  );
}