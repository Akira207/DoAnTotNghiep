import { useState } from "react";
import PaginationTable from "../../components/common/PaginationTable";

export default function UsersTable({
  users = [],
  loading,
  onEdit,
  onDelete,
  onView,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* SEARCH */}
      <div className="p-6 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>

          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-high rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                SĐT
              </th>
              <th className="px-6 py-4 text-xs font-bold text-right">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedUsers.map((u, index) => (
                <tr
                  key={u._id}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => onView?.(u)}
                >
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">
                        {u.name?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-xs text-on-surface-variant">
                          {u.position || "Nhân sự"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm font-medium bg-slate-100 px-2 py-1 rounded text-primary">
                      {u.email}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        u.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : u.role === "accountant"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{u.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(u);
                      }}
                      className="text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(u._id);
                      }}
                      className="text-on-surface-variant hover:text-error transition-colors ml-4"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationTable
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
