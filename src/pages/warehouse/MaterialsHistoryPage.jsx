import { useState, useEffect } from "react";

import Sidebar from "../../components/layouts/SideBar";
import MobileHeader from "../../components/layouts/MobileHeader";
import MaterialsHistoryHeader from "../../features/masterialsHistory/MaterialsHistoryHeader";
import MaterialsHistoryStats from "../../features/masterialsHistory/MaterialsHistoryStats";
import MaterialsHistoryActions from "../../features/masterialsHistory/MaterialsHistoryActions";
import MaterialsHistoryTable from "../../features/masterialsHistory/MaterialsHistoryTable";
import MaterialsReportBanner from "../../features/masterialsHistory/MaterialsReportBanner";

import { getMaterialImports } from "../../services/materialImportService";

export default function MaterialsHistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMaterialImports();
      setMaterials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch materials error:", err);
      setError(err.message || "Failed to fetch materials");
      setMaterials([]);
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

      {/* Main content */}
      <main className="p-4 md:p-8 lg:ml-[280px]">
        {/* <!-- Dashboard Content --> */}
        <div className="max-w-7xl w-full mx-auto">
            {/* Materials History header */}
            <MaterialsHistoryHeader onRefresh={fetchMaterials} />

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
                {/* Materials History stats */}
                <MaterialsHistoryStats items={materials} />

                {/* Materials History actions */}
                <MaterialsHistoryActions onRefresh={fetchMaterials} />

                {/* Materials History table */}
                <MaterialsHistoryTable items={materials} onRefresh={fetchMaterials} />

                {/* Materials Report banner */}
                <MaterialsReportBanner items={materials} />
              </>
            )}
        </div>
      </main>
    </div>
  );
}
