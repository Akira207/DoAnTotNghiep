import React from "react";

const PaginationTable = ({ currentPage, totalPages, onChangePage }) => {
  return (
    <div className="px-6 py-4 border-t border-surface-container flex items-center justify-between bg-slate-50/50 rounded-b-lg">
      <p className="text-xs text-on-surface-variant font-medium">
        Trang {currentPage} / {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-xs font-bold rounded-sm border border-surface-container bg-white disabled:opacity-50 hover:bg-slate-100 transition-colors"
        >
          Trước
        </button>
        <button
          onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-xs font-bold rounded-sm border border-surface-container bg-white disabled:opacity-50 hover:bg-slate-100 transition-colors"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
