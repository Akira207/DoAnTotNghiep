const OrdersHeader = () => {
  return (
    <div className="mb-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-on-surface-variant">
        <span className="cursor-pointer transition-colors hover:text-primary">
          PLT Management
        </span>

        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>

        <span className="font-medium text-primary">Đơn hàng</span>
      </nav>

      {/* Title + Action */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between">
        
        {/* Left */}
        <div>
          <h2 className="mb-2 text-4xl font-black tracking-tight text-slate-900">
            Quản lý Đơn hàng
          </h2>
          <p className="text-on-surface-variant">
            Theo dõi và điều phối các đơn hàng sản xuất nội thất thủ công.
          </p>
        </div>

        {/* Right */}
        <button className="flex w-full md:w-auto items-center justify-center gap-2 rounded bg-secondary px-6 py-3 font-bold text-on-secondary shadow-lg transition-all hover:brightness-110 active:scale-95">
          <span className="material-symbols-outlined">
            add_circle
          </span>
          <span>Tạo đơn hàng mới</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersHeader;