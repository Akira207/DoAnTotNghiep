export default function Header() {
  return (
    <header className="w-full px-4 md:px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
      <div className="flex items-center gap-2">
        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-xl">
            chair
          </span>
        </div>
        <h1 className="text-slate-900 dark:text-slate-100 text-lg md:text-xl font-bold tracking-tight">
          Nội Thất <span className="text-primary">Pro</span>
        </h1>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <a
          className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
          href="#"
        >
          Hỗ trợ
        </a>
        <a
          className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
          href="#"
        >
          Hướng dẫn
        </a>
      </div>
    </header>
  );
}
