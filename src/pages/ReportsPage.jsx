import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ResportsHeader from "../features/resports/ResportsHeader";
import ReportsStats from "../features/resports/ReportsStats";
import RevenueChart from "../features/resports/RevenueChart";
import OrderStatusChart from "../features/resports/OrderStatusChart";
import ProductionOrdersTable from "../features/resports/ProductionOrdersTable";

export default function ReportsPage() {
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

      {/* MAIN */}
      <main className="p-4 md:p-8 lg:ml-[280px]">
        {/*header */}
        <ResportsHeader />

        {/* stats */}
        <ReportsStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue */}
          <RevenueChart />

          {/* Order status chart */}
          <OrderStatusChart />

        </div>
          {/* Production orders table */}
          <ProductionOrdersTable />
      </main>
    </div>
  );
}
