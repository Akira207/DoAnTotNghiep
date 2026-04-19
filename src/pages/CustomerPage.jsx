import { useState, useEffect } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import CustomerHeader from "../features/custumer/CustomerHeader";
import CustomerStats from "../features/custumer/CustomerStats";
import CustomerTable from "../features/custumer/CustomerTable";
import CustomerActivity from "../features/custumer/CustomerActivity";
import CustomerAnalysis from "../features/custumer/CustomerAnalysis";

export default function CustomerPage() {
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

      {/* Main content */}
      <main className="p-4 md:p-8 lg:ml-[280px] space-y-6">
        {/* Header */}
        <CustomerHeader />

        {/* Stats */}
        <CustomerStats />

        {/* Table */}
        <CustomerTable />

        {/* Activity & Analysis */}
        <div className="grid lg:grid-cols-12 gap-6">
          <CustomerActivity />
          <CustomerAnalysis />
        </div>
      </main>
    </div>
  );
}
