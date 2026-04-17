import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import DashboardHeader from "../features/dashBoard/DashBoardHeader";
import KPISection from "../features/dashBoard/KPISection";
import ChartSection from "../features/dashBoard/ChartSection";
import StatusCard from "../features/dashBoard/StatusCard";
import NewOrdersTable from "../features/dashBoard/NewOrdersTable";

export default function DashboardPage() {
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
        ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile Header */}
      <MobileHeader onOpenSidebar={toggleSidebar} />

      {/* Main */}
      <main className="md:ml-[280px] p-6 lg:p-10 space-y-10">
        <DashboardHeader />
        <KPISection />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ChartSection />
          <StatusCard />
        </section>

          <section className="bg-white rounded shadow-sm overflow-hidden">
            <NewOrdersTable />
          </section>
        
      </main>
    </div>
  );
}
