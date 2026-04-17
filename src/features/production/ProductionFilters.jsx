import { useState } from "react";

const batches = [
  { value: "1", label: "Đợt 1 (Hiện tại)" },
  { value: "2", label: "Đợt 2" },
  { value: "3", label: "Đợt 3" },
  { value: "4", label: "Đợt 4" },
  { value: "5", label: "Đợt 5" },
  { value: "6", label: "Đợt 6" },
];

const statuses = ["Tất cả", "Đang sản xuất", "Hoàn thành"];

const ProductionFilters = ({ onBatchChange, onStatusChange }) => {
  const [batch, setBatch] = useState("1");
  const [activeStatus, setActiveStatus] = useState("Tất cả");

  const handleBatchChange = (e) => {
    const value = e.target.value;
    setBatch(value);
    onBatchChange?.(value);
  };

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    onStatusChange?.(status);
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* SELECT BATCH */}
      <div className="relative min-w-[200px]">
        <select
          value={batch}
          onChange={handleBatchChange}
          className="appearance-none w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer transition-all"
        >
          {batches.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          keyboard_arrow_down
        </span>
      </div>

      {/* STATUS FILTER */}
      <div className="flex bg-slate-100 p-1 rounded-xl gap-0.5 shrink-0 items-center">
        {statuses.map((status) => {
          const isActive = activeStatus === status;

          return (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`
                px-4 py-1.5 text-xs font-bold rounded-lg transition-all
                ${
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }
              `}
            >
              {status}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default ProductionFilters;