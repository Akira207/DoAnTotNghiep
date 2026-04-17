export default function MaterialsHistoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Tổng giá trị nhập */}
      <div className="md:col-span-1 bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary">
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
          Tổng giá trị nhập
        </p>

        <p className="text-2xl font-black text-on-surface tracking-tight">
          1.250.000.000đ
        </p>

        <div className="mt-2 flex items-center text-tertiary font-bold text-xs">
          <span className="material-symbols-outlined text-sm mr-1">
            trending_up
          </span>
          +12% tháng này
        </div>
      </div>

      {/* Số lượt nhập */}
      <div className="md:col-span-1 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
          Số lượt nhập kho
        </p>

        <p className="text-2xl font-black text-on-surface tracking-tight">
          48
        </p>

        <div className="mt-2 text-slate-400 text-xs font-medium">
          Cập nhật lúc 10:30 AM
        </div>
      </div>

      {/* Vật liệu ưu tiên */}
      <div className="md:col-span-2 bg-secondary-container p-6 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden">
        <div className="z-10">
          <p className="text-xs font-bold text-on-secondary-container tracking-widest uppercase mb-1">
            Vật liệu ưu tiên
          </p>

          <p className="text-2xl font-black text-on-secondary-container tracking-tight">
            Gỗ Sồi Mỹ - A1
          </p>

          <p className="mt-1 text-on-secondary-container/70 text-sm font-medium">
            Yêu cầu hoàn thành trước ngày 20/11
          </p>
        </div>

        <span className="material-symbols-outlined text-7xl text-on-secondary-container/10 absolute -right-2 -bottom-2 rotate-12">
          precision_manufacturing
        </span>
      </div>
    </div>
  );
}