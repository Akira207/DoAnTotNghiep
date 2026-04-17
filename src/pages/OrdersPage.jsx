import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import OrdersHeader from "../features/orders/OrdersHeader";
import OrdersFilters from "../features/orders/OrderFilters";
import OrderTable from "../features/orders/OrderTable";
import OrderPagination from "../features/orders/OrderPagination";

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // fake total (sau này replace API)
  const totalItems = 42;
  const totalPages = Math.ceil(totalItems / limit);

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

      <main className="min-h-screen p-4 md:p-8 lg:ml-[280px] lg:p-12">
        <OrdersHeader />

        <OrdersFilters />

        {/* TABLE nhận page */}
        <OrderTable page={page} limit={limit} />

        {/* PAGINATION điều khiển page */}
        <OrderPagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          limit={limit}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
} 