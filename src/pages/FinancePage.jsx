import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import FinanceHeader from "../features/finance/FinanceHeader";
import FinanceSummary from "../features/finance/FinanceSummary";
import RevenueChart from "../features/finance/RevenueChart";
import RecentTransactions from "../features/finance/RecentTransactions";

import { getOrders } from "../services/orderService";
import { getPayments } from "../services/paymentService";

export default function FinancePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [financeData, setFinanceData] = useState({
    orders: [],
    payments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchFinanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [ordersData, paymentsData] = await Promise.all([
        getOrders().catch(() => []),
        getPayments().catch(() => []),
      ]);

      setFinanceData({
        orders: Array.isArray(ordersData) ? ordersData : [],
        payments: Array.isArray(paymentsData) ? paymentsData : [],
      });
    } catch (err) {
      console.error("Fetch finance error:", err);
      setError(err.message || "Failed to fetch finance data");
    } finally {
      setLoading(false);
    }
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

      {/* Main Content */}
      <main className="md:ml-[280px] min-h-screen p-4 md:p-10">
        {/* Page Header */}
        <FinanceHeader />

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg my-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-slate-500 my-4">
            Đang tải dữ liệu...
          </div>
        )}

        {!loading && (
          <>
            {/* Summary */}
            <FinanceSummary data={financeData} />

            {/* Revenue Chart */}
            <RevenueChart data={financeData} />

            {/* Recent Transactions */}
            <RecentTransactions payments={financeData.payments} />
          </>
        )}
      </main>
    </div>
  );
}
