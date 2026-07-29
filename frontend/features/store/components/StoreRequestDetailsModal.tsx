"use client";

import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  X,
  
} from "lucide-react";
import { useUpdateStoreRequestStatus } from "../hooks/useUpdateStoreRequestStatus";
import { Button } from "@/components/Button";


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

interface StoreRequestDetailsModalProps {
  request: StoreRequest | null;
  onClose: () => void;
}

export default function StoreRequestDetailsModal({
  request,
  onClose,
}: StoreRequestDetailsModalProps) {
  const { updateStatus, isPending } = useUpdateStoreRequestStatus();

  if (!request) return null;

  const handleApprove = async () => {
    try {
      await updateStatus({
        requestId: request.id,
        status: "APPROVED",
      });
      onClose();
    } catch {
      // Error handling
    }
  };

  const handleReject = async () => {
    try {
      await updateStatus({
        requestId: request.id,
        status: "REJECTED",
      });
      onClose();
    } catch {
      // Error handling
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 relative border border-gray-100 shadow-2xl overflow-hidden"
        dir="rtl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-accent" />
            تفاصيل طلب المتجر
          </h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-gray-400 p-1.5 rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-500">حالة الطلب الحالية:</span>
            <StatusBadge status={request.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 font-medium">اسم المتجر</p>
              <p className="font-bold text-gray-900 mt-1">{request.storeName}</p>
            </div>
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 font-medium">اسم المالك</p>
              <p className="font-bold text-gray-900 mt-1">{request.ownerName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" /> البريد الإلكتروني
              </p>
              <p className="font-medium text-gray-800 mt-0.5 truncate">{request.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" /> رقم الهاتف
              </p>
              <p className="font-medium text-gray-800 mt-0.5 dir-ltr text-right">{request.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> المدينة
              </p>
              <p className="font-medium text-gray-800 mt-0.5">{request.city || "غير محدد"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" /> تاريخ التقديم
              </p>
              <p className="font-medium text-gray-800 mt-0.5">
                {new Date(request.createdAt).toLocaleDateString("ar-EG")}
              </p>
            </div>
          </div>

          {request.notes && (
            <div>
              <p className="text-xs text-gray-400 font-medium">ملاحظات الطلب</p>
              <p className="bg-gray-50 p-3 rounded-2xl text-xs text-gray-600 mt-1 border border-gray-100 leading-relaxed">
                {request.notes}
              </p>
            </div>
          )}
        </div>

        {request.status === "PENDING" && (
          <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-gray-100">
            <Button
              onClick={handleApprove}
              isLoading={isPending}
              icon={<CheckCircle2 className="w-4 h-4" />}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs shadow-emerald-600/20"
            >
              قبول الطلب وإنشاء المتجر
            </Button>

            <Button
              onClick={handleReject}
              isLoading={isPending}
              icon={<XCircle className="w-4 h-4 text-red-600" />}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/50 py-2.5 text-xs shadow-none"
            >
              رفض الطلب
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: StoreRequest["status"] }) {
  if (status === "APPROVED") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" /> مقبول
      </span>
    );
  }
  if (status === "REJECTED") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
        <XCircle className="w-3.5 h-3.5" /> مرفوض
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      <Clock className="w-3.5 h-3.5" /> قيد الانتظار
    </span>
  );
}