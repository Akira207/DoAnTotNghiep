import { Link, useLocation } from "react-router-dom";
import { sidebarMenu } from "../../config/sidebarMenu";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg text-white">
          <span className="material-symbols-outlined block">chair</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-primary">
          Nội Thất Pro
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {sidebarMenu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={
                isActive
                  ? "flex items-center gap-3 px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg"
                  : "flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              }
            >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-slate-200">
            <img
              alt="Admin Profile"
              className="rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvs35aR0Bgi6qymhdBW1J8bFoApr5t0XXEHTOnJZtKvoP3we3xz0oKJV5dy1Cul1MHvJXejCtjVISp1HRwhSJZkkbvZOSbgbAsUnkqitgtZBKQUawQDMTVff_QXwrrGGNsVsUIOFS3NAs3uhg0Ux2NzbIWXBCybEq9fWaPtNZwJudpLA0NFs5P7jzbTAZ7tA5nu70d2fOOqB6biH3PdpUZWvvsxFcmMBIld0s1e1XAxLyM_VVvsMKZ4Tj9y8a53M_NO5P1JF1rWr7w"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Quản lý</p>
            <p className="text-xs text-slate-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </aside>
  );
}