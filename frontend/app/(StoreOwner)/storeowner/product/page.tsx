"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Package,
  Search,
  Eye,
  Loader2,
  CheckCircle2,
  XCircle,
  Building2,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  Layers,
} from "lucide-react";

import { useGetProducts } from "@/features/Product/hooks/useGetProduct";
import Pagination from "@/components/Pagenation";

import ProductDetailsModal from "@/features/Product/components/ProductDetailsModal";
import ConfirmDeleteModal from "@/features/Product/components/ConfirmDeleteModal";
import EditProductSheet from "@/features/Product/components/EditProductSheet";

import { useDeleteProduct } from "@/features/Product/hooks/useDeleteProduct";
import AddProductModal from "@/features/Product/components/AddProductModal";
import { ProductCategory } from "@/features/Product/types/productCategory";
import { Button } from "@/components/Button";


const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.SOFAS]: "أطقم كنبات",
  [ProductCategory.TABLES]: "طاولات وطعام",
  [ProductCategory.BEDROOMS]: "غرف نوم",
  [ProductCategory.DECOR]: "ديكورات وإكسسوارات",
  [ProductCategory.OTHER]: "تصنيفات أخرى",
};

interface ProductStore {
  id: string;
  storeName: string;
  logo?: string;
  city?: string;
}

interface Product {
  id: string;
  title: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  isAvailable: boolean;
  images?: string[];
  image?: string;
  createdAt: string;
  store?: ProductStore;
}

function ActionsDropdownPortal({
  buttonRef,
  isOpen,
  onClose,
  onPreview,
  onEdit,
  onDelete,
}: {
  buttonRef: HTMLButtonElement | null;
  isOpen: boolean;
  onClose: () => void;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      const menuHeight = 120;
      const showAbove = rect.bottom + menuHeight > window.innerHeight;

      setCoords({
        top: showAbove ? rect.top - menuHeight : rect.bottom + 4,
        left: rect.left,
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        style={{
          position: "fixed",
          top: `${coords.top}px`,
          left: `${coords.left}px`,
        }}
        className="z-50 w-36 bg-white rounded-2xl border border-gray-100 shadow-2xl py-1.5 text-xs animate-in fade-in zoom-in-95 duration-100"
        dir="rtl"
      >
        <button
          onClick={onPreview}
          className="w-full text-right px-3 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
        >
          <Eye className="w-3.5 h-3.5 text-gray-400" />
          <span>معاينة</span>
        </button>

        <button
          onClick={onEdit}
          className="w-full text-right px-3 py-2 text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-medium"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>تعديل</span>
        </button>

        <button
          onClick={onDelete}
          className="w-full text-right px-3 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium border-t border-gray-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>حذف</span>
        </button>
      </div>
    </>,
    document.body
  );
}

export default function StoreProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const { productsData, isLoading, isError, error, isFetching } = useGetProducts(
    "/product/my-store",
    currentPage,
    pageSize,
    searchTerm
  );

  const { deleteProduct, isDeleting } = useDeleteProduct();

  const products: Product[] = productsData?.data || [];
  const totalItems: number = productsData?.totalCount || 0;
  const totalPages: number = productsData?.totalPages || 1;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEdit = (product: Product) => {
    setActiveMenuId(null);
    setProductToEdit(product);
  };

  const handleDeleteConfirm = () => {
    if (!productToDelete) return;

    deleteProduct(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null);
      },
    });
  };

  const closeDetailsModal = useCallback(() => setSelectedProduct(null), []);
  const closeAddModal = useCallback(() => setIsAddOpen(false), []);
  const closeEditSheet = useCallback(() => setProductToEdit(null), []);
  const closeDeleteModal = useCallback(() => setProductToDelete(null), []);

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1️⃣ Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="w-7 h-7 text-primary-accent" />
            منتجات المتجر
            {isFetching && (
              <Loader2 className="w-4 h-4 animate-spin text-primary-accent" />
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            إدارة، إضافة، وتحديث كافة المنتجات المعروضة بداخل متجرك الخاص
          </p>
        </div>

        
        <Button
          onClick={() => setIsAddOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="px-4 py-2.5 text-xs shadow-sm shadow-primary-accent/20"
        >
          إضافة منتج جديد
        </Button>
      </div>

      
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث باسم المنتج، الوصف..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-4 pr-9 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-accent"
          />
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
            <p className="text-sm">جاري تحميل قائمة المنتجات...</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center text-red-500 text-sm font-medium">
            {error instanceof Error
              ? error.message
              : "حدث خطأ أثناء جلب المنتجات"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">المتجر</th>
                  <th className="p-4">السعر</th>
                  <th className="p-4">حالة التوفر</th>
                  <th className="p-4">تاريخ الإضافة</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length > 0 ? (
                  products.map((product) => {
                    const productImage =
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : product.image;

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        {/* Title & Image */}
                        <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product.title}
                              className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-900">
                              {product.title}
                            </p>
                            {product.description && (
                              <p className="text-xs text-gray-400 font-normal truncate max-w-[220px]">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </td>

                        
                        <td className="p-4">
                          {product.category ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-accent/10 text-primary-accent text-xs font-bold">
                              <Layers className="w-3 h-3" />
                              <span>{CATEGORY_LABELS[product.category]}</span>
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">غير محدد</span>
                          )}
                        </td>

                        {/* Store Name */}
                        <td className="p-4 text-gray-700 font-medium">
                          {product.store ? (
                            <div className="flex items-center gap-2">
                              {product.store.logo ? (
                                <img
                                  src={product.store.logo}
                                  alt={product.store.storeName}
                                  className="w-6 h-6 rounded-lg object-cover"
                                />
                              ) : (
                                <Building2 className="w-4 h-4 text-gray-400" />
                              )}
                              <span>{product.store.storeName}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">متجري</span>
                          )}
                        </td>

                        
                        <td className="p-4 font-extrabold text-primary-accent dir-ltr text-right">
                          {product.price ? `${product.price} د.أ` : "غير محدد"}
                        </td>

                        
                        <td className="p-4">
                          {product.isAvailable ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              متوفر
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              غير متوفر
                            </span>
                          )}
                        </td>

                        
                        <td className="p-4 text-gray-500 text-xs">
                          {new Date(product.createdAt).toLocaleDateString(
                            "ar-EG"
                          )}
                        </td>

                        
                        <td className="p-4 text-center">
                          <button
                            ref={(el) => {
                              buttonRefs.current[product.id] = el;
                            }}
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === product.id ? null : product.id
                              )
                            }
                            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          <ActionsDropdownPortal
                            buttonRef={buttonRefs.current[product.id]}
                            isOpen={activeMenuId === product.id}
                            onClose={() => setActiveMenuId(null)}
                            onPreview={() => {
                              setSelectedProduct(product);
                              setActiveMenuId(null);
                            }}
                            onEdit={() => handleEdit(product)}
                            onDelete={() => {
                              setProductToDelete(product);
                              setActiveMenuId(null);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-gray-400 text-sm"
                    >
                      لا توجد منتجات مطابقة للبحث حالياً
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        
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

      
      {selectedProduct && (
        <ProductDetailsModal
          selectedProduct={selectedProduct}
          onClose={closeDetailsModal}
        />
      )}

      <EditProductSheet
        isOpen={Boolean(productToEdit)}
        product={productToEdit}
        onClose={closeEditSheet}
      />

      <AddProductModal
        isOpen={isAddOpen}
        onClose={closeAddModal}
      />

      {productToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(productToDelete)}
          title="حذف المنتج"
          itemName={productToDelete?.title}
          isLoading={isDeleting}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}