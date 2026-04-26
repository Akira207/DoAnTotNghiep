import React from "react";

const ProductionPagination = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-surface-container">
      <p className="text-xs text-on-surface-variant font-medium">
        Hiển thị trang {page} trên {totalPages} (Tổng {total} lệnh)
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high disabled:opacity-50 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                page === i + 1
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high disabled:opacity-50 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default ProductionPagination;
