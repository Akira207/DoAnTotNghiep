import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ProductsHeader from "../features/product/ProductsHeader";
import ProductGrid from "../features/product/ProductGrid";
import ProductsPagination from "../features/product/ProductsPagination";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden">
      {/* Overlay (mobile) */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition-all duration-300
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
      {/* Main */}
      <main className="lg:ml-[280px] min-h-screen p-4 md:p-8 lg:p-10">
        {/* Header */}
        <ProductsHeader onOpenSidebar={toggleSidebar} />

        {/* Product grid */}
        <ProductGrid />

        {/* Content */}
        <ProductsPagination />
      </main>
    </div>
  );
}
