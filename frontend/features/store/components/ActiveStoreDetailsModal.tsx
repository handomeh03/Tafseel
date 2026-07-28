"use client";

import { 
  Store, 
  Building2, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  X 
} from "lucide-react";

export interface ActiveStoreOwner {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
}

export interface ActiveStore {
  id: string;
  storeName: string;
  description?: string;
  city?: string;
  logo?: string;
  createdAt: string;
  owner: ActiveStoreOwner;
}

interface ActiveStoreDetailsModalProps {
  selectedStore: ActiveStore | null;
  onClose: () => void;
}

export default function ActiveStoreDetailsModal({
  selectedStore,
  onClose,
}: ActiveStoreDetailsModalProps) {
  if (!selectedStore) return null;

  const ownerName = selectedStore.owner?.fullName || selectedStore.owner?.name || "غير محدد";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 relative border border-gray-100 shadow-2xl"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-primary-accent" />
            تفاصيل المتجر
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 p-1.5 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 text-sm text-gray-700">
          {/* Logo & Basic Info */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            {selectedStore.logo ? (
              <img
                src={selectedStore.logo}
                alt={selectedStore.storeName}
                className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400">
                <Building2 className="w-7 h-7" />
              </div>
            )}
            <div>
              <h4 className="font-bold text-base text-gray-900">{selectedStore.storeName}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{selectedStore.city || "المدينة غير محدودة"}</p>
            </div>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5" /> مالك المتجر
              </p>
              <p className="font-bold text-gray-900 mt-1">{ownerName}</p>
            </div>
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" /> المدينة
              </p>
              <p className="font-bold text-gray-900 mt-1">{selectedStore.city || "غير محدد"}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" /> البريد الإلكتروني
              </p>
              <p className="font-medium text-gray-800 mt-0.5 truncate">
                {selectedStore.owner?.email || "غير محدد"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" /> رقم الهاتف
              </p>
              <p className="font-medium text-gray-800 mt-0.5 dir-ltr text-right">
                {selectedStore.owner?.phone || "غير محدد"}
              </p>
            </div>
          </div>

          {/* Description */}
          {selectedStore.description && (
            <div>
              <p className="text-xs text-gray-400 font-medium">وصف المتجر</p>
              <p className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600 mt-1 border border-gray-100 leading-relaxed">
                {selectedStore.description}
              </p>
            </div>
          )}

          {/* Created At */}
          <div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" /> تاريخ الانضمام
            </p>
            <p className="font-medium text-gray-800 mt-0.5">
              {new Date(selectedStore.createdAt).toLocaleDateString("ar-EG")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}