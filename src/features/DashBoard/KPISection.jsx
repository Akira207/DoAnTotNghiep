const kpiData = [
  {
    title: "Tổng đơn hàng",
    value: "1,248",
    change: "+12%",
    icon: "shopping_bag",
    border: "border-primary",
    iconBg: "bg-primary-container",
    iconColor: "text-on-primary-container",
    changeColor: "text-tertiary",
    changeBg: "bg-tertiary-container/20",
  },
  {
    title: "Doanh thu (VNĐ)",
    value: "4.82B",
    change: "+8.4%",
    icon: "payments",
    border: "border-secondary",
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    changeColor: "text-tertiary",
    changeBg: "bg-tertiary-container/20",
  },
  {
    title: "Tiến độ sản xuất",
    value: "82%",
    progress: 82,
    icon: "precision_manufacturing",
    border: "border-tertiary",
    iconBg: "bg-tertiary-container",
    iconColor: "text-on-tertiary-container",
    status: "Hoạt động",
  },
  {
    title: "Sản phẩm tồn kho",
    value: "432",
    icon: "inventory",
    border: "border-error",
    iconBg: "bg-error-container/20",
    iconColor: "text-error",
    status: "Cảnh báo",
  },
];

const KPISection = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((item, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded shadow-sm border-l-4 ${item.border}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`w-10 h-10 rounded ${item.iconBg} flex items-center justify-center`}
            >
              <span
                className={`material-symbols-outlined ${item.iconColor}`}
              >
                {item.icon}
              </span>
            </div>

            {/* Change / Status */}
            {item.change && (
              <span
                className={`${item.changeColor} font-bold text-xs ${item.changeBg} px-2 py-1 rounded whitespace-nowrap`}
              >
                {item.change}
              </span>
            )}

            {item.status && !item.change && (
              <span className="text-on-surface-variant font-bold text-xs whitespace-nowrap">
                {item.status}
              </span>
            )}
          </div>

          <h3 className="text-on-surface-variant text-sm font-semibold mb-1">
            {item.title}
          </h3>

          {/* Value */}
          {item.progress ? (
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black tracking-tighter text-on-surface">
                {item.value}
              </p>
              <div className="mb-1 w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-tertiary"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <p className="text-3xl font-black tracking-tighter text-on-surface">
              {item.value}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default KPISection;