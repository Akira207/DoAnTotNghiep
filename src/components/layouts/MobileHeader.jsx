const MobileHeader = ({ onOpenSidebar }) => {
  return (
    <header className="flex md:hidden justify-between items-center px-6 py-4 w-full sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      
      <div className="flex items-center gap-3">
        <button className="p-1 -ml-1" onClick={onOpenSidebar}>
          <span className="material-symbols-outlined text-slate-900">
            menu
          </span>
        </button>

        <span className="text-lg font-black text-primary uppercase tracking-tighter">
          PLT Management
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-slate-500">
          notifications
        </span>

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            alt="User Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLkwUQfTYbm0DhpdIeXOpB2B6dHk2T3UHRIqV84XGIWJ1oJMqsDmpwRwR_6jJwtaC-n_t3ERHWUzugbyHiYy1Lu3m8BQIUphxHJvL3n4tsSm-VJ8YmDwGt9nKEUbfWa2ZXDCi1M6CatN1Q6fwVirjLLsrA48pQBB1zRUa827nqAcgvskrNAhxWWjaPbuBTv1vcIgUIWLngpMXOVt8oJxtIz2vpvs7KiGI-hbF2dWtUn4J4rsv1AK4WDP2kBDRuqIs8rPa_-h21mRI-"
          />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;