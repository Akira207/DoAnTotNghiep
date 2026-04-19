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
};

const initialTransactions = [
  {
    id: "TRX-8291",
    title: "Thanh toán Gỗ An Cường",
    subtitle: "Đơn hàng nguyên liệu tháng 9",
    method: "Chuyển khoản VCB",
    time: "14/09/2023 - 09:12",
    amount: -142000000,
    status: "success",
  },
  {
    id: "TRX-8290",
    title: "Cọc dự án Villa Ciputra",
    subtitle: "Khách hàng: Nguyễn Văn A",
    method: "Tiền mặt",
    time: "13/09/2023 - 16:45",
    amount: 450000000,
    status: "success",
  },
  {
    id: "TRX-8289",
    title: "Chi trả lương công nhân xưởng",
    subtitle: "Kỳ lương tháng 08",
    method: "Chuyển khoản loạt",
    time: "10/09/2023 - 08:00",
    amount: -312500000,
    status: "success",
  },
  {
    id: "TRX-8288",
    title: "Phụ kiện Blum - Hafele",
    subtitle: "Nhập hàng linh kiện ray trượt",
    method: "Thẻ tín dụng doanh nghiệp",
    time: "08/09/2023 - 14:22",
    amount: -56800000,
    status: "processing",
  },
];

const formatMoney = (value) =>
  `${value > 0 ? "+" : "-"} ${Math.abs(value).toLocaleString("vi-VN")}`;

export default function RecentTransactions() {
  const [transactions] = useState(initialTransactions);

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
                        statusMap[t.status].class
                      }`}
                    >
                      {statusMap[t.status].label}
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