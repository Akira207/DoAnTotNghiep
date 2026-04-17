import { useState } from "react";

const WarehouseHeader = () => {
  const [range, setRange] = useState("month");

  const options = [
    { key: "month", label: "Tháng này" },
    { key: "quarter", label: "Quý này" },
    { key: "year", label: "Cả năm" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      
      {/* Left */}
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-2">
          <span>PLT Management</span>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-primary">Kho thành phẩm</span>
        </nav>

        {/* Title */}
        <h2 className="text-3xl font-black text-on-surface tracking-tight">
          Quản lý Kho Thành phẩm
        </h2>
      </div>

      {/* Right - Filter */}
      <div className="flex items-center gap-2 bg-surface-container p-1 rounded-lg">
        {options.map((item) => {
          const isActive = range === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setRange(item.key)}
              className={`px-4 py-1.5 text-xs font-bold rounded transition
                ${
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default WarehouseHeader;