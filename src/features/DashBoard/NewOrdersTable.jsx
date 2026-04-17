const NewOrdersTable = () => {
  return (
    <>
      <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center">
        <h3 className="text-xl font-black tracking-tight">
          Danh sách đơn hàng mới
        </h3>
        <button className="text-primary font-bold text-sm hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                Mã đơn
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                Khách hàng
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                Sản phẩm
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-on-surface-variant text-right">
                Trị giá
              </th>
              <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-black text-on-surface-variant text-center">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container">
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-8 py-4 font-bold text-primary">#ORD-8821</td>
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-primary">
                    NT
                  </div>
                  <span className="font-semibold text-sm">
                    Nội thất Minh Tâm
                  </span>
                </div>
              </td>
              <td className="px-8 py-4 font-medium text-sm">
                Bàn họp gỗ Walnut (x4)
              </td>
              <td className="px-8 py-4 text-right font-black text-sm">
                145,000,000đ
              </td>
              <td className="px-8 py-4 text-center">
                <span className="bg-secondary-container/30 text-secondary px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                  Đang xử lý
                </span>
              </td>
            </tr>

            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-8 py-4 font-bold text-primary">#ORD-8819</td>
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-secondary">
                    DA
                  </div>
                  <span className="font-semibold text-sm">
                    Dự án Alpha Tower
                  </span>
                </div>
              </td>
              <td className="px-8 py-4 font-medium text-sm">
                Kệ sách âm tường
              </td>
              <td className="px-8 py-4 text-right font-black text-sm">
                320,000,000đ
              </td>
              <td className="px-8 py-4 text-center">
                <span className="bg-tertiary-container/30 text-tertiary px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                  Hoàn thành
                </span>
              </td>
            </tr>

            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-8 py-4 font-bold text-primary">#ORD-8818</td>
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-primary">
                    HL
                  </div>
                  <span className="font-semibold text-sm">
                    Hoàng Lan Decor
                  </span>
                </div>
              </td>
              <td className="px-8 py-4 font-medium text-sm">
                Bộ sofa phòng khách hiện đại
              </td>
              <td className="px-8 py-4 text-right font-black text-sm">
                58,000,000đ
              </td>
              <td className="px-8 py-4 text-center">
                <span className="bg-secondary-container/30 text-secondary px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                  Thiết kế
                </span>
              </td>
            </tr>

            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-8 py-4 font-bold text-primary">#ORD-8815</td>
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-error-container/20 flex items-center justify-center text-[10px] font-bold text-error">
                    KG
                  </div>
                  <span className="font-semibold text-sm">
                    Kiến Gia Group
                  </span>
                </div>
              </td>
              <td className="px-8 py-4 font-medium text-sm">
                Hệ tủ bếp Module căn hộ
              </td>
              <td className="px-8 py-4 text-right font-black text-sm">
                210,000,000đ
              </td>
              <td className="px-8 py-4 text-center">
                <span className="bg-error-container/20 text-error px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                  Tạm dừng
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NewOrdersTable;