import { deleteCustomer } from "../../services/customerService";

export default function CustomerTable({
  customers = [],
  page = 1,
  totalPages = 1,
  onChangePage = () => {},
}) {
  // delete
  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      window.location.reload(); // giữ behavior đơn giản
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <section className="bg-surface-container-lowest rounded-lg shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden">
      
      {/* Header (GIỮ NGUYÊN UI) */}
      <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg font-bold text-on-surface">
          Danh sách đối tác & khách hàng
        </h2>

        {/* ⚠️ giữ UI nhưng disable search nội bộ */}
        <div className="flex w-full md:w-auto">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>

            <input
              disabled
              placeholder="Tìm kiếm khách hàng..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-high rounded-lg outline-none text-sm opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-slate-500 text-[10px] uppercase tracking-widest font-bold">
              <th className="px-6 py-4">STT</th>
              <th className="px-6 py-4">Tên khách hàng</th>
              <th className="px-6 py-4">Liên hệ</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Địa chỉ</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {customers.map((c, index) => (
              <tr
                key={c._id || c.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-400">
                  {String((page - 1) * 10 + index + 1).padStart(2, "0")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        className="w-8 h-8 rounded-full object-cover"
                        alt=""
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-[10px] font-bold">
                        {c.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="font-bold text-sm text-on-surface">
                      {c.name}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {c.phone}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase whitespace-nowrap ${
                      c.type === "agency"
                        ? "bg-orange-50 text-secondary"
                        : "bg-blue-50 text-primary"
                    }`}
                  >
                    {c.type === "agency" ? "Đại lý" : "Khách lẻ"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate">
                  {c.address}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (GIỮ NGUYÊN UI) */}
      <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center text-xs text-slate-500 font-medium">
        <p>
          Trang {page} / {totalPages}
        </p>

        <div className="flex gap-1">
          <button
            onClick={() => page > 1 && onChangePage(page - 1)}
            className="px-2 py-1 rounded hover:bg-slate-100"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 3)
            .map((p) => (
              <button
                key={p}
                onClick={() => onChangePage(p)}
                className={`px-2 py-1 rounded ${
                  p === page
                    ? "bg-white border border-slate-200"
                    : "hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}

          {totalPages > 3 && <span className="px-1 self-end">...</span>}

          {totalPages > 3 && (
            <button
              onClick={() => onChangePage(totalPages)}
              className="px-2 py-1 rounded hover:bg-slate-100"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() =>
              page < totalPages && onChangePage(page + 1)
            }
            className="px-2 py-1 rounded hover:bg-slate-100"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}