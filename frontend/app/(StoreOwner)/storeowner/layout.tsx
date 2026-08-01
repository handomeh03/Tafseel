"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  Package, 
  LogOut, 
  Sofa, 
  Menu,
  X,
  Settings,
} from "lucide-react";
import { useAuth } from "@/store/Context/UserContext";
import ProtectedRoute from "@/components/ProtectedComponents/AuthProtected";

const navItems = [
  { name: "الرئيسية والإحصائيات", href: "/storeowner", icon: LayoutDashboard },
  { name: "منتجات المتجر", href: "/storeowner/product", icon: Package },
  { name: "الطلبات الواردة", href: "/storeowner/order", icon: ShoppingBag },
  { name: "الإعدادات ", href: "/storeowner/setting", icon: Settings },
];

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-brand-dark" dir="rtl">
        
        
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-accent text-white flex items-center justify-center font-bold shadow-sm">
              <Sofa className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              تفصيل <span className="text-brand-primary text-xs font-semibold">Store</span>
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>


        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          />
        )}

        
        <aside
          className={`
            fixed md:sticky top-0 right-0 z-50 md:z-auto
            h-screen w-72 md:w-64 bg-white border-l border-gray-200 
            flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          <div className="space-y-8">
            
            <div className="flex items-center justify-between px-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-accent text-white flex items-center justify-center font-bold shadow-sm">
                  <Sofa className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg leading-none">
                    تفصيل <span className="text-brand-primary text-xs font-semibold">Store</span>
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1 font-medium flex items-center gap-1">
                    <Store className="w-3 h-3 text-indigo-500" /> لوحة إدارة المتجر
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            
               <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-accent text-white font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          </div>

          
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="px-2">
              <p className="text-sm font-bold text-gray-900 truncate">
                {user?.name || "صاحب المتجر"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <button
              onClick={logout}
              type="button"
              className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </ProtectedRoute>
  );
}