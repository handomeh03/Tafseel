"use client";

import { useState } from "react";
import { Lock, User, Store, KeyRound } from "lucide-react";
import ChangePasswordSection from "@/features/auth/components/ChangePasswordSection";


const SETTINGS_SECTIONS = [
  { id: "password", label: "تغيير كلمة السر", icon: Lock, active: true },
  { id: "profile", label: "المعلومات الشخصية", icon: User, active: false },
  { id: "store", label: "بيانات المتجر", icon: Store, active: false },
];

export default function StoreSettingsPage() {
  const [activeTab, setActiveTab] = useState("password");

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1️⃣ Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <KeyRound className="w-7 h-7 text-primary-accent" />
          إعدادات الحساب والمتجر
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          إدارة الأمان، الحساب الشخصي، وتفضيلات المتجر الخاص بك
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isCurrent = activeTab === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-primary-accent text-white shadow-sm shadow-primary-accent/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </div>
                {!section.active && section.id !== "password" && (
                  <span className="text-[10px] bg-gray-100 text-gray-400 font-medium px-2 py-0.5 rounded-full">
                    قريباً
                  </span>
                )}
              </button>
            );
          })}
        </div>

        
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {activeTab === "password" && <ChangePasswordSection />}

          {activeTab !== "password" && (
            <div className="p-12 text-center text-gray-400 text-sm">
              هذا السكشن قيد التطوير وسيكون متاحاً قريباً!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}