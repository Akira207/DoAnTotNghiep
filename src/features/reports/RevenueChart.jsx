export default function RevenueChart({ data = [] }) {
  const chartData = data.map(item => {
    return {
      month: item.label,
      revenue: item.revenue || 0,
      cost: item.cost || 0,
    };
  });

  const maxValue = Math.max(...chartData.map(d => Math.max(d.revenue, d.cost)), 1);

  const normalizedData = chartData.map(item => ({
    ...item,
    revenue: (item.revenue / maxValue) * 100,
    cost: (item.cost / maxValue) * 100,
  }));

  return (
    <div className="lg:col-span-2 bg-white rounded-sm shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">
            Xu hướng Doanh thu & Chi phí
          </h4>
          <p className="text-sm text-slate-400">
            Dữ liệu thống kê theo tháng (Đơn vị: VNĐ)
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#0058BA] rounded-full"></span>
            <span className="text-xs font-bold text-slate-500">
              Doanh thu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#E2E8F0] rounded-full"></span>
            <span className="text-xs font-bold text-slate-500">
              Chi phí
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-72">
        <div className="flex flex-col justify-between text-[10px] font-bold text-slate-400 pr-4 pb-8">
          <span>{Math.ceil(maxValue / 1e8)}00M</span>
          <span>{Math.ceil(maxValue / 1e8 * 0.75)}00M</span>
          <span>{Math.ceil(maxValue / 1e8 * 0.5)}00M</span>
          <span>{Math.ceil(maxValue / 1e8 * 0.25)}00M</span>
          <span>0</span>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-end justify-around border-l border-b border-slate-100 px-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full"></div>
            </div>

            {normalizedData.map((item, index) => (
              <div key={index} className="flex items-end gap-1.5 h-full z-10">
                <div
                  className="w-4 bg-[#0058BA] rounded-t-sm hover:opacity-80 transition-opacity"
                  style={{ height: `${Math.max(item.revenue, 5)}%` }}
                  title={`Revenue: ${item.revenue.toLocaleString()} VNĐ`}
                ></div>
                <div
                  className="w-4 bg-[#E2E8F0] rounded-t-sm hover:opacity-80 transition-opacity"
                  style={{ height: `${Math.max(item.cost, 5)}%` }}
                  title={`Cost: ${item.cost.toLocaleString()} VNĐ`}
                ></div>
              </div>
            ))}
          </div>

          <div className="flex justify-around mt-4 px-4">
            {normalizedData.map((item, index) => (
              <span
                key={index}
                className="text-[10px] font-bold text-slate-400"
              >
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
