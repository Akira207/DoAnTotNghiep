export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex justify-around items-center z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">

      <a className="flex flex-col items-center gap-1 text-primary p-2" href="#">
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px] font-bold">Tổng quan</span>
      </a>

      <a className="flex flex-col items-center gap-1 text-slate-400 p-2" href="#">
        <span className="material-symbols-outlined">shopping_cart</span>
        <span className="text-[10px] font-medium">Đơn hàng</span>
      </a>

    </nav>
  );
}