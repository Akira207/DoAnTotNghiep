export default function OrderDetailHeader({ order }) {
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
            Đơn hàng
          </span>

          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>

          <span className="text-primary font-bold">
            Chi tiết đơn hàng #{order?.id || "PLT-2401"}
          </span>
        </nav>

        {/* Title */}
        <h2 className="text-3xl font-black tracking-tighter text-primary mb-2">
          Đơn hàng #{order?.id || "PLT-2401"}
        </h2>

        {/* Status */}
        <div className="flex items-center gap-4 text-sm font-medium">

          <div className="flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-lg">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Đã đặt cọc
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-error-container/10 text-error rounded-lg">
            <span className="w-2 h-2 rounded-full bg-error"></span>
            Chưa hoàn thành
          </div>

        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex gap-2">

        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface font-bold rounded hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined text-lg">
            print
          </span>
          In đơn hàng
        </button>

        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded shadow-lg shadow-primary/20 active:opacity-80 transition-opacity">
          Cập nhật trạng thái
        </button>

      </div>

    </div>
  );
}