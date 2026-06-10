import { useState, useEffect, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ProductsHeader from "../features/product/ProductsHeader";
import ProductGrid from "../features/product/ProductGrid";
import PaginationStandalone from "../components/common/PaginationStandalone";
import AddProductForm from "../features/product/AddProductForm";
import ProductDetailModal from "../features/product/ProductDetailModal";

import {
  getAllProducts,
  deleteProduct,
} from "../services/productService";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false); // modal add/edit
  const [editingProduct, setEditingProduct] = useState(null);

  const [viewProduct, setViewProduct] = useState(null); // modal detail

  // search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // ===============================
  // FILTER & PAGINATION LOGIC
  // ===============================
  const filtered = useMemo(() => {
    const keyword = debouncedSearch.toLowerCase();
    if (!keyword) return products;

    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(keyword) ||
        p.category?.toLowerCase().includes(keyword) ||
        p.material?.toLowerCase().includes(keyword)
    );
  }, [debouncedSearch, products]);

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const currentProducts = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return filtered.slice(startIndex, startIndex + perPage);
  }, [filtered, page]);

  const handleDelete = async (id) => {
    if (!confirm("Xóa sản phẩm này?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden">

      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition-all
        ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile Header */}
      <MobileHeader onOpenSidebar={toggleSidebar} />

      {/* MAIN */}
      <main className="lg:ml-[280px] min-h-screen p-4 md:p-8 lg:p-10">

        {/* HEADER */}
        <ProductsHeader
          onAdd={() => {
            setEditingProduct(null);
            setOpen(true);
          }}
          search={search}
          setSearch={setSearch}
        />

        {/* GRID */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <ProductGrid
            products={currentProducts}
            onEdit={(p) => {
              setEditingProduct(p);
              setOpen(true);
            }}
            onDelete={handleDelete}
            onView={(p) => setViewProduct(p)}
          />
        )}

        {/* PAGINATION */}
        <PaginationStandalone
          currentPage={page}
          totalPages={totalPages}
          totalItems={total}
          perPage={perPage}
          showInfo={true}
          onChangePage={setPage}
        />

        {/* ADD / EDIT MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <AddProductForm
              product={editingProduct}
              onClose={() => {
                setOpen(false);
                setEditingProduct(null);
              }}
              onSuccess={() => {
                fetchProducts();
                setOpen(false);
              }}
            />
          </div>
        )}

        {/* DETAIL MODAL */}
        {viewProduct && (
          <ProductDetailModal
            product={viewProduct}
            onClose={() => setViewProduct(null)}
          />
        )}
      </main>
    </div>
  );
}
