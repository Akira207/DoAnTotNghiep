const FILTERS = [
  "Tất cả",
  "Chờ sản xuất",
  "Đang sản xuất",
  "Đang vận chuyển",
  "Chờ thanh toán",
  "Đã thanh toán",
  "Đã huỷ",
];

const OrdersFilters = ({ search, onSearch, filter, onFilterChange }) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl bg-surface-container-low p-4">

      <div className="relative flex-1 min-w-[240px]">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>

        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded border-none bg-white py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
          placeholder="Tìm kiếm mã đơn, khách hàng..."
        />
      </div>


      <div className="min-w-[200px]">
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full rounded bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary outline-none"
        >
          {FILTERS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default OrdersFilters;