import { useState, useEffect } from "react";

import Sidebar from "../../components/layouts/SideBar";
import MobileHeader from "../../components/layouts/MobileHeader";
import WarehouseHeader from "../../features/productsWarehouse/WarehouseHeader";
import WarehouseStats from "../../features/productsWarehouse/WarehouseStats";
import WarehouseTable from "../../features/productsWarehouse/WarehouseTable";
import WarehouseBottomCards from "../../features/productsWarehouse/WarehouseBottomCards";
import WarehouseCreateModal from "../../features/productsWarehouse/WarehouseCreateModal";

import { getWarehouse } from "../../services/warehouseService";

export default function ProductsWarehousePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

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
        {/* <!-- Dashboard Content --> */}
        <div className="space-y-8 max-w-[1600px] mx-auto w-full pb-12">
          {/* warehouse header */}
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
              {/* warehouse stats */}
              <WarehouseStats items={warehouseItems} />

              <WarehouseTable
                items={warehouseItems}
                onRefresh={fetchWarehouse}
                onCreate={() => setIsCreateOpen(true)}
              />
              <WarehouseCreateModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onCreated={fetchWarehouse}
              />  

              {/* warehouse bottom cards */}
              <WarehouseBottomCards items={warehouseItems} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
