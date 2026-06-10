import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import ResportsHeader from "../features/reports/ResportsHeader";
import ReportsStats from "../features/reports/ReportsStats";
import RevenueChart from "../features/reports/RevenueChart";
import OrderStatusChart from "../features/reports/OrderStatusChart";
import ProductionOrdersTable from "../features/reports/ProductionOrdersTable";
import ProductionDetailModal from "../features/production/ProductionDetailModal";
import ExportReportModal from "../features/reports/ExportReportModal";

import {
  getGeneralStats,
  getRevenueData,
  getProductionReport,
  getOrderStatusDistribution,
} from "../services/reportService";
import { getOrders } from "../services/orderService";
import { getPayments } from "../services/paymentService";

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reportsData, setReportsData] = useState({
    stats: null,
    revenue: [],
    statusDistribution: {},
    productionTasks: [],
    orders: [],
    payments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

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

      const [stats, revenue, statusDist, tasks, orders, payments] = await Promise.all([
        getGeneralStats(),
        getRevenueData(),
        getOrderStatusDistribution(),
        getProductionReport(),
        getOrders().catch(() => []),
        getPayments().catch(() => []),
      ]);

      setReportsData({
        stats,
        revenue,
        statusDistribution: statusDist,
        productionTasks: tasks,
        orders: Array.isArray(orders) ? orders : [],
        payments: Array.isArray(payments) ? payments : [],
      });
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err.message || "Failed to fetch reports data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedTask(null);
  };

  const handleConfirmExport = async (config) => {
    try {
      let data = [];
      let fileName = `Bao_Cao_${config.type}_${new Date().toISOString().slice(0, 10)}.xlsx`;

      if (config.type === "orders") {
        const orders = await getOrders();
        const list = Array.isArray(orders) ? orders : (orders.orders || []);

        data = list
          .filter(o => {
            const date = new Date(o.orderDate).toISOString().split('T')[0];
            return date >= config.fromDate && date <= config.toDate;
          })
          .map(o => ({
            "Mã Đơn": o.orderCode || "N/A",
            "Khách hàng": o.customerId?.name || "N/A",
            "Ngày Tạo": new Date(o.orderDate).toLocaleDateString("vi-VN"),
            "Tổng Tiền": (o.totalAmount || 0).toLocaleString("vi-VN") + "đ",
            "Trạng thái": o.status || "N/A"
          }));
      } else if (config.type === "transactions") {
        const payments = await getPayments();
        const list = Array.isArray(payments) ? payments : (payments.payments || []);

        data = list
          .filter(p => {
            const date = new Date(p.paymentDate).toISOString().split('T')[0];
            return date >= config.fromDate && date <= config.toDate;
          })
          .map(p => ({
            "Mã Giao Dịch": p._id?.substring(0, 6).toUpperCase() || "N/A",
            "Nội dung": `Thanh toán đơn ${p.orderId?.orderCode || "N/A"}`,
            "Phương thức": p.paymentMethod || "N/A",
            "Thời gian": new Date(p.paymentDate).toLocaleString("vi-VN"),
            "Số tiền": (p.amount || 0).toLocaleString("vi-VN") + "đ",
            "Trạng thái": p.status || "N/A"
          }));
      }

      if (data.length === 0) {
        alert("Không tìm thấy dữ liệu trong khoảng thời gian này.");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bao Cao");
      XLSX.writeFile(workbook, fileName);

      setIsExportOpen(false);
    } catch (err) {
      console.error("Export error:", err);
      alert("Có lỗi xảy ra trong quá trình xuất file Excel.");
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
        <ResportsHeader onExport={() => setIsExportOpen(true)} />

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
            <ReportsStats data={reportsData.stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue */}
              <RevenueChart data={reportsData.revenue} />

              {/* Order status chart */}
              <OrderStatusChart data={reportsData.statusDistribution} />
            </div>

            {/* Production orders table */}
            <ProductionOrdersTable
              tasks={reportsData.productionTasks}
              orders={reportsData.orders}
              transactions={reportsData.payments}
              onDetail={handleOpenDetail}
              onReload={fetchReportsData}
            />
          </>
        )}
      </main>

      {/* Detail Modal */}
      <ProductionDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        item={selectedTask}
        onUpdated={fetchReportsData}
      />

      {/* Export Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onConfirm={handleConfirmExport}
      />
    </div>
  );
}
