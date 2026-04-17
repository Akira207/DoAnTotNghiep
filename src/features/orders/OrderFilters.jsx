import { useState } from "react";

const FILTERS = ["Tất cả", "Chờ xử lý", "Đang sản xuất", "Hoàn thành"];

const OrdersFilters = ({ onSearch, onFilterChange }) => {
  const [active, setActive] = useState("Tất cả");

  const handleFilterClick = (filter) => {
    setActive(filter);
    onFilterChange?.(filter);
  };

  const handleSearch = (e) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl bg-surface-container-low p-4">
      
      {/* Search */}
      <div className="relative flex-1 min-w-[240px]">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>

        <input
          className="w-full rounded border-none bg-white py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
          placeholder="Tìm kiếm mã đơn, tên khách..."
          type="text"
          onChange={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
        {FILTERS.map((item) => {
          const isActive = active === item;

          return (
            <button
              key={item}
              onClick={() => handleFilterClick(item)}
              className={`
                whitespace-nowrap rounded px-4 py-2 text-sm transition
                ${
                  isActive
                    ? "bg-primary text-on-primary font-semibold"
                    : "border border-slate-100 bg-white text-slate-600 font-medium hover:bg-slate-50"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersFilters;