export default function OrderStatusChart({ data = {} }) {
  const statusCounts = {
    "in-progress": data["in-progress"] || 0,
    "pending": data["pending"] || 0,
    "completed": data["completed"] || 0,
    "cancelled": data["cancelled"] || 0,
  };

  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0) || 1;

  const data_chart = [
    {
      label: "Đang sản xuất",
      value: statusCounts["in-progress"],
      percent: Math.round((statusCounts["in-progress"] / total) * 100),
      color: "#0058BA",
    },
    {
      label: "Chờ xử lý",
      value: statusCounts["pending"],
      percent: Math.round((statusCounts["pending"] / total) * 100),
      color: "#FF8C00",
    },
    {
      label: "Hoàn thành",
      value: statusCounts["completed"],
      percent: Math.round((statusCounts["completed"] / total) * 100),
      color: "#006A35",
    },
    {
      label: "Huỷ",
      value: statusCounts["cancelled"],
      percent: Math.round((statusCounts["cancelled"] / total) * 100),
      color: "#94A3B8",
    },
  ];

  let current = 0;
  const gradient = data_chart
    .map((item) => {
      const start = current;
      const end = current + item.percent;
      current = end;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="bg-white rounded-sm shadow-sm p-8 flex flex-col">
      <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2">
        Cơ cấu Trạng thái Đơn hàng
      </h4>

      <p className="text-sm text-slate-400 mb-10">
        Phân bổ {total} đơn hàng hiện tại
      </p>

      <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${gradient})`,
            maskImage: "radial-gradient(circle, transparent 65%, black 65%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 65%, black 65%)",
          }}
        />

        <div className="text-center z-10">
          <span className="block text-3xl font-black text-slate-900 tracking-tighter">
            {total}
          </span>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Đơn hàng
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {data_chart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-slate-600">
                {item.label}
              </span>
            </div>

            <span className="text-sm font-bold text-slate-900">
              {item.value} ({item.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
