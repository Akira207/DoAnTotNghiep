export default function OrderPagination({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
}) {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-between">

      {/* Info */}
      <p className="hidden text-sm text-on-surface-variant sm:block">
        Hiển thị{" "}
        <span className="font-bold text-slate-900">
          {startItem}-{endItem}
        </span>{" "}
        trong số{" "}
        <span className="font-bold text-slate-900">
          {totalItems}
        </span>{" "}
        đơn hàng
      </p>

      {/* Pagination */}
      <div className="ml-auto flex items-center gap-1">

        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 transition-colors hover:bg-white disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
        </button>

        {/* Pages */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-10 w-10 items-center justify-center rounded text-sm font-bold transition-colors
              ${
                p === page
                  ? "bg-primary text-on-primary"
                  : "border border-slate-200 hover:bg-white"
              }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 transition-colors hover:bg-white disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}