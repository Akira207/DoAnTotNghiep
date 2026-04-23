import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ResportsHeader from "../features/resports/ResportsHeader";
import ReportsStats from "../features/resports/ReportsStats";
import RevenueChart from "../features/resports/RevenueChart";
import OrderStatusChart from "../features/resports/OrderStatusChart";
import ProductionOrdersTable from "../features/resports/ProductionOrdersTable";

import { getOrders } from "../services/orderService";
import { getProductionTasks } from "../services/productionService";

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reportsData, setReportsData] = useState({
    orders: [],
    productionTasks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [ordersData, tasksData] = await Promise.all([
        getOrders().catch(() => []),
        getProductionTasks().catch(() => []),
      ]);

      setReportsData({
        orders: Array.isArray(ordersData) ? ordersData : [],
        productionTasks: Array.isArray(tasksData) ? tasksData : [],
      });
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err.message || "Failed to fetch reports data");
    } finally {
      setLoading(false);
    }
  };

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
            {/* stats */}
            <ReportsStats data={reportsData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue */}
              <RevenueChart data={reportsData} />

              {/* Order status chart */}
              <OrderStatusChart data={reportsData} />
            </div>

            {/* Production orders table */}
            <ProductionOrdersTable tasks={reportsData.productionTasks} />
          </>
        )}
      </main>
    </div>
  );
}
