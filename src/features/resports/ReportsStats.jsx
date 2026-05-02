export default function ReportsStats({ data = {} }) {
  const {
    totalRevenue = 0,
    totalCost = 0,
    totalOrders = 0,
    totalCustomers = 0,
    profit = 0,
  } = data || {};

  const stats = [
    {
      title: "Tổng doanh thu",
      value: (totalRevenue / 1e9).toFixed(2),
      unit: "tỷ VNĐ",
      icon: "payments",
      color: "text-[#0058BA]",
      bg: "bg-blue-50",
      border: "border-[#0058BA]",
      growth: `+${Math.floor((profit / (totalRevenue || 1)) * 100) || 0}%`,
      growthColor: "text-green-600",
      growthBg: "bg-green-50",
    },
    {
      title: "Tổng chi phí",
      value: (totalCost / 1e9).toFixed(2),
      unit: "tỷ VNĐ",
      icon: "account_balance_wallet",
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-300",
    },
    {
      title: "Lợi nhuận",
      value: (profit / 1e9).toFixed(2),
      unit: "tỷ VNĐ",
      icon: "monetization_on",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-600",
      highlight: true,
    },
    {
      title: "Số đơn hàng",
      value: totalOrders.toString(),
      unit: "đơn",
      icon: "shopping_cart",
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-500",
    },
    {
      title: "Số khách hàng",
      value: totalCustomers.toString(),
      unit: "khách",
      icon: "group",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-500",
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-sm shadow-sm flex flex-col justify-between border-l-4 ${item.border}`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className={`p-2 rounded-sm ${item.bg} ${item.color}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </span>
            {item.growth && (
              <span
                className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded-full ${item.growthColor} ${item.growthBg}`}
              >
                {item.growth}
                <span className="material-symbols-outlined text-[10px] ml-1">
                  trending_up
                </span>
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {item.title}
            </p>
            <h3
              className={`text-2xl font-black tracking-tighter ${
                item.highlight ? "text-green-600" : "text-slate-900"
              }`}
            >
              {item.value}{" "}
              <span className="text-xs font-medium text-slate-500">
                {item.unit}
              </span>
            </h3>
          </div>
        </div>
      ))}
    </section>
  );
}