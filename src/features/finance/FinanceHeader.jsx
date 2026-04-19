export default function FinanceHeader() {
  return (
    <div className="mb-8">

      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
        <span className="hover:text-primary transition-colors cursor-pointer">
          PLT Management
        </span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-primary font-bold">Quản lý Tài chính</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">
            Quản lý Tài chính
          </h2>

          <p className="text-on-surface-variant mt-1">
            Theo dõi dòng tiền và hiệu quả kinh doanh xưởng nội thất.
          </p>
        </div>

        {/* Right actions */}
        <div className="flex gap-2">

          <button
            className="px-5 py-2.5 bg-white text-on-surface-variant font-semibold flex items-center gap-2 rounded-lg border border-outline-variant hover:bg-slate-50 transition-colors"
            onClick={() => console.log("Export report")}
          >
            <span className="material-symbols-outlined">
              download
            </span>
            Xuất báo cáo
          </button>

          <button
            className="px-5 py-2.5 bg-primary text-on-primary font-semibold flex items-center gap-2 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dim transition-colors"
            onClick={() => console.log("Create expense")}
          >
            <span className="material-symbols-outlined">
              add
            </span>
            Lập phiếu chi
          </button>

        </div>
      </div>
    </div>
  );
}