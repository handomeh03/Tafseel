"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "حذف العنصر",
  description = "هل أنت تأكد من رغبتك في حذف",
  itemName,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-gray-100 shadow-2xl"
        dir="rtl"
      >
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content Details */}
        <div>
          <h3 className="font-bold text-base text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {description}{" "}
            {itemName && (
              <span className="font-bold text-gray-800">"{itemName}"</span>
            )}
            ؟ لا يمكن التراجع عن هذا الإجراء
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>تأكيد الحذف</span>
          </button>
          
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}