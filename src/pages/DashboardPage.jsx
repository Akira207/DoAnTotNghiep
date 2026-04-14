import Sidebar from "../features/DashBoard/Sidebar";
import Header from "../features/DashBoard/Header";
import MobileSearch from "../features/DashBoard/MobileSearch";
import StatsGrid from "../features/DashBoard/StatsGrid";
import ChartSection from "../features/DashBoard/ChartSection";
import ProjectsSection from "../features/DashBoard/ProjectsSection";
import OrdersSection from "../features/DashBoard/OrdersSection";
import BottomNav from "../features/DashBoard/BottomNav";

export default function DashboardPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">

        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden relative">
          <Header />
          <div className="flex-1 overflow-y-auto pb-20 md:pb-8">
            
            <MobileSearch />

            <div className="p-4 md:p-8 space-y-6 md:space-y-8">
              <StatsGrid />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <ChartSection />
                <ProjectsSection />
              </div>

              <OrdersSection />
            </div>
          </div>

          <BottomNav />
        </main>

      </div>
    </div>
  );
}