"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sofa,
  Store,
  LogIn,
  LogOut,
  Menu,
  X,
  Search,
  PackageSearch,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/store/Context/UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();

  
  const getDashboardHref = () => {
    if (user?.role === "SUPER_ADMIN") return "/admin";
    if (user?.role === "STORE_OWNER") return "/storeowner";
    return "/";
  };

  const isManagementRole =
    user?.role === "SUPER_ADMIN" || user?.role === "STORE_OWNER";

  return (
    <header className="sticky top-0 z-50 bg-main/90 backdrop-blur-md border-b border-subtle" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-accent text-white flex items-center justify-center font-bold text-xl shadow-sm">
            <Sofa className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-brand-dark">
            تفصيل <span className="text-brand-primary">Store</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <Link
            href="/store-request"
            className="hover:text-brand-dark transition-colors inline-flex items-center gap-2"
          >
            <Store className="w-4 h-4 text-brand-primary" />
            <span>طلب متجر خاص</span>
          </Link>

          <Link
            href="/myorder"
            className="hover:text-brand-dark transition-colors inline-flex items-center gap-2"
          >
            <PackageSearch className="w-4 h-4 text-brand-primary" />
            <span>تتبع طلبي</span>
          </Link>

          {isLoading ? (
            <div className="flex items-center gap-6">
              <div className="w-20 h-5 bg-gray-200/60 rounded-md animate-pulse" />
              <div className="w-20 h-5 bg-gray-200/60 rounded-md animate-pulse" />
            </div>
          ) : user ? (
            <>
              
              {isManagementRole && (
                <Link
                  href={getDashboardHref()}
                  className="hover:text-brand-dark transition-colors inline-flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-primary"  />
                  <span>لوحة التحكم</span>
                </Link>
              )}

              <button
                onClick={logout}
                type="button"
                className="hover:text-red-600 transition-colors inline-flex items-center gap-2 text-brand-muted cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>تسجيل خروج</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-brand-dark transition-colors inline-flex items-center gap-2"
            >
              <LogIn className="w-4 h-4 text-brand-primary" />
              <span>تسجيل دخول</span>
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-accent text-white text-sm font-semibold hover:opacity-90 transition-all shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>تصفح المنتجات الآن</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="md:hidden p-2 rounded-lg text-brand-dark hover:bg-brand-light transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-subtle bg-main px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-brand-muted text-sm">
            <Link
              href="/store-request"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 py-1 hover:text-brand-dark transition-colors"
            >
              <Store className="w-4 h-4 text-brand-primary" />
              <span>طلب متجر خاص</span>
            </Link>

            <Link
              href="/myorder"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 py-1 hover:text-brand-dark transition-colors"
            >
              <PackageSearch className="w-4 h-4 text-brand-primary" />
              <span>تتبع طلبي</span>
            </Link>

            {isLoading ? (
              <div className="py-2 space-y-2">
                <div className="w-24 h-5 bg-gray-200/60 rounded-md animate-pulse" />
              </div>
            ) : user ? (
              <>
                {isManagementRole && (
                  <Link
                    href={getDashboardHref()}
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center gap-2 py-1 hover:text-brand-dark transition-colors text-primary-accent font-bold"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-primary"  />
                    <span>لوحة التحكم</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  type="button"
                  className="inline-flex items-center gap-2 py-1 hover:text-red-600 text-red-500 transition-colors w-full text-right cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>تسجيل خروج</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 py-1 hover:text-brand-dark transition-colors"
              >
                <LogIn className="w-4 h-4 text-brand-primary" />
                <span>تسجيل دخول</span>
              </Link>
            )}
          </nav>

          <Link
            href="/product"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 w-full text-center px-5 py-2.5 rounded-xl bg-primary-accent text-white text-sm font-semibold"
          >
            <Search className="w-4 h-4" />
            <span>تصفح المنتجات الآن</span>
          </Link>
        </div>
      )}
    </header>
  );
}