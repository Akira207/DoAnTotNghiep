export default function AccessoryPagination() {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center space-x-1">
        
        {/* Prev */}
        <button className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-400 hover:bg-white hover:text-primary transition-all">
          <span className="material-symbols-outlined">
            chevron_left
          </span>
        </button>

        {/* Page 1 (active) */}
        <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white font-bold shadow-md shadow-blue-200">
          1
        </button>

        {/* Page 2 */}
        <button className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-500 hover:bg-white hover:text-primary transition-all">
          2
        </button>

        {/* Page 3 */}
        <button className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-500 hover:bg-white hover:text-primary transition-all">
          3
        </button>

        {/* Ellipsis */}
        <span className="px-2 text-slate-300">...</span>

        {/* Last page */}
        <button className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-500 hover:bg-white hover:text-primary transition-all">
          12
        </button>

        {/* Next */}
        <button className="w-10 h-10 flex items-center justify-center rounded-sm text-slate-400 hover:bg-white hover:text-primary transition-all">
          <span className="material-symbols-outlined">
            chevron_right
          </span>
        </button>

      </nav>
    </div>
  );
}