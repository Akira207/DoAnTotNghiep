export default function CustomerAnalysis({ customers = [] }) {
  const normalize = (str) => (str || "").toLowerCase().trim();

  const totalCustomers = customers.length;

  const agency = customers.filter(
    c => normalize(c.type) === "agency"
  ).length;

  const retail = customers.filter(
    c => normalize(c.type) === "retail"
  ).length;

  // ❗ tránh chia 0
  const safeTotal = totalCustomers === 0 ? 1 : totalCustomers;

  const segments = [
    {
      label: `Đại lý (${Math.round((agency / safeTotal) * 100)}%)`,
      value: `${agency} khách`,
      percent: `${Math.round((agency / safeTotal) * 100)}%`,
      color: "bg-primary",
    },
    {
      label: `Khách lẻ (${Math.round((retail / safeTotal) * 100)}%)`,
      value: `${retail} khách`,
      percent: `${Math.round((retail / safeTotal) * 100)}%`,
      color: "bg-secondary",
    },
  ];

  return (
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">
          Phân khúc khách hàng
        </h2>

        <div className="space-y-4">
          {segments.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span className="text-slate-500 uppercase">
                  {item.label}
                </span>
                <span className="text-on-surface">{item.value}</span>
              </div>

              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full`}
                  style={{ width: item.percent }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* giữ nguyên UI */}
      <div className="bg-on-primary-container text-on-primary p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-secondary">
            tips_and_updates
          </span>
          <h3 className="font-bold text-sm uppercase tracking-wide">
            Ghi chú vận hành
          </h3>
        </div>

        <p className="text-xs text-on-primary opacity-80 leading-relaxed">
          Tháng này ưu tiên xử lý dứt điểm các khoản công nợ trên 30 ngày
          từ nhóm Đại lý Bán lẻ. Tiếp tục triển khai chương trình chiết
          khấu 5% cho đơn hàng thiết kế từ khách lẻ mới.
        </p>
      </div>
    </div>
  );
}