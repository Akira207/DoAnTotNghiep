export default function Header() {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-20">

      <div className="flex items-center gap-3 md:hidden">
        <div className="p-1.5 bg-primary rounded text-white">
          <span className="material-symbols-outlined text-xl block">chair</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-primary">
          Nội Thất Pro
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl">
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

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>

    </header>
  );
}