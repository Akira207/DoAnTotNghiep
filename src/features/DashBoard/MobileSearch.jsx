export default function MobileSearch() {
  return (
    <div className="md:hidden px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          search
        </span>
        <input
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
          placeholder="Tìm kiếm đơn hàng, khách hàng..."
          type="text"
        />
      </div>
    </div>
  );
}