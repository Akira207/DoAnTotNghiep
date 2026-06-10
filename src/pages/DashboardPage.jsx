import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import DashboardHeader from "../features/dashBoard/DashBoardHeader";
import KPISection from "../features/dashBoard/KPISection";
import ChartSection from "../features/dashBoard/ChartSection";
import StatusCard from "../features/dashBoard/StatusCard";
import NewOrdersTable from "../features/dashBoard/NewOrdersTable";
import AddOrderForm from "../features/orders/AddOrderForm";

import { getOrders } from "../services/orderService";
import { getAllProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";
import { getUsers } from "../services/userService";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    products: [],
    customers: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all data in parallel
      const [ordersData, productsData, customersData, usersData] = await Promise.all([
        getOrders().catch(() => []),
        getAllProducts().catch(() => []),
        getCustomers().catch(() => []),
        getUsers().catch(() => []),
      ]);

      setDashboardData({
        orders: Array.isArray(ordersData) ? ordersData : [],
        products: Array.isArray(productsData) ? productsData : [],
        customers: Array.isArray(customersData) ? customersData : [],
        users: Array.isArray(usersData) ? usersData : [],
      });
    } catch (err) {
      console.error("Fetch dashboard error:", err);
      setError(err.message || "Failed to fetch dashboard data");
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
        ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile Header */}
      <MobileHeader onOpenSidebar={toggleSidebar} />

      {/* Main */}
      <main className="md:ml-[280px] p-6 lg:p-10 space-y-10">
        <DashboardHeader onCreate={() => setOpenCreate(true)} />

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-slate-500">
            Đang tải dữ liệu...
          </div>
        )}

        {!loading && (
          <>
            <KPISection data={dashboardData} />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ChartSection data={dashboardData} />
              <StatusCard data={dashboardData} />
            </section>

            <section className="bg-white rounded shadow-sm overflow-hidden">
              <NewOrdersTable orders={dashboardData.orders} />
            </section>
          </>
        )}
      </main>

      {/* MODAL CREATE */}
      {openCreate && (
        <AddOrderForm
          onClose={() => setOpenCreate(false)}
          onSuccess={() => {
            fetchDashboardData();
            setOpenCreate(false);
          }}
        />
      )}
    </div>
  );
}
