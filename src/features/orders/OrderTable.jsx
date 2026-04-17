import { useState, useMemo } from "react";

const statusMap = {
  processing: {
    label: "Đang sản xuất",
    class: "bg-secondary-container text-on-secondary-container",
  },
  done: {
    label: "Hoàn thành",
    class: "bg-tertiary-container text-on-tertiary-container",
  },
  pending: {
    label: "Chờ xử lý",
    class: "bg-surface-container-high text-on-surface-variant",
  },
};

// fake data
const initialOrders = [
  {
    id: "PLT-2401",
    customer: "Nguyễn Lam",
    customerCode: "NL",
    product: "Bàn ăn gỗ sồi Artisan",
    date: "12/10/2023",
    status: "processing",
    price: 24500000,
  },
  {
    id: "PLT-2402",
    customer: "Trần Hoàng",
    customerCode: "TH",
    product: "Tủ bếp Modular Elite",
    date: "14/10/2023",
    status: "done",
    price: 112000000,
  },
  {
    id: "PLT-2403",
    customer: "Phạm Hương",
    customerCode: "PH",
    product: "Ghế bành da bò Ý",
    date: "15/10/2023",
    status: "pending",
    price: 18200000,
  },
];

export default function OrderTable({ page, limit }) {
  const [orders] = useState(initialOrders);

  // paginate logic
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return orders.slice(start, end);
  }, [page, limit, orders]);

  return (
    <div className="mt-6 overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">

      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Mã đơn</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Khách hàng</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Sản phẩm</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Ngày đặt</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-black uppercase text-slate-500">Giá trị</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedOrders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">

                <td className="px-6 py-5 font-bold text-primary">
                  #{o.id}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container text-xs font-bold text-primary">
                      {o.customerCode}
                    </div>
                    <span className="font-semibold text-slate-900">
                      {o.customer}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-on-surface-variant">
                  {o.product}
                </td>

                <td className="px-6 py-5 text-on-surface-variant">
                  {o.date}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase md:text-xs ${
                      statusMap[o.status].class
                    }`}
                  >
                    {statusMap[o.status].label}
                  </span>
                </td>

                <td className="px-6 py-5 text-right font-black text-slate-900">
                  {o.price.toLocaleString("vi-VN")}đ
                </td>

                <td className="px-6 py-5 text-right">
                  <button className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="divide-y divide-slate-100 md:hidden">
        {paginatedOrders.map((o) => (
          <div key={o.id} className="p-6">

            <div className="mb-4 flex justify-between gap-4">
              <div className="min-w-0">
                <span className="text-xs font-black text-slate-400">
                  #{o.id}
                </span>
                <h3 className="truncate text-lg font-black text-slate-900">
                  {o.product}
                </h3>
              </div>

              <span
                className={`h-fit rounded px-2 py-0.5 text-[10px] font-black uppercase ${
                  statusMap[o.status].class
                }`}
              >
                {statusMap[o.status].label}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Khách hàng</span>
                <span className="font-semibold">{o.customer}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-surface-variant">Ngày đặt</span>
                <span>{o.date}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
              <span className="text-lg font-black text-primary">
                {o.price.toLocaleString("vi-VN")}đ
              </span>

              <button className="rounded bg-primary-container/20 p-2 text-primary">
                <span className="material-symbols-outlined text-sm">
                  visibility
                </span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}