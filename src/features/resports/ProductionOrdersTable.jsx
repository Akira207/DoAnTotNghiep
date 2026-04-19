export default function ProductionOrdersTable() {
  const orders = [
    {
      id: "LSX-2023-089",
      product: "Bộ bàn ăn Gỗ Sồi 8 ghế",
      customer: "Chung cư Landmark 81",
      value: 85000000,
      status: "processing",
    },
    {
      id: "LSX-2023-090",
      product: "Tủ bếp Acrylic cao cấp",
      customer: "Biệt thự Vinhomes Riverside",
      value: 142500000,
      status: "waiting",
    },
    {
      id: "LSX-2023-091",
      product: "Hệ tủ âm tường Phòng ngủ",
      customer: "Căn hộ Metropole Thủ Thiêm",
      value: 45200000,
      status: "done",
    },
  ];

  const statusMap = {
    processing: {
      label: "Đang sản xuất",
      class:
        "bg-blue-50 text-[#0058BA] border border-blue-100",
    },
    waiting: {
      label: "Chờ vật tư",
      class:
        "bg-orange-50 text-orange-600 border border-orange-100",
    },
    done: {
      label: "Hoàn thành",
      class:
        "bg-green-50 text-green-700 border border-green-100",
    },
  };

  return (
    <section className="mt-8 bg-white rounded-sm shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h4 className="text-lg font-black text-slate-900 tracking-tight">
          Danh sách Lệnh Sản xuất mới nhất
        </h4>

        <button className="text-[#0058BA] text-xs font-bold hover:underline">
          Xem tất cả
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                Mã lệnh
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                Sản phẩm
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                Khách hàng
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-right">
                Giá trị (VNĐ)
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {orders.map((o) => (
              <tr
                key={o.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-bold text-[#0058BA] whitespace-nowrap">
                  {o.id}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                  {o.product}
                </td>

                <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                  {o.customer}
                </td>

                <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right whitespace-nowrap">
                  {o.value.toLocaleString("vi-VN")}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase ${
                      statusMap[o.status].class
                    }`}
                  >
                    {statusMap[o.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}