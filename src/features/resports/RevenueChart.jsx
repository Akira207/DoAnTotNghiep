export default function RevenueChart() {
  const data = [
    { month: "Tháng 1", revenue: 60, cost: 45 },
    { month: "Tháng 2", revenue: 75, cost: 55 },
    { month: "Tháng 3", revenue: 65, cost: 50 },
    { month: "Tháng 4", revenue: 90, cost: 65 },
    { month: "Tháng 5", revenue: 80, cost: 60 },
    { month: "Tháng 6", revenue: 100, cost: 70 },
  ];

  return (
    <div className="lg:col-span-2 bg-white rounded-sm shadow-sm p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">
            Xu hướng Doanh thu & Chi phí
          </h4>
          <p className="text-sm text-slate-400">
            Dữ liệu thống kê trong 6 tháng gần nhất
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

      {/* Chart */}
      <div className="flex h-72">
        {/* Y axis */}
        <div className="flex flex-col justify-between text-[10px] font-bold text-slate-400 pr-4 pb-8">
          <span>2 tỷ</span>
          <span>1.5 tỷ</span>
          <span>1 tỷ</span>
          <span>0.5 tỷ</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-end justify-around border-l border-b border-slate-100 px-4 relative">
            
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full border-t border-slate-50"></div>
              <div className="w-full"></div>
            </div>

            {/* Bars */}
            {data.map((item, index) => (
              <div key={index} className="flex items-end gap-1.5 h-full z-10">
                <div
                  className="w-4 bg-[#0058BA] rounded-t-sm"
                  style={{ height: `${item.revenue}%` }}
                  title={`Revenue`}
                ></div>
                <div
                  className="w-4 bg-[#E2E8F0] rounded-t-sm"
                  style={{ height: `${item.cost}%` }}
                  title={`Cost`}
                ></div>
              </div>
            ))}
          </div>

          {/* X axis */}
          <div className="flex justify-around mt-4 px-4">
            {data.map((item, index) => (
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