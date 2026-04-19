export default function RevenueChart() {
  const months = [
    { label: "Tháng 1", income: 40, expense: 25 },
    { label: "Tháng 2", income: 60, expense: 30 },
    { label: "Tháng 3", income: 55, expense: 45 },
    { label: "Tháng 4", income: 75, expense: 20 },
    { label: "Tháng 5", income: 90, expense: 35 },
    { label: "Tháng 6", income: 85, expense: 50 },
  ];

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
                  className="w-4 bg-primary rounded-t"
                  style={{ height: `${m.income}%` }}
                />

                {/* expense */}
                <div
                  className="w-4 bg-secondary rounded-t"
                  style={{ height: `${m.expense}%` }}
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
              <span className="font-bold">45%</span>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[45%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant">Nhân công</span>
              <span className="font-bold">30%</span>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-[30%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant">
                Vận hành & Máy móc
              </span>
              <span className="font-bold">15%</span>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[15%]"></div>
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
