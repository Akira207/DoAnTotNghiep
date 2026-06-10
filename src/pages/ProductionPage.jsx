import { useEffect, useState, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";

import ProductionHeader from "../features/production/ProductionHeader";
import ProductionFilters from "../features/production/ProductionFilters";
import ProductionSummary from "../features/production/ProductionSummary";
import ProductionGrid from "../features/production/ProductionGrid";
import PaginationStandalone from "../components/common/PaginationStandalone";

import ProductionDetailModal from "../features/production/ProductionDetailModal";
import ProductionCreateModal from "../features/production/ProductionCreateModal";

import { getProductionTasks } from "../services/productionService";

export default function ProductionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("Tất cả");
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 400);
  const [page, setPage] = useState(1);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const limit = 8;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const statusQuery =
        status === "Tất cả"
          ? ""
          : status === "Đang sản xuất"
          ? "in-progress"
          : status === "Hoàn thành"
          ? "completed"
          : "pending";

      const data = await getProductionTasks(statusQuery, debouncedKeyword);

      setTasks(data.data || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, page, debouncedKeyword]);

  // ======================
  // DETAIL
  // ======================
  const handleOpenDetail = (item) => {
    setSelectedTask(item);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
    setIsDetailOpen(false);
  };

  // ======================
  // CREATE
  // ======================
  const handleCreateSuccess = () => {
    setIsCreateOpen(false);
    fetchTasks(); // reload list
  };

  const start = (page - 1) * limit;
  const sortedTasks = useMemo(() => {
    const statusOrder = {
      "pending": 1,
      "in-progress": 2,
      "completed": 3,
    };
    return [...tasks].sort((a, b) => {
      const orderA = statusOrder[a.status] || 99;
      const orderB = statusOrder[b.status] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks]);

  const paginatedTasks = sortedTasks.slice(start, start + limit);

  // Remove this block:
  // if (loading) {
  //   return <div className="p-10 text-center">Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-background">

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="lg:ml-[280px] p-6">

        <ProductionHeader
          onCreate={() => setIsCreateOpen(true)}
          onSearch={setKeyword}
        />

        <ProductionFilters onStatusChange={setStatus} />

        <ProductionSummary tasks={tasks} />

        <ProductionGrid
          tasks={paginatedTasks}
          onDetail={handleOpenDetail}
        />

        <PaginationStandalone
          currentPage={page}
          totalPages={Math.ceil(tasks.length / limit)}
          onChangePage={setPage}
          totalItems={tasks.length}
          perPage={limit}
          showInfo={true}
        />

      </main>

      {/* DETAIL */}
      <ProductionDetailModal
        isOpen={isDetailOpen}
        item={selectedTask}
        onClose={handleCloseDetail}
        onUpdated={fetchTasks}
      />

      {/* CREATE */}
      <ProductionCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreateSuccess}
      />

    </div>
  );
}