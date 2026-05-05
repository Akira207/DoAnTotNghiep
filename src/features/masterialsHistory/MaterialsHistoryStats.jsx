export default function MaterialsHistoryStats({ items = [], totalValue: externalTotalValue }) {
  const totalValue = externalTotalValue !== undefined ? externalTotalValue : items.reduce(
    (sum, item) => sum + (item.totalCost || 0),
    0,
  );
  const totalImports = items.length;
  const priorityMaterial = items.length > 0 ? items[0] : null;

  const monthlyChange =
    Math.floor((items.length / Math.max(1, items.length - 1)) * 12) || 0;

  const formatValue = (val) => {
    if (val >= 1e9) {
      return (val / 1e9).toFixed(2) + " tỷ đ";
    } else if (val >= 1e6) {
      return (val / 1e6).toFixed(2) + " triệu đ";
    } else {
      return val.toLocaleString("vi-VN") + " đ";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="md:col-span-1 bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary">
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
          Tổng giá trị nhập
        </p>

        <p className="text-2xl font-black text-on-surface tracking-tight">
          {formatValue(totalValue)}
        </p>

        <div className="mt-2 flex items-center text-tertiary font-bold text-xs">
          <span className="material-symbols-outlined text-sm mr-1">
            trending_up
          </span>
          +{monthlyChange}% tháng này
        </div>
      </div>

      <div className="md:col-span-1 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
          Số lượt nhập kho
        </p>

        <p className="text-2xl font-black text-on-surface tracking-tight">
          {totalImports}
        </p>

        <div className="mt-2 text-slate-400 text-xs font-medium">
          Cập nhật lúc{" "}
          {new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="md:col-span-2 bg-secondary-container p-6 rounded-xl shadow-sm flex justify-between items-center relative overflow-hidden">
        <div className="z-10">
          <p className="text-xs font-bold text-on-secondary-container tracking-widest uppercase mb-1">
            Vật liệu ưu tiên
          </p>

          <p className="text-2xl font-black text-on-secondary-container tracking-tight">
            {priorityMaterial?.materialName || "Chưa cập nhật"}
          </p>

          <p className="mt-1 text-on-secondary-container/70 text-sm font-medium">
            {priorityMaterial?.supplier || "Chưa cập nhật"}
          </p>
        </div>

        <span className="material-symbols-outlined text-7xl text-on-secondary-container/10 absolute -right-2 -bottom-2 rotate-12">
          precision_manufacturing
        </span>
      </div>
    </div>
  );
}
