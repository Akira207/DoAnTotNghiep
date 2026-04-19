import { useState } from "react";

export default function MaterialsHistoryHeader() {
  const [timeFilter, setTimeFilter] = useState("month");

  const getBtnClass = (type) =>
    `px-4 py-1.5 text-xs font-bold rounded transition ${
      timeFilter === type
        ? "bg-white text-primary shadow-sm"
        : "text-slate-500 hover:text-on-surface"
    }`;

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
        <span className="hover:text-primary transition-colors cursor-pointer">
          PLT Management
        </span>
        <span className="material-symbols-outlined text-sm">
          chevron_right
        </span>
        <span className="text-primary font-bold">
          Lịch sử nhập vật liệu
        </span>
      </nav>

      {/* Title + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-3xl font-black text-on-surface tracking-tight">
          Lịch sử nhập vật liệu
        </h3>

        <div className="bg-surface-container-low p-1 rounded-lg flex gap-1">
          <button
            onClick={() => setTimeFilter("month")}
            className={getBtnClass("month")}
          >
            Tháng này
          </button>

          <button
            onClick={() => setTimeFilter("quarter")}
            className={getBtnClass("quarter")}
          >
            Quý này
          </button>

          <button
            onClick={() => setTimeFilter("year")}
            className={getBtnClass("year")}
          >
            Cả năm
          </button>
        </div>
      </div>
    </div>
  );
}