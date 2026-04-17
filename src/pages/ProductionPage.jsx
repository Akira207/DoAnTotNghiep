import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ProductionHeader from "../features/production/ProductionHeader";
import ProductionFilters from "../features/production/ProductionFilters";
import ProductionSummary from "../features/production/ProductionSummary";
import ProductionGrid from "../features/production/ProductionGrid";
import Pagination from "../features/production/Pagination";

export default function ProductionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // khóa scroll khi mở sidebar mobile
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [page, setPage] = useState(1);

  return (
    <div className="bg-background text-on-background font-body min-h-dvh overflow-x-hidden">
      {/* Overlay (mobile) */}
      <div
        onClick={toggleSidebar}
        className={`
          fixed inset-0 bg-black/50 z-[50] md:hidden transition-all duration-300
          ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile Header */}
      <MobileHeader onOpenSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="lg:ml-[280px] min-h-screen p-4 md:p-8 lg:p-10">
        {/* prodcution header */}
        <ProductionHeader />

        {/* filters */}
        <ProductionFilters />

        {/* summary */}
        <ProductionSummary />

        {/* production grid */}
        <ProductionGrid />

        {/* pagination */}
        <Pagination page={page} total={84} limit={4} onPageChange={setPage} />
      </main>
    </div>
  );
}
