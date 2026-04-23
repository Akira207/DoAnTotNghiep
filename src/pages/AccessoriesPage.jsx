import { useState, useEffect } from "react";

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
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editAccessory, setEditAccessory] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAccessories();
      setAccessories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch accessories error:", err);
      setError(err.message || "Failed to fetch accessories");
      setAccessories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    setEditAccessory(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditAccessory(null);
  };

  const handleSuccess = () => {
    fetchAccessories();
    handleCloseForm();
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
        {/* header */}
        <AccessoryHeader onOpenForm={handleOpenForm} />
        
        {/* error message */}
        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* loading state */}
        {loading && (
          <div className="text-center text-slate-500">
            Đang tải dữ liệu...
          </div>
        )}

        {/* grid */}
        {!loading && (
          <>
            <AccessoryGrid accessories={accessories} onRefresh={fetchAccessories} />
            {/* pagination */}
            <AccessoryPagination items={accessories} />
          </>
        )}
      </main>

      {/* FORM MODAL */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <AddAccessoryForm
            accessory={editAccessory}
            onClose={handleCloseForm}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </div>
  );
}
