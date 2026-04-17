import { useState, useEffect } from "react";

import Sidebar from "../../components/layouts/SideBar";
import MobileHeader from "../../components/layouts/MobileHeader";
import MaterialsHistoryHeader from "../../features/masterialsHistory/MaterialsHistoryHeader";
import MaterialsHistoryStats from "../../features/masterialsHistory/MaterialsHistoryStats";
import MaterialsHistoryActions from "../../features/masterialsHistory/MaterialsHistoryActions";
import MaterialsHistoryTable from "../../features/masterialsHistory/MaterialsHistoryTable";
import MaterialsReportBanner from "../../features/masterialsHistory/MaterialsReportBanner";

export default function MaterialsHistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition
        ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      {/* Main content */}
      <main className="p-4 md:p-8 lg:ml-[280px]">
        {/* <!-- Dashboard Content --> */}
        <div className="max-w-7xl w-full mx-auto">
            {/* Materials History header */}
            <MaterialsHistoryHeader />

            {/* Materials History stats */}
            <MaterialsHistoryStats />

            {/* Materials History actions */}
            <MaterialsHistoryActions />

            {/* Materials History table */}
            <MaterialsHistoryTable />

            {/* Materials Report banner */}
            <MaterialsReportBanner />
        </div>
      </main>
    </div>
  );
}
