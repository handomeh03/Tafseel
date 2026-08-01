"use client";

import { useState } from "react";
import {
    Store,
    Search,
    Building2,
    Eye,
    Loader2,
} from "lucide-react";
import { UseGetAllActiveStore } from "@/features/store/hooks/useGetAllActiveStore";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import ActiveStoreDetailsModal from "@/features/store/components/ActiveStoreDetailsModal";


interface StoreOwner {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface ActiveStore {
    id: string;
    storeName: string;
    description?: string;
    city?: string;
    logo?: string;
    createdAt: string;
    owner: StoreOwner;
}

export default function StoresPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(7);
    const [selectedStore, setSelectedStore] = useState<ActiveStore | null>(null);

    const { activeStores, isLoading, isError, error, isFetching } = UseGetAllActiveStore(
        currentPage,
        pageSize,
        searchTerm
    );

    const stores: ActiveStore[] = activeStores?.data || [];
    const totalItems: number = activeStores?.totalCount || 0;
    const totalPages: number = activeStores?.totalPages || 1;

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6" dir="rtl">

            {/* 1️⃣ Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <Store className="w-7 h-7 text-primary-accent" />
                        المتاجر النشطة
                        {isFetching && <Loader2 className="w-4 h-4 animate-spin text-primary-accent" />}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        إدارة وعرض جميع المتاجر والتنجيدات المفعلة والمنضمة لمنصة تفصيل
                    </p>
                </div>
            </div>

            {/* 2️⃣ Filter / Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="بحث باسم المتجر، المالك، أو المدينة..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full pl-4 pr-9 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent"
                    />
                </div>
            </div>

            {/* 3️⃣ Stores Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm relative">
                <Table
                    headers={["اسم المتجر", "المالك", "رقم الهاتف", "المدينة", "تاريخ الانضمام"]}
                    data={stores}
                    keyExtractor={(store) => store.id}
                    isLoading={isLoading}
                    loadingText="جاري تحميل المتاجر النشطة..."
                    isError={isError}
                    error={error}
                    emptyMessage="لا توجد متاجر نشطة مطابقة للبحث حالياً"
                    renderRow={(store) => (
                        <>
                            {/* Store Name & Logo */}
                            <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                                {store.logo ? (
                                    <img
                                        src={store.logo}
                                        alt={store.storeName}
                                        className="w-9 h-9 rounded-xl object-cover border border-gray-100"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-gray-900">{store.storeName}</p>
                                    {store.description && (
                                        <p className="text-xs text-gray-400 font-normal truncate max-w-50">
                                            {store.description}
                                        </p>
                                    )}
                                </div>
                            </td>

                            {/* Owner */}
                            <td className="p-4 text-gray-700 font-medium">
                                {store.owner?.name || "غير محدد"}
                            </td>

                            {/* Phone */}
                            <td className="p-4 text-gray-600 dir-ltr text-right">
                                {store.owner?.phone || "غير محدد"}
                            </td>

                            {/* City */}
                            <td className="p-4 text-gray-600">
                                {store.city || "غير محدد"}
                            </td>

                            {/* Created At */}
                            <td className="p-4 text-gray-500 text-xs">
                                {new Date(store.createdAt).toLocaleDateString("ar-EG")}
                            </td>
                        </>
                    )}
                >
                    {(store) => (
                        <button
                            onClick={() => setSelectedStore(store)}
                            className="p-2 text-gray-500 hover:text-primary-accent hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
                        >
                            <Eye className="w-4 h-4" />
                            <span>التفاصيل</span>
                        </button>
                    )}
                </Table>

                {/* 📄 Reusable Pagination Component */}
                {!isLoading && !isError && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalCount={totalItems}
                        pageSize={pageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                        isLoading={isFetching}
                    />
                )}
            </div>

            {/* 4️⃣ Store Details Modal */}
            {selectedStore && (
                <ActiveStoreDetailsModal
                    selectedStore={selectedStore}
                    onClose={() => setSelectedStore(null)}
                />
            )}

        </div>
    );
}