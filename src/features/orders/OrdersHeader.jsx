const OrdersHeader = ({ onCreate }) => {
  return (
    <div className="mb-10">

      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
        <span className="hover:text-primary cursor-pointer">
          PLT Management
        </span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-primary font-bold">Đơn hàng</span>
      </nav>

      {/* Title + Button */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between">

        <div>
          <h2 className="mb-2 text-3xl font-black">
            Quản lý Đơn hàng
          </h2>
          <p className="text-on-surface-variant">
            Theo dõi và điều phối đơn hàng sản xuất nội thất.
          </p>
        </div>

        {/* 🔥 BUTTON HOẠT ĐỘNG */}
        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded bg-secondary px-6 py-3 font-bold text-on-secondary shadow-lg hover:brightness-110 active:scale-95"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Tạo đơn hàng mới</span>
        </button>

      </div>
    </div>
  );
};

export default OrdersHeader;