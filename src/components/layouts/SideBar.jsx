import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const menu = [
  { name: "Tổng quan", icon: "dashboard", path: "/dashboard" },
  { name: "Đơn hàng", icon: "receipt_long", path: "/orders" },
  { name: "Sản xuất", icon: "factory", path: "/production" },

  {
    name: "Kho hàng",
    icon: "inventory_2",
    children: [
      { name: "Kho thành phẩm", path: "/warehouse/products" },
      { name: "Lịch sử kho vật liệu", path: "/warehouse/materials-history" },
    ],
  },

  { name: "Khách hàng", icon: "groups", path: "/customers" },
  { name: "Tài chính", icon: "payments", path: "/finance" },
  { name: "Nhân sự", icon: "engineering", path: "/staff" },
  { name: "Báo cáo", icon: "analytics", path: "/reports" },
];

const SideBar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // 👉 Tự mở submenu khi vào route con
  useEffect(() => {
    if (location.pathname.startsWith("/warehouse")) {
      setOpenMenu("Kho hàng");
    }
  }, [location.pathname]);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 w-[280px] bg-slate-50 border-r z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="flex flex-col justify-between h-full py-6 px-4">
        
        {/* Top */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="bg-primary p-2 rounded-xl">
              <span className="material-symbols-outlined text-white">
                factory
              </span>
            </div>
            <h1 className="text-xl font-black text-blue-700">
              PLT Management
            </h1>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menu.map((item) => {
              // 👉 MENU CÓ SUB
              if (item.children) {
                const isOpenMenu = openMenu === item.name;

                const isChildActive = item.children.some((child) =>
                  location.pathname.startsWith(child.path)
                );

                return (
                  <div key={item.name}>
                    
                    {/* Parent */}
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition
                        ${
                          isChildActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
                        {item.name}
                      </div>

                      <span className="material-symbols-outlined text-sm">
                        {isOpenMenu ? "expand_less" : "expand_more"}
                      </span>
                    </button>

                    {/* Children */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpenMenu ? "max-h-40 mt-1" : "max-h-0"
                      }`}
                    >
                      <div className="ml-8 space-y-1">
                        {item.children.map((child) => {
                          const isActive =
                            location.pathname === child.path;

                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={toggleSidebar}
                              className={`block px-4 py-2 rounded-lg text-sm transition
                                ${
                                  isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              // 👉 MENU THƯỜNG
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleSidebar}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  <span className="material-symbols-outlined">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div>
          <div className="p-3 rounded-xl bg-white shadow-sm flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-xs font-bold">Admin</p>
              <p className="text-[10px] text-gray-500">Quản lý</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;