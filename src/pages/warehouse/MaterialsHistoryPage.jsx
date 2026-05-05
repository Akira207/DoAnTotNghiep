import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

import Sidebar from "../../components/layouts/SideBar";
import MobileHeader from "../../components/layouts/MobileHeader";
import MaterialsHistoryHeader from "../../features/masterialsHistory/MaterialsHistoryHeader";
import MaterialsHistoryStats from "../../features/masterialsHistory/MaterialsHistoryStats";
import MaterialsHistoryActions from "../../features/masterialsHistory/MaterialsHistoryActions";
import MaterialsHistoryTable from "../../features/masterialsHistory/MaterialsHistoryTable";
import MaterialsReportBanner from "../../features/masterialsHistory/MaterialsReportBanner";
import MaterialsImportModal from "../../features/masterialsHistory/MaterialsImportModal";
import MaterialsHistoryEditModal from "../../features/masterialsHistory/MaterialsHistoryEditModal";

import {
  getMaterialImports,
  createMaterialImport,
} from "../../services/materialImportService";

export default function MaterialsHistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalValueAllPages, setTotalValueAllPages] = useState(0);

  // SEARCH
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 400);

  // PAGINATION (FIX LỖI)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  // fetch data khi search / page thay đổi
  useEffect(() => {
    fetchMaterials();
  }, [debouncedKeyword, page]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getMaterialImports(debouncedKeyword, page);

      setMaterials(res.data || []);
      setTotalPages(res.totalPages || 1);
      setTotalValueAllPages(res.totalValueAllPages || 0);
    } catch (err) {
      setError(err.message || "Failed to fetch materials");
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // CREATE IMPORT
  const handleCreateImport = async (formData) => {
    try {
      await createMaterialImport(formData);
      setShowModal(false);
      setPage(1);
      fetchMaterials();
    } catch (err) {
      console.error(err);
      alert("Tạo phiếu nhập thất bại");
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition ${
          isSidebarOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="p-4 md:p-8 lg:ml-[280px]">
        <div className="max-w-7xl mx-auto">

          <MaterialsHistoryHeader onRefresh={fetchMaterials} />

          <MaterialsHistoryActions
            onSearch={setKeyword}
            onAddImport={() => setShowModal(true)}
          />

          {error && (
            <div className="text-red-500 mb-3">{error}</div>
          )}

          {loading && <div>Loading...</div>}

          {!loading && (
            <>
              <MaterialsHistoryStats
                items={materials}
                totalValue={totalValueAllPages}
              />

              <MaterialsHistoryTable
                items={materials}
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                onEdit={(item) => {
                  setSelectedItem(item);
                  setShowEditModal(true);
                }}
              />

              <MaterialsReportBanner />
            </>
          )}

          <MaterialsImportModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleCreateImport}
          />
          <MaterialsHistoryEditModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            item={selectedItem}
            onUpdated={fetchMaterials}
          />
        </div>
      </main>
    </div>
  );
}