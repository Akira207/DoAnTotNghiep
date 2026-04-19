import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import AccessoryHeader from "../features/accessory/AccessoryHeader";
import AccessoryGrid from "../features/accessory/AccessoryGrid";
import AccessoryPagination from "../features/accessory/AccessoryPagination";

export default function AccessoriesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
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
        <AccessoryHeader />
        {/* grid */}
        <AccessoryGrid />
        {/* pagination */}
        <AccessoryPagination />
      </main>
    </div>
  );
}
