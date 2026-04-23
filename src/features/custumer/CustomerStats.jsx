import React from "react";

export default function CustomerStats({ customers = [] }) {
  // Calculate stats from customers data
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => (c.status || "active").toLowerCase() === "active").length;
  const newCustomers = customers.filter(c => {
    const createdDate = new Date(c.createdAt || new Date());
    const currentDate = new Date();
    const monthDiff = (currentDate.getFullYear() - createdDate.getFullYear()) * 12 + 
                      (currentDate.getMonth() - createdDate.getMonth());
    return monthDiff === 0;
  }).length;
  
  const totalDebt = customers.reduce((sum, c) => sum + (c.debt || 0), 0);

  const stats = [
    {
      title: "Tổng số khách hàng",
      value: totalCustomers.toLocaleString('vi-VN'),
      sub: `+${newCustomers}`,
      subClass: "text-tertiary text-xs font-bold",
      border: "border-primary",
    },
    {
      title: "Khách hàng hoạt động",
      value: activeCustomers.toLocaleString('vi-VN'),
      sub: `/ ${totalCustomers}`,
      subClass: "text-slate-400 text-xs font-medium",
      border: "border-secondary",
    },
    {
      title: "Khách hàng mới",
      value: newCustomers.toString(),
      sub: "Tháng này",
      subClass: "text-tertiary text-xs font-bold",
      border: "border-tertiary",
    },
    {
      title: "Công nợ khách hàng",
      value: (totalDebt / 1000000).toFixed(1),
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