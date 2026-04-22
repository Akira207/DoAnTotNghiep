import { useState } from "react";

const ProductionHeader = ({ onSearch, onCreate }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch?.(value);
  };

  return (
    <div className="mb-8 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
      
      {/* LEFT */}
      <div className="flex-1">

        <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
          <span className="hover:text-primary transition-colors cursor-pointer">
            PLT Management
          </span>
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
          <span className="text-primary font-bold">Sản xuất</span>
        </nav>

        <h2 className="text-3xl md:text-[32px] font-black text-on-background leading-tight tracking-tight">
          Tiến độ Sản xuất
        </h2>

        <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-2xl">
          Theo dõi và quản lý các lệnh sản xuất hiện hành trong xưởng.
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-3 self-start xl:self-center">

        {/* SEARCH */}
        <div className="relative min-w-[240px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>

          <input
            value={keyword}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Tìm kiếm lệnh..."
            type="text"
          />
        </div>

        {/* 🔥 FIX QUAN TRỌNG - CHỈ THÊM onClick */}
        <button
          onClick={() => onCreate?.()}
          className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="text-sm">Tạo Lệnh Mới</span>
        </button>

      </div>

    </div>
  );
};

export default ProductionHeader;