import React from "react";

export default function MaterialsHistoryTable({
  items = [],
  page = 1,
  totalPages = 1,
  setPage = () => {},
  onEdit,
}) {
  if (!items.length) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 text-center border border-slate-100">
        <p className="text-on-surface-variant">Chưa có dữ liệu nhập kho</p>
      </div>
    );
  }

  const getTypeClass = (type) => {
    if (!type) return "bg-surface-container text-slate-500";
    const lower = type.toLowerCase();
    if (lower.includes("gỗ")) return "bg-surface-container text-[#007BFF]";
    if (lower.includes("phụ") || lower.includes("kiện"))
      return "bg-secondary-container text-on-secondary-container";
    if (lower.includes("sơn") || lower.includes("hóa chất"))
      return "bg-tertiary-container text-on-tertiary-container";
    return "bg-surface-container text-slate-500";
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Thời gian nhập
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Tên vật liệu
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Loại vật liệu
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                Số lượng
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Đơn vị
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                Đơn giá
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Nhà cung cấp
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                Thành tiền
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">
                Tác vụ
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <tr
                key={item._id || index}
                className="hover:bg-surface-bright transition-colors group"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {new Date(item.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm font-semibold text-on-surface">
                    {item.materialName || "Vật liệu"}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 ${getTypeClass(
                      item.materialType,
                    )} text-[10px] font-black rounded tracking-wide uppercase`}
                  >
                    {item.materialType || "Khác"}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm font-bold text-on-surface">
                    {item.quantity || 0}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm text-slate-500 italic">
                    {item.unit || "kg"}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm text-slate-600">
                    {(item.price || 0).toLocaleString("vi-VN")}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm font-medium text-on-surface">
                    {item.supplier || "N/A"}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm font-black text-primary">
                    {(
                      (item.price || 0) * (item.quantity || 0)
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  <button
                    onClick={() => onEdit && onEdit(item)}
                    className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - FIX CHUẨN BACKEND */}
      <div className="px-6 py-4 bg-white flex items-center justify-between border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Trang {page} / {totalPages}
        </p>

        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-base">
              chevron_left
            </span>
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${
                p === page
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}