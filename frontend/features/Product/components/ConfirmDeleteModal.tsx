"use client";

import { Button } from "@/components/Button";
import { AlertTriangle, Trash2 } from "lucide-react";


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
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

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

        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            icon={<Trash2 className="w-3.5 h-3.5" />}
            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-xs shadow-rose-600/20"
          >
            تأكيد الحذف
          </Button>
          
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs shadow-none"
          >
            إلغاء
          </Button>
        </div>
      </div>
    </div>
  );
}