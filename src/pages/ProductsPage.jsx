import { useEffect, useState } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ProductsHeader from "../features/product/ProductsHeader";
import ProductGrid from "../features/product/ProductGrid";
import ProductsPagination from "../features/product/ProductsPagination";
import AddProductForm from "../features/product/AddProductForm";
import ProductDetailModal from "../features/product/ProductDetailModal";

import {
  getAllProducts,
  deleteProduct,
} from "../services/productService";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false); // modal add/edit
  const [editingProduct, setEditingProduct] = useState(null);

  const [viewProduct, setViewProduct] = useState(null); // modal detail

  // search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 8;

  // ===============================
  // Sidebar scroll lock
  // ===============================
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // ===============================
  // FETCH PRODUCTS
  // ===============================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===============================
  // DEBOUNCE SEARCH
  // ===============================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ===============================
  // FILTER
  // ===============================
  useEffect(() => {
    const keyword = debouncedSearch.toLowerCase();

    const result = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(keyword) ||
        p.category?.toLowerCase().includes(keyword) ||
        p.material?.toLowerCase().includes(keyword)
    );

    setFiltered(result);
    setPage(1);
  }, [debouncedSearch, products]);

  // ===============================
  // DELETE
  // ===============================
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

  // ===============================
  // PAGINATION
  // ===============================
  const total = filtered.length;
  const startIndex = (page - 1) * perPage;
  const currentProducts = filtered.slice(
    startIndex,
    startIndex + perPage
  );

  // ===============================
  // RENDER
  // ===============================
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
        <ProductsPagination
          total={total}
          perPage={perPage}
          currentPage={page}
          onPageChange={setPage}
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