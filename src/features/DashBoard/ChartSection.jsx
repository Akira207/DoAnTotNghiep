const generateChartData = (orders = []) => {
  // Group orders by month
  const monthlyData = {};
  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"];

  // Initialize months
  months.forEach(month => {
    monthlyData[month] = { revenue: 0, production: 0 };
  });

  // Process orders (assuming they have createdAt and totalAmount)
  orders.forEach(order => {
    const date = new Date(order.createdAt || new Date());
    const month = `Tháng ${date.getMonth() + 1}`;
    
    if (monthlyData[month]) {
      monthlyData[month].revenue += order.totalAmount || 0;
      monthlyData[month].production += order.quantity || 1;
    }
  });

  // Convert to array and normalize values
  let chartData = months.map(month => ({
    month,
    revenue: monthlyData[month].revenue / 10000000, // Convert to 10M units
    production: monthlyData[month].production,
  }));

  // Find max values for scaling
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
  const maxProduction = Math.max(...chartData.map(d => d.production), 1);

  // Scale to percentage (0-100)
  chartData = chartData.map(item => ({
    ...item,
    revenue: (item.revenue / maxRevenue) * 100,
    production: (item.production / maxProduction) * 100,
  }));

  return chartData;
};

const ChartSection = ({ data = {} }) => {
  const { orders = [] } = data;
  const chartData = generateChartData(orders);

  return (
    <div className="lg:col-span-2 bg-white p-8 rounded shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-black tracking-tight">
          Xu hướng Doanh thu &amp; Sản lượng
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Doanh thu
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Sản lượng
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <div className="w-full flex items-end justify-center gap-1 h-full">
              <div
                className="w-1/2 rounded-t bg-primary opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${Math.max(item.revenue, 5)}%` }}
              ></div>

              <div
                className="w-1/2 rounded-t bg-secondary opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${Math.max(item.production, 5)}%` }}
              ></div>
            </div>

            <span className="text-[10px] font-bold text-on-surface-variant uppercase">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartSection;