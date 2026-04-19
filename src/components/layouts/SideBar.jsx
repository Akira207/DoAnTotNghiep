import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { name: "Tổng quan", icon: "dashboard", path: "/dashboard", roles: ["admin", "accountant"] },
  { name: "Đơn hàng", icon: "receipt_long", path: "/orders", roles: ["admin", "accountant"] },
  { name: "Sản xuất", icon: "factory", path: "/production", roles: ["admin", "worker", "accountant"] },

  {
    name: "Kho hàng",
    icon: "inventory_2",
    roles: ["admin", "accountant"],
    children: [
      { name: "Kho thành phẩm", path: "/warehouse/products" },
      { name: "Lịch sử kho vật liệu", path: "/warehouse/materials-history" },
    ],
  },

  { name: "Khách hàng", icon: "groups", path: "/customers", roles: ["admin", "accountant"] },
  { name: "Tài chính", icon: "payments", path: "/finance", roles: ["admin", "accountant"] },
  { name: "Nhân sự", icon: "engineering", path: "/users", roles: ["admin"] },
  { name: "Báo cáo", icon: "analytics", path: "/reports", roles: ["admin", "accountant"] },

  {
    name: "Danh mục",
    icon: "category",
    roles: ["admin"],
    children: [
      { name: "Sản phẩm", path: "/categories/products" },
      { name: "Phụ kiện", path: "/categories/accessories" },
    ],
  },
];

const SideBar = ({ isOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // =========================
  // ROLE CHECK FUNCTION
  // =========================
  const hasAccess = (item, role) => {
    if (!item.roles) return true;
    return item.roles.includes(role);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/warehouse")) {
      setOpenMenu("Kho hàng");
    }
  }, [location.pathname]);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
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

        {/* ================= TOP ================= */}
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

          {/* MENU */}
          <nav className="space-y-1">

            {menu
              .filter((item) => hasAccess(item, user?.role))
              .map((item) => {

                // ================= PARENT WITH CHILDREN =================
                if (item.children) {
                  const isOpenMenu = openMenu === item.name;

                  const filteredChildren = item.children.filter((child) =>
                    hasAccess(child, user?.role)
                  );

                  if (filteredChildren.length === 0) return null;

                  const isChildActive = filteredChildren.some((child) =>
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

                          {filteredChildren.map((child) => {
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

                // ================= SINGLE ITEM =================
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

        {/* ================= BOTTOM ================= */}
        <div>
          <div className="p-3 rounded-xl bg-white shadow-sm flex items-center justify-between gap-3">

            {/* User */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="min-w-0">
                <p className="text-xs font-bold truncate">
                  {user?.username || "Guest"}
                </p>
                <p className="text-[10px] text-gray-500">
                  {user?.role || ""}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
              title="Đăng xuất"
            >
              <span className="material-symbols-outlined">
                logout
              </span>
            </button>

          </div>
        </div>

      </div>
    </aside>
  );
};

export default SideBar;