import { useState } from "react";

const statusMap = {
  success: {
    label: "Thành công",
    class: "bg-tertiary-container text-on-tertiary-container",
  },
  processing: {
    label: "Đang xử lý",
    class: "bg-secondary-container text-on-secondary-container",
  },
  completed: {
    label: "Hoàn thành",
    class: "bg-tertiary-container text-on-tertiary-container",
  },
  pending: {
    label: "Chờ xử lý",
    class: "bg-secondary-container text-on-secondary-container",
  },
};

const getStatusInfo = (status) => {
  return statusMap[status] || {
    label: status || "Chờ xử lý",
    class: "bg-surface-container text-on-surface-variant",
  };
};

const formatMoney = (value) =>
  `${value > 0 ? "+" : "-"} ${Math.abs(value).toLocaleString("vi-VN")}`;

export default function RecentTransactions({ payments = [] }) {
  // Format payments data to match transaction structure
  const transactions = payments.slice(0, 10).map(payment => ({
    id: payment._id?.substring(0, 6)?.toUpperCase() || "N/A",
    title: payment.paymentMethod || "Thanh toán",
    subtitle: payment.note || "Giao dịch",
    method: payment.paymentMethod || "Chuyển khoản",
    time: new Date(payment.createdAt || new Date()).toLocaleString('vi-VN'),
    amount: payment.amount || 0,
    status: payment.status || "pending",
  }));

  if (!transactions.length) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-surface-container p-6 text-center">
        <p className="text-on-surface-variant">Chưa có giao dịch nào</p>
      </div>
    );
  }

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-bold text-on-surface">
          Giao dịch gần đây
        </h5>

        <button className="text-primary font-semibold text-sm hover:underline">
          Xem tất cả
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Mã giao dịch</th>
                <th className="px-6 py-4 font-bold">Nội dung</th>
                <th className="px-6 py-4 font-bold">Phương thức</th>
                <th className="px-6 py-4 font-bold">Thời gian</th>
                <th className="px-6 py-4 font-bold text-right">Số tiền</th>
                <th className="px-6 py-4 font-bold">Trạng thái</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-container">
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50 transition-colors"
                >

                  <td className="px-6 py-4 font-mono text-xs text-primary font-bold">
                    #{t.id}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-sm">{t.title}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      {t.subtitle}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium">
                    {t.method}
                  </td>

                  <td className="px-6 py-4 text-xs">
                    {t.time}
                  </td>

                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      t.amount > 0 ? "text-tertiary" : "text-error"
                    }`}
                  >
                    {formatMoney(t.amount)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                        getStatusInfo(t.status).class
                      }`}
                    >
                      {getStatusInfo(t.status).label}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}