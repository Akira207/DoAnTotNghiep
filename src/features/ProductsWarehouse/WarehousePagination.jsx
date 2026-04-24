import { useMemo } from "react";

export default function WarehousePagination({
  page = 1,
  total = 0,
  limit = 5,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / limit);

  const handleChange = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange && onPageChange(p);
  };

  const pages = useMemo(() => {
    const result = [];
    const add = (val) => {
      if (!result.includes(val)) result.push(val);
    };

    add(1);

    if (page > 3) add("start");

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) add(i);
    }

    if (page < totalPages - 2) add("end");

    if (totalPages > 1) add(totalPages);

    return result;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-surface-container">
      {/* TEXT */}
      <p className="text-xs text-on-surface-variant font-medium">
        Hiển thị {start} - {end} trên {total} sản phẩm
      </p>

      {/* BUTTON */}
      <div className="flex items-center gap-1">
        {/* PREV */}
        <button
          onClick={() => handleChange(page - 1)}
          disabled={page === 1}
          className="p-1 rounded hover:bg-surface-container disabled:opacity-50"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {/* PAGES */}
        {pages.map((p, index) => {
          if (p === "start" || p === "end") {
            return (
              <span key={index} className="px-2 text-on-surface-variant">
                ...
              </span>
            );
          }

          const isActive = p === page;

          return (
            <button
              key={p}
              onClick={() => handleChange(p)}
              className={`w-8 h-8 text-xs font-bold rounded ${
                isActive
                  ? "bg-primary text-white"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() => handleChange(page + 1)}
          disabled={page === totalPages}
          className="p-1 rounded hover:bg-surface-container disabled:opacity-50"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}