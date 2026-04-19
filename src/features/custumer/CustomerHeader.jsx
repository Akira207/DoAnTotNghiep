import React from "react";

export default function CustomerHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
        <a href="#" className="hover:text-primary transition-colors">
          PLT Management
        </a>

        <span className="material-symbols-outlined text-sm">chevron_right</span>

        <span className="text-primary font-bold">Quản lý khách hàng</span>
      </nav>

      {/* Title + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-3xl font-black text-on-surface tracking-tight">
          Quản Lý Khách hàng
        </h3>

        {/* Add Customer Button */}
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-lg">person_add</span>
          Thêm khách hàng
        </button>
      </div>
    </div>
  );
}
