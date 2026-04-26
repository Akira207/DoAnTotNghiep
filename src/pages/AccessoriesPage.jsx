import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";

import AccessoryHeader from "../features/accessory/AccessoryHeader";
import AccessoryGrid from "../features/accessory/AccessoryGrid";
import AccessoryPagination from "../features/accessory/AccessoryPagination";
import AddAccessoryForm from "../features/accessory/AddAccessoryForm";

import { getAccessories } from "../services/accessoryService";

export default function AccessoriesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SEARCH
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 400);

  // ✅ PAGINATION
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // modal
  const [formOpen, setFormOpen] = useState(false);
  const [editAccessory, setEditAccessory] = useState(null);

  const handleEdit = (item) => {
    setEditAccessory(item);
    setFormOpen(true);
  };

  useEffect(() => {
    fetchAccessories();
  }, [debouncedKeyword, page]);

  const fetchAccessories = async () => {
    try {
      setLoading(true);

      const res = await getAccessories({
        keyword: debouncedKeyword,
        page,
      });

      setAccessories(res.data || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || 1);
    } catch (err) {
      console.error("Fetch accessories error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  const handleSuccess = () => {
    fetchAccessories();
    setFormOpen(false);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden">
      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition-all duration-300
        ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="p-4 md:p-8 lg:ml-[280px] space-y-6">
        {/* Header giữ nguyên UI */}
        <AccessoryHeader
          onSearch={setKeyword}
          onOpenForm={() => {
            setEditAccessory(null);
            setFormOpen(true);
          }}
        />

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-500">Đang tải dữ liệu...</div>
        )}

        {/* Data */}
        {!loading && (
          <>
            <AccessoryGrid accessories={accessories} onEdit={handleEdit} />

            <AccessoryPagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </>
        )}
      </main>

      {/* MODAL */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <AddAccessoryForm
            accessory={editAccessory}
            onClose={() => setFormOpen(false)}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </div>
  );
}
