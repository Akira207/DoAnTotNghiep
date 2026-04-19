import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import FinanceHeader from "../features/finance/FinanceHeader";
import FinanceSummary from "../features/finance/FinanceSummary";
import RevenueChart from "../features/finance/RevenueChart";
import RecentTransactions from "../features/finance/RecentTransactions";

export default function FinancePage() {
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

      {/* Main Content */}
      <main className="md:ml-[280px] min-h-screen p-4 md:p-10">
        {/* Page Header */}
        <FinanceHeader />

        {/* Summary */}
        <FinanceSummary />

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Recent Transactions */}
        <RecentTransactions />
      </main>
    </div>
  );
}
