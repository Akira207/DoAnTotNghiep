const chartData = [
  { month: "Tháng 1", revenue: 40, production: 30, opacity: "20" },
  { month: "Tháng 2", revenue: 60, production: 45, opacity: "40" },
  { month: "Tháng 3", revenue: 55, production: 70, opacity: "60" },
  { month: "Tháng 4", revenue: 80, production: 60, opacity: "80" },
  { month: "Tháng 5", revenue: 95, production: 75, opacity: "100" },
  { month: "Tháng 6", revenue: 85, production: 90, opacity: "90" },
];

const ChartSection = () => {
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
                className={`w-1/2 rounded-t ${
                  item.opacity === "100"
                    ? "bg-primary"
                    : `bg-primary/${item.opacity}`
                }`}
                style={{ height: `${item.revenue}%` }}
              ></div>

              <div
                className={`w-1/2 rounded-t ${
                  item.opacity === "100"
                    ? "bg-secondary"
                    : `bg-secondary/${item.opacity}`
                }`}
                style={{ height: `${item.production}%` }}
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