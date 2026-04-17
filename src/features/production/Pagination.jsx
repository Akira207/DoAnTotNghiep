import { useMemo } from "react";

const Pagination = ({ page = 1, total = 0, limit = 10, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handleChange = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange && onPageChange(p);
  };

  // ✅ Tạo danh sách page KHÔNG trùng
  const pages = useMemo(() => {
    const result = [];
    const add = (val) => {
      if (!result.includes(val)) result.push(val);
    };

    add(1);

    if (page > 3) add("start-ellipsis");

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) add(i);
    }

    if (page < totalPages - 2) add("end-ellipsis");

    if (totalPages > 1) add(totalPages);

    return result;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-5 rounded-2xl border border-slate-100">
      
      {/* Text */}
      <span className="text-sm font-medium text-slate-500">
        Hiển thị {end - start + 1} trên {total} kết quả
      </span>

      {/* Pagination */}
      <div className="flex gap-1.5">
        
        {/* Prev */}
        <button
          onClick={() => handleChange(page - 1)}
          disabled={page === 1}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition
            ${
              page === 1
                ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
        >
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </button>

        {/* Pages */}
        {pages.map((p, index) => {
          if (p === "start-ellipsis" || p === "end-ellipsis") {
            return (
              <span
                key={p + index}
                className="w-9 h-9 flex items-center justify-center text-slate-400"
              >
                ...
              </span>
            );
          }

          const isActive = p === page;

          return (
            <button
              key={p}
              onClick={() => handleChange(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition
                ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-blue-100"
                    : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next */}
        <button
          onClick={() => handleChange(page + 1)}
          disabled={page === totalPages}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition
            ${
              page === totalPages
                ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            }`}
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>

      </div>
    </div>
  );
};

export default Pagination;