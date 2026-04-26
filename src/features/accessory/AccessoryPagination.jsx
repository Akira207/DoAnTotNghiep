export default function AccessoryPagination({
  page,
  totalPages,
  onChange,
}) {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center space-x-1">
        
        {/* Prev */}
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-400 hover:bg-white hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined">
            chevron_left
          </span>
        </button>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-10 h-10 flex items-center justify-center rounded-sm
              ${
                p === page
                  ? "bg-primary text-white font-bold"
                  : "text-slate-500 hover:bg-white hover:text-primary"
              }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-400 hover:bg-white hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined">
            chevron_right
          </span>
        </button>
      </nav>
    </div>
  );
}