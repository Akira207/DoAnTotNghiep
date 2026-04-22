export default function ProductsPagination({
  total = 0,
  perPage = 8,
  currentPage = 1,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / perPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100">
      
      {/* Info */}
      <div className="text-sm text-on-surface-variant">
        Hiển thị{" "}
        <span className="font-bold text-on-surface">
          {start} - {end}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-bold text-on-surface">{total}</span> sản phẩm
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-2 rounded hover:bg-slate-100 disabled:opacity-40"
        >
          <span className="material-symbols-outlined">
            chevron_left
          </span>
        </button>

        {/* Page info */}
        <div className="px-4 py-2 text-sm font-bold">
          {currentPage} / {totalPages || 1}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 rounded hover:bg-slate-100 disabled:opacity-40"
        >
          <span className="material-symbols-outlined">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}