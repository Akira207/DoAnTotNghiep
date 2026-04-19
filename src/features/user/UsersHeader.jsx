export default function UsersHeader({ onAdd }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

      <div>
        <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
          <span>PLT Management</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-bold">
            Quản lý người dùng & nhân sự
          </span>
        </nav>

        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Quản lý Nhân sự & Người dùng
        </h2>
      </div>

      <div className="flex gap-3">

        <button className="bg-surface-container-high px-4 py-2.5 rounded-lg font-bold text-sm">
          Xuất báo cáo
        </button>

        {/* FIX: chỉ gọi prop */}
        <button
          onClick={onAdd}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined">person_add</span>
          Thêm nhân viên
        </button>

      </div>
    </div>
  );
}