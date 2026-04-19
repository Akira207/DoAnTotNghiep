import { useState, useEffect } from "react";

import Sidebar from "../../components/layouts/SideBar";
import MobileHeader from "../../components/layouts/MobileHeader";
import WarehouseHeader from "../../features/productsWarehouse/WarehouseHeader";
import WarehouseStats from "../../features/productsWarehouse/WarehouseStats";
import WarehouseTable from "../../features/productsWarehouse/WarehouseTable";
import WarehouseBottomCards from "../../features/productsWarehouse/WarehouseBottomCards";

export default function ProductsWarehousePage() {
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

      <main className="p-4 md:p-8 lg:ml-[280px]">
        {/* <!-- Dashboard Content --> */}
        <div className="space-y-8 max-w-[1600px] mx-auto w-full pb-12">
          {/* warehouse header */}
          <WarehouseHeader />

          {/* warehouse stats */}
          <WarehouseStats />

            {/* warehouse table */}
            <WarehouseTable />

            {/* warehouse bottom cards */}
            <WarehouseBottomCards />
        </div>
      </main>
    </div>
  );
}
