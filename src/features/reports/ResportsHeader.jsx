export default function OrderDetailHeader({ onExport }) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">

      {/* LEFT */}
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
          <span className="hover:text-primary transition-colors cursor-pointer">
            PLT Management
          </span>

          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>

          <span className="hover:text-primary transition-colors cursor-pointer">
            Báo Cáo
          </span>
        </nav>

        {/* Title */}
        <h2 className="text-3xl font-black tracking-tighter text-primary mb-2">
          Báo cáo thống kê
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3">
        <button
          onClick={onExport}
          className="bg-surface-container-low text-primary px-5 py-2.5 rounded font-semibold flex items-center gap-2 hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            file_download
          </span>
          Xuất báo cáo
        </button>
      </div>
    </div>
  );
}