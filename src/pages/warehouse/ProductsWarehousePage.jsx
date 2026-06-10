import { useState, useEffect, useMemo } from "react";
import useDebounce from "../../hooks/useDebounce";

import Sidebar from "../../components/layouts/SideBar";
import MobileHeader from "../../components/layouts/MobileHeader";
import WarehouseHeader from "../../features/productsWarehouse/WarehouseHeader";
import WarehouseStats from "../../features/productsWarehouse/WarehouseStats";
import WarehouseTable from "../../features/productsWarehouse/WarehouseTable";
import WarehouseBottomCards from "../../features/productsWarehouse/WarehouseBottomCards";
import WarehouseCreateModal from "../../features/productsWarehouse/WarehouseCreateModal";
import WarehouseEditModal from "../../features/productsWarehouse/WarehouseEditModal";
import PaginationTable from "../../components/common/PaginationTable";

import { getWarehouse } from "../../services/warehouseService";

export default function ProductsWarehousePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Pagination & Search State
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchWarehouse = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWarehouse();
      setWarehouseItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch warehouse error:", err);
      setError(err.message || "Failed to fetch warehouse data");
      setWarehouseItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and Pagination Logic
  const filteredItems = useMemo(() => {
    const keyword = debouncedSearch.toLowerCase().trim();
    if (!keyword) return warehouseItems;

    return warehouseItems.filter((item) => {
      const product = item.productId || item.product || {};
      const name = product?.name || "";
      const category = product?.category || "";

      return (
        name.toLowerCase().includes(keyword) ||
        category.toLowerCase().includes(keyword) ||
        (item.sku && item.sku.toLowerCase().includes(keyword))
      );
    });
  }, [warehouseItems, debouncedSearch]);

  const totalPages = Math.ceil(filteredItems.length / limit);
  const paginatedItems = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition
        ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="p-4 md:p-8 lg:ml-[280px]">
        <div className="space-y-8 max-w-[1600px] mx-auto w-full pb-12">
          <WarehouseHeader onRefresh={fetchWarehouse} />

          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center text-slate-500">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && (
            <>
              <WarehouseStats items={warehouseItems} />

              <div className="flex flex-col">
                <WarehouseTable
                  items={paginatedItems}
                  search={search}
                  setSearch={setSearch}
                  onRefresh={fetchWarehouse}
                  onCreate={() => setIsCreateOpen(true)}
                  onEdit={(item) => {
                    setSelectedItem(item);
                    setIsEditOpen(true);
                  }}
                  page={page}
                />
                <PaginationTable
                  currentPage={page}
                  totalPages={totalPages}
                  onChangePage={setPage}
                />
              </div>

              <WarehouseCreateModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onCreated={fetchWarehouse}
              />
              <WarehouseEditModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                item={selectedItem}
                onUpdated={fetchWarehouse}
              />

              <WarehouseBottomCards items={warehouseItems} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
