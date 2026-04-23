const generateMonthlyData = (orders = []) => {
  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"];
  const monthlyData = {};

  months.forEach(month => {
    monthlyData[month] = { revenue: 0, cost: 0 };
  });

  orders.forEach(order => {
    const date = new Date(order.createdAt || new Date());
    const month = `Tháng ${date.getMonth() + 1}`;
    
    if (monthlyData[month]) {
      monthlyData[month].revenue += order.totalAmount || 0;
      monthlyData[month].cost += order.costAmount || (order.totalAmount * 0.6) || 0;
    }
  });

  const data = months.map(month => ({
    month,
    revenue: Math.round(monthlyData[month].revenue / 100000000), // Convert to 100M units
    cost: Math.round(monthlyData[month].cost / 100000000),
  }));

  // Normalize to percentages
  const maxValue = Math.max(...data.map(d => Math.max(d.revenue, d.cost)), 1);
  return data.map(item => ({
    ...item,
    revenue: (item.revenue / maxValue) * 100,
    cost: (item.cost / maxValue) * 100,
  }));
};

export default function RevenueChart({ data = {} }) {
  const { orders = [] } = data;
  const chartData = generateMonthlyData(orders);

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
          <span>2B</span>
          <span>1.5B</span>
          <span>1B</span>
          <span>0.5B</span>
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
            {chartData.map((item, index) => (
              <div key={index} className="flex items-end gap-1.5 h-full z-10">
                <div
                  className="w-4 bg-[#0058BA] rounded-t-sm hover:opacity-80 transition-opacity"
                  style={{ height: `${Math.max(item.revenue, 5)}%` }}
                  title={`Revenue`}
                ></div>
                <div
                  className="w-4 bg-[#E2E8F0] rounded-t-sm hover:opacity-80 transition-opacity"
                  style={{ height: `${Math.max(item.cost, 5)}%` }}
                  title={`Cost`}
                ></div>
              </div>
            ))}
          </div>

          {/* X axis */}
          <div className="flex justify-around mt-4 px-4">
            {chartData.map((item, index) => (
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