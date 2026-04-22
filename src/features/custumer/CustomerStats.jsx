import React from "react";

export default function CustomerStats() {
  const stats = [
    {
      title: "Tổng số khách hàng",
      value: "1,248",
      sub: "+12%",
      subClass: "text-tertiary text-xs font-bold",
      border: "border-primary",
    },
    {
      title: "Đại lý hoạt động",
      value: "156",
      sub: "/ 200",
      subClass: "text-slate-400 text-xs font-medium",
      border: "border-secondary",
    },
    {
      title: "Khách lẻ mới",
      value: "42",
      sub: "Tháng này",
      subClass: "text-tertiary text-xs font-bold",
      border: "border-tertiary",
    },
    {
      title: "Công nợ khách hàng",
      value: "420.5",
      unit: "Triệu",
      border: "border-error",
      isDebt: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`bg-surface-container-lowest p-5 rounded-lg shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-l-4 ${item.border}`}
        >
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
            {item.title}
          </p>

          <div className="flex items-baseline gap-2 mt-2">
            {item.isDebt ? (
              <>
                <span className="text-2xl font-black tracking-tight text-error">
                  {item.value}
                </span>
                <span className="text-sm font-bold uppercase text-error">
                  {item.unit}
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-black tracking-tight text-on-surface">
                  {item.value}
                </span>
                <span className={item.subClass}>{item.sub}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}