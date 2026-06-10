import React from "react";

const PaginationStandalone = ({
  currentPage,
  totalPages,
  onChangePage,
  totalItems = 0,
  perPage = 10,
  showInfo = false,
  unit = "mục"
}) => {
  if (totalPages <= 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {showInfo && (
        <p className="hidden text-sm text-on-surface-variant sm:block">
          Hiển thị{" "}
          <span className="font-bold text-on-surface">
            {start} - {end}
          </span>{" "}
          trong số{" "}
          <span className="font-bold text-on-surface">{totalItems}</span>{" "}
          {unit}
        </p>
      )}

      <div className="ml-auto flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 transition-colors hover:bg-white disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
        </button>

        {/* Pages */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onChangePage(page)}
            className={`flex h-10 w-10 items-center justify-center rounded text-sm font-bold transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "border border-slate-200 hover:bg-white"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 transition-colors hover:bg-white disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};

export default PaginationStandalone;
