export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

      {/* Card 1 */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shadow-sm">
        <div className="flex flex-col flex-1">
          <span className="text-slate-500 text-[10px] md:text-sm font-medium uppercase md:capitalize tracking-wider md:tracking-normal">
            Tổng đơn hàng
          </span>
          <h3 className="text-xl md:text-2xl font-bold mt-1">1,250</h3>
          <p className="text-emerald-600 text-[10px] md:text-xs font-bold md:font-semibold flex items-center gap-0.5 md:gap-1 mt-1">
            <span className="material-symbols-outlined text-[10px] md:text-xs">
              trending_up
            </span>
            +12% tháng này
          </p>
        </div>
        <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-lg text-xl">
          shopping_basket
        </span>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shadow-sm">
        <div className="flex flex-col flex-1">
          <span className="text-slate-500 text-[10px] md:text-sm font-medium uppercase md:capitalize tracking-wider md:tracking-normal">
            Doanh thu tháng
          </span>
          <h3 className="text-xl md:text-2xl font-bold mt-1">
            450.000.000₫
          </h3>
          <p className="text-rose-600 text-[10px] md:text-xs font-bold md:font-semibold flex items-center gap-0.5 md:gap-1 mt-1">
            <span className="material-symbols-outlined text-[10px] md:text-xs">
              trending_down
            </span>
            -5% dự kiến
          </p>
        </div>
        <span className="material-symbols-outlined text-emerald-600 bg-emerald-50 p-2.5 rounded-lg text-xl">
          payments
        </span>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shadow-sm">
        <div className="flex flex-col flex-1">
          <span className="text-slate-500 text-[10px] md:text-sm font-medium uppercase md:capitalize tracking-wider md:tracking-normal">
            Hiệu suất sản xuất
          </span>
          <h3 className="text-xl md:text-2xl font-bold mt-1">92%</h3>
          <p className="text-emerald-600 text-[10px] md:text-xs font-bold md:font-semibold flex items-center gap-0.5 md:gap-1 mt-1">
            <span className="material-symbols-outlined text-[10px] md:text-xs">
              trending_up
            </span>
            +3% tối ưu
          </p>
        </div>
        <span className="material-symbols-outlined text-amber-600 bg-amber-50 p-2.5 rounded-lg text-xl">
          bolt
        </span>
      </div>

      {/* Card 4 */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shadow-sm">
        <div className="flex flex-col flex-1">
          <span className="text-slate-500 text-[10px] md:text-sm font-medium uppercase md:capitalize tracking-wider md:tracking-normal">
            Tác vụ hoạt động
          </span>
          <h3 className="text-xl md:text-2xl font-bold mt-1">18</h3>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold md:font-semibold mt-1">
            Chờ phân bổ: 4
          </p>
        </div>
        <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2.5 rounded-lg text-xl">
          assignment
        </span>
      </div>

    </div>
  );
}