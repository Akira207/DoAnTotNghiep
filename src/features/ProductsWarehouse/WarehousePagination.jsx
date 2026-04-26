const WarehousePagination = ({
  page,
  total,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const handleChange = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange?.(p);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Prev */}
      <button
        onClick={() => handleChange(page - 1)}
        disabled={page === 1}
        className="p-1 rounded hover:bg-surface-container transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Pages (giữ UI đơn giản giống bạn) */}
      {Array.from({ length: totalPages }).slice(0, 3).map((_, idx) => {
        const p = idx + 1;

        return (
          <button
            key={p}
            onClick={() => handleChange(p)}
            className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
              p === page
                ? "bg-primary text-white font-bold"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {p}
          </button>
        );
      })}

      {totalPages > 3 && (
        <span className="px-2 text-on-surface-variant">...</span>
      )}

      {/* Next */}
      <button
        onClick={() => handleChange(page + 1)}
        disabled={page === totalPages}
        className="p-1 rounded hover:bg-surface-container transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default WarehousePagination;