const WarehouseStats = ({ items = [] }) => {
  // Calculate stats from actual warehouse data
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const lowStockItems = items.filter(item => (item.quantity || 0) < 10).length;
  const readyToShip = items.filter(item => (item.status || "").toLowerCase() === "ready").length;
  const packing = items.filter(item => (item.status || "").toLowerCase() === "packing").length;

  const stats = [
    {
      title: "Tổng tồn kho",
      value: totalItems.toLocaleString("vi-VN"),
      unit: "sp",
      icon: "inventory",
      color: "primary",
      extra: `+${Math.floor(totalItems * 0.125)}`,
      extraStyle: "text-tertiary bg-tertiary/10",
    },
    {
      title: "Đang đóng gói",
      value: packing.toLocaleString("vi-VN"),
      unit: "kiện",
      icon: "package_2",
      color: "secondary",
      extra: "Đang xử lý",
      extraStyle: "text-on-surface-variant bg-surface-container",
    },
    {
      title: "Sẵn sàng giao",
      value: readyToShip.toLocaleString("vi-VN"),
      unit: "đơn",
      icon: "local_shipping",
      color: "tertiary",
      extra: "Sẵn sàng",
      extraStyle: "text-tertiary bg-tertiary/10",
    },
    {
      title: "Tồn kho thấp",
      value: lowStockItems.toLocaleString("vi-VN"),
      unit: "sp",
      icon: "warning",
      color: "error",
      extra: "Cảnh báo",
      extraStyle: "text-error bg-error/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 group hover:shadow-md transition-all
            ${
              item.color === "primary"
                ? "border-primary"
                : item.color === "secondary"
                ? "border-secondary"
                : item.color === "tertiary"
                ? "border-tertiary"
                : "border-error"
            }`}
        >
          {/* Top */}
          <div className="flex justify-between items-start mb-4">
            <div
              className={`p-3 rounded-lg
                ${
                  item.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : item.color === "secondary"
                    ? "bg-secondary/10 text-secondary"
                    : item.color === "tertiary"
                    ? "bg-tertiary/10 text-tertiary"
                    : "bg-error/10 text-error"
                }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                {item.icon}
              </span>
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.extraStyle}`}
            >
              {item.extra}
            </span>
          </div>

          {/* Content */}
          <p className="text-on-surface-variant text-sm font-medium">
            {item.title}
          </p>

          <h3
            className={`text-2xl font-black tracking-tight mt-1
              ${item.color === "error" ? "text-error" : "text-on-surface"}`}
          >
            {item.value}{" "}
            <span className="text-sm font-normal text-on-surface-variant italic">
              {item.unit}
            </span>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default WarehouseStats;