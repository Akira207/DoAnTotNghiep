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

const formatMoney = (value, type) => {
  if (value === 0) return "0 ₫";
  const formatted = Math.abs(value).toLocaleString("vi-VN") + " ₫";
  return type === "income" ? `+ ${formatted}` : `- ${formatted}`;
};

export default function RecentTransactions({ payments = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Calculate pagination
  const totalPages = Math.ceil(payments.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const transactions = payments
    .slice(startIndex, endIndex)
    .map(payment => ({
      id: payment._id,
      displayId: payment._id?.substring(0, 6)?.toUpperCase() || "N/A",
      title: payment.paymentMethod || "Thanh toán",
      subtitle: payment.note || (payment.type === "expense" ? "Chi phí nhập kho" : "Thu tiền đơn hàng"),
      method: payment.paymentMethod || "Chuyển khoản",
      time: new Date(payment.createdAt || new Date()).toLocaleString('vi-VN'),
      amount: payment.amount || 0,
      type: payment.type || "income",
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
            <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
              <tr>
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
                    #{t.displayId}
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
                      t.type === "income" ? "text-tertiary" : "text-error"
                    }`}
                  >
                    {formatMoney(t.amount, t.type)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-surface-container flex items-center justify-between bg-slate-50/50">
            <p className="text-xs text-on-surface-variant font-medium">
              Trang {currentPage} / {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-xs font-bold rounded-sm border border-surface-container bg-white disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Trước
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs font-bold rounded-sm border border-surface-container bg-white disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
