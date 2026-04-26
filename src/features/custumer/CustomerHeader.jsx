export default function AccessoryHeader({ onOpenForm, onSearch }) {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
            <span className="hover:text-primary transition-colors cursor-pointer">
              PLT Management
            </span>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
            <span className="text-primary font-bold">Danh mục Phụ Kiện</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline mb-1">
            Danh mục Phụ Kiện
          </h1>

          <p className="text-on-surface-variant text-sm">
            Quản lý danh sách phụ kiện
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          
          {/* ✅ chỉ thêm onChange */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              search
            </span>

            <input
              onChange={(e) => onSearch?.(e.target.value)}
              type="text"
              placeholder="Tìm kiếm phụ kiện..."
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-surface-container-high border-none rounded-sm text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          {/* ✅ giữ UI */}
          <button 
            onClick={onOpenForm}
            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-sm font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Thêm phụ kiện mới
          </button>
        </div>
      </div>
    </div>
  );
}