import { useState } from "react";

export default function MaterialsHistoryActions({
  onSearch,
  onAddImport, // ✅ thêm callback mở form
}) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);

    onSearch?.(value);
  };

  return (
    <div className="bg-surface-container-lowest p-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:flex-wrap rounded-xl mb-8">
      {/* Search */}
      <div className="relative w-full md:w-[400px]">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          search
        </span>

        <input
          value={keyword}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-lg text-sm placeholder:text-slate-400"
          placeholder="Tìm kiếm vật liệu, nhà cung cấp..."
          type="text"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full md:w-auto">

        <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 text-on-surface font-semibold text-sm rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">
            filter_list
          </span>
          Bộ lọc
        </button>

        {/* ✅ GIỮ UI + THÊM EVENT */}
        <button
          onClick={onAddImport}
          className="flex-1 md:flex-none px-5 py-2.5 bg-primary text-on-primary font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nhập kho mới
        </button>

      </div>
    </div>
  );
}