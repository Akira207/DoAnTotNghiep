import React from "react";

export default function MaterialsHistoryTable() {
  const data = [
    {
      date: "15/10/2023",
      time: "09:45 AM",
      name: "Gỗ Sồi Mỹ (Oak) - Nhập khẩu",
      type: "Gỗ Tự Nhiên",
      typeClass: "bg-surface-container text-[#007BFF]",
      quantity: "25.0",
      unit: "m3",
      price: "22.000.000",
      supplier: "Wood Source Ltd.",
      supplierCode: "WS",
      total: "550.000.000đ",
    },
    {
      date: "14/10/2023",
      time: "14:20 PM",
      name: "Bản lề giảm chấn Hafele",
      type: "Phụ kiện",
      typeClass: "bg-secondary-container text-on-secondary-container",
      quantity: "500",
      unit: "bộ",
      price: "45.000",
      supplier: "Hafele Vietnam",
      supplierCode: "HF",
      total: "22.500.000đ",
    },
    {
      date: "12/10/2023",
      time: "08:15 AM",
      name: "Sơn PU mờ 50% Inchem",
      type: "Hóa chất",
      typeClass: "bg-tertiary-container text-on-tertiary-container",
      quantity: "80",
      unit: "kg",
      price: "185.000",
      supplier: "Inchem Paints",
      supplierCode: "IN",
      total: "14.800.000đ",
    },
    {
      date: "10/10/2023",
      time: "16:45 PM",
      name: "Ván MDF chống ẩm An Cường",
      type: "Ván công nghiệp",
      typeClass: "bg-surface-container text-[#007BFF]",
      quantity: "120",
      unit: "tấm",
      price: "650.000",
      supplier: "An Cường Wood",
      supplierCode: "AC",
      total: "78.000.000đ",
    },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Thời gian nhập
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Tên vật liệu
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Loại vật liệu
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                Số lượng
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Đơn vị
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                Đơn giá
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Nhà cung cấp
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">
                Thành tiền
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">
                Tác vụ
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-surface-bright transition-colors group"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">
                      {item.date}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {item.time}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm font-semibold text-on-surface">
                    {item.name}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 ${item.typeClass} text-[10px] font-black rounded tracking-wide uppercase`}
                  >
                    {item.type}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm font-bold text-on-surface">
                    {item.quantity}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm text-slate-500 font-medium italic">
                    {item.unit}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm font-medium text-slate-600">
                    {item.price}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {item.supplierCode}
                    </div>
                    <span className="text-sm font-medium text-on-surface">
                      {item.supplier}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm font-black text-[#007BFF]">
                    {item.total}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-center">
                  <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-white flex items-center justify-between border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Hiển thị 10 trong số 48 kết quả
        </p>

        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50"
            disabled
          >
            <span className="material-symbols-outlined text-base">
              chevron_left
            </span>
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-xs font-bold">
            1
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded text-xs font-bold text-slate-600 hover:bg-slate-50">
            2
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded text-xs font-bold text-slate-600 hover:bg-slate-50">
            3
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50">
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}