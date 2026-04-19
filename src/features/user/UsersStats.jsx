import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersStats() {
  const [roles, setRoles] = useState([
    {
      label: "Quản trị viên",
      role: "admin",
      count: 0,
      box: "bg-primary-container border-primary",
      text: "text-primary",
    },
    {
      label: "Kế toán",
      role: "accountant",
      count: 0,
      box: "bg-secondary-container border-secondary",
      text: "text-secondary",
    },
    {
      label: "Công nhân",
      role: "worker",
      count: 0,
      box: "bg-tertiary-container border-tertiary",
      text: "text-tertiary",
    },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");

        // API của bạn trả: { success: true, data: users }
        const users = res.data.data || [];

        const adminCount = users.filter((u) => u.role === "admin").length;
        const accountantCount = users.filter(
          (u) => u.role === "accountant"
        ).length;
        const workerCount = users.filter((u) => u.role === "worker").length;

        setRoles([
          {
            label: "Quản trị viên",
            role: "admin",
            count: adminCount,
            box: "bg-primary-container border-primary",
            text: "text-primary",
          },
          {
            label: "Kế toán",
            role: "accountant",
            count: accountantCount,
            box: "bg-secondary-container border-secondary",
            text: "text-secondary",
          },
          {
            label: "Công nhân",
            role: "worker",
            count: workerCount,
            box: "bg-tertiary-container border-tertiary",
            text: "text-tertiary",
          },
        ]);

        setTotal(users.length);
      } catch (err) {
        console.error("Fetch users stats error:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

      {/* ROLE STATS */}
      <div className="md:col-span-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Thống kê vai trò</h3>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
            more_horiz
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((r, i) => (
            <div key={i} className={`p-4 rounded-lg border-l-4 ${r.box}`}>
              <p
                className={`text-xs font-bold uppercase tracking-wider mb-1 ${r.text}`}
              >
                {r.label}
              </p>

              <p className="text-2xl font-black">{r.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL */}
      <div className="md:col-span-4 bg-primary text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-on-primary/70 text-sm font-medium mb-1">
            Tổng nhân sự
          </p>

          <h3 className="text-4xl font-black mb-4">{total}</h3>

          <p className="text-xs text-on-primary/80 leading-relaxed max-w-[180px]">
            Tăng trưởng theo thời gian thực từ hệ thống.
          </p>
        </div>

        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/10 group-hover:scale-110 transition-transform duration-500">
          engineering
        </span>
      </div>
    </div>
  );
}