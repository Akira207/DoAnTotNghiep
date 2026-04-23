const generateMonthlyFinanceData = (orders = []) => {
  const months = [
    { label: "Tháng 1", income: 0, expense: 0 },
    { label: "Tháng 2", income: 0, expense: 0 },
    { label: "Tháng 3", income: 0, expense: 0 },
    { label: "Tháng 4", income: 0, expense: 0 },
    { label: "Tháng 5", income: 0, expense: 0 },
    { label: "Tháng 6", income: 0, expense: 0 },
  ];

  // Populate data from orders
  orders.forEach(order => {
    const date = new Date(order.createdAt || new Date());
    const monthIndex = date.getMonth();
    
    if (monthIndex < 6) {
      months[monthIndex].income += order.totalAmount || 0;
      months[monthIndex].expense += (order.totalAmount * 0.6) || 0; // Estimate 60% cost
    }
  });

  // Normalize to percentage
  const maxValue = Math.max(
    ...months.map(m => Math.max(m.income, m.expense)),
    1
  );

  return months.map(m => ({
    ...m,
    income: (m.income / maxValue) * 100,
    expense: (m.expense / maxValue) * 100,
  }));
};

export default function RevenueChart({ data = {} }) {
  const { orders = [] } = data;
  const months = generateMonthlyFinanceData(orders);

  // Calculate cost breakdown
  const totalExpense = months.reduce((sum, m) => sum + m.expense, 0);
  const materialCost = (totalExpense * 0.45) / (totalExpense || 1) * 100;
  const laborCost = (totalExpense * 0.30) / (totalExpense || 1) * 100;
  const overheadCost = (totalExpense * 0.25) / (totalExpense || 1) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* ================= CHART ================= */}
      <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-sm border border-surface-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h5 className="text-lg font-bold text-on-surface">
            Biểu đồ dòng tiền hàng tháng
          </h5>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              <span className="text-xs text-on-surface-variant font-medium">
                Thu nhập
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="text-xs text-on-surface-variant font-medium">
                Chi phí
              </span>
            </div>
          </div>
        </div>

        {/* Fake Chart */}
        <div className="h-64 flex items-end gap-4 md:gap-8 pt-4">
          {months.map((m, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end gap-2 h-full"
            >
              {/* wrapper để đẩy bar xuống đáy */}
              <div className="w-full flex items-end justify-center gap-1 h-full">
                {/* income */}
                <div
                  className="w-4 bg-primary rounded-t hover:opacity-80 transition-opacity"
                  style={{ height: `${Math.max(m.income, 5)}%` }}
                />

                {/* expense */}
                <div
                  className="w-4 bg-secondary rounded-t hover:opacity-80 transition-opacity"
                  style={{ height: `${Math.max(m.expense, 5)}%` }}
                />
              </div>

              <span className="text-[10px] text-on-surface-variant font-bold">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COST BREAKDOWN ================= */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-surface-container space-y-6">
        <h6 className="font-bold text-on-surface border-b border-outline-variant pb-4">
          Phân bổ chi phí
        </h6>

        <div className="space-y-4">
          {/* ITEM */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant">Nguyên vật liệu</span>
              <span className="font-bold">{materialCost.toFixed(0)}%</span>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${materialCost}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant">Nhân công</span>
              <span className="font-bold">{laborCost.toFixed(0)}%</span>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container" style={{ width: `${laborCost}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant">
                Vận hành & Máy móc
              </span>
              <span className="font-bold">{overheadCost.toFixed(0)}%</span>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary" style={{ width: `${overheadCost}%` }}></div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="pt-4">
          <button className="w-full py-3 text-xs font-bold text-primary bg-white rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
            Xem chi tiết phân bổ
          </button>
        </div>
      </div>
    </div>
  );
}
