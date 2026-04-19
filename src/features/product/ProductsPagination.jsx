import { useState } from "react";

export default function ProductsPagination({
  total = 1284,
  perPage = 6,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(total / perPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  // tạo list page (basic)
  const pages = [1, 2, 3, "...", totalPages];

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-8">
      
      {/* info */}
      <div className="text-sm text-on-surface-variant">
        Hiển thị{" "}
        <span className="font-bold text-on-surface">
          {start} - {end}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-bold text-on-surface">{total}</span> sản phẩm
      </div>

      {/* controls */}
      <div className="flex items-center gap-1">
        
        {/* prev */}
        <button
          onClick={handlePrev}
          className="p-2 text-outline hover:text-primary hover:bg-blue-50 transition-colors rounded-sm disabled:opacity-40"
          disabled={currentPage === 1}
        >
          <span className="material-symbols-outlined">
            chevron_left
          </span>
        </button>

        {/* pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-outline">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => setCurrentPage(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-sm text-sm font-medium
                ${
                  currentPage === p
                    ? "bg-primary text-white font-bold"
                    : "hover:bg-slate-100"
                }`}
            >
              {p}
            </button>
          )
        )}

        {/* next */}
        <button
          onClick={handleNext}
          className="p-2 text-outline hover:text-primary hover:bg-blue-50 transition-colors rounded-sm disabled:opacity-40"
          disabled={currentPage === totalPages}
        >
          <span className="material-symbols-outlined">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}