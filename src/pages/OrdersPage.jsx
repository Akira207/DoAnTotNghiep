import { useEffect, useState } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";

import OrdersHeader from "../features/orders/OrdersHeader";
import OrdersFilters from "../features/orders/OrdersFilters";
import OrderTable from "../features/orders/OrderTable";
import PaginationStandalone from "../components/common/PaginationStandalone";
import AddOrderForm from "../features/orders/AddOrderForm";

import { getOrders } from "../services/orderService";

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tất cả");

  const [page, setPage] = useState(1);
  const limit = 10;

  // 🔥 modal create
  const [openCreate, setOpenCreate] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      // Handle both array and object with orders property
      const ordersList = Array.isArray(data) ? data : (data.orders || []);
      setOrders(ordersList);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // FILTER + SEARCH + PAGINATION
  // =========================
  const filteredOrders = orders.filter((o) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      o.orderCode?.toLowerCase().includes(keyword) ||
      o.customerId?.name?.toLowerCase().includes(keyword);

    const map = {
      "Tất cả": null,
      "Chờ sản xuất": "pending",
      "Đang sản xuất": "producing",
      "Đang vận chuyển": "transporting",
      "Chờ thanh toán": "waiting_payment",
      "Đã thanh toán": "completed",
      "Đã huỷ": "cancelled",
    };

    const statusNeed = map[filter];
    const matchFilter = statusNeed ? o.status === statusNeed : true;

    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredOrders.length / limit);

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * limit,
    page * limit
  );

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="md:ml-[280px] p-6 lg:p-10">

        {/* HEADER */}
        <OrdersHeader onCreate={() => setOpenCreate(true)} />

        {/* FILTER */}
        <OrdersFilters
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* TABLE */}
        <OrderTable
          orders={paginatedOrders}
          onReload={fetchOrders}
        />

        {/* PAGINATION */}
        <PaginationStandalone
          currentPage={page}
          totalPages={totalPages}
          onChangePage={setPage}
          totalItems={filteredOrders.length}
          perPage={limit}
          showInfo={true}
        />

      </main>

      {/* MODAL CREATE */}
      {openCreate && (
        <AddOrderForm
          onClose={() => setOpenCreate(false)}
          onSuccess={() => {
            fetchOrders();
            setOpenCreate(false);
          }}
        />
      )}
    </div>
  );
}