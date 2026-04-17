import { useState } from "react";

const mockData = [
  {
    id: 1,
    name: "Ghế Lounge Gỗ Sồi",
    collection: "Bộ sưu tập Xuân 2024",
    sku: "PLT-CH-001",
    quantity: 45,
    location: "Khu A - Kệ 04",
    status: "in_stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnRl0hUpn7lLYEqIn_S07wxLAyA9hpshTK28M3Uu9lQJThawCIM9Z2wS2QoOD87XH5s9qspyoRrzxKSlAIDircyRUMDZdAypbXNCCKyXdq50DC24VrF-tMzeaLyQ0W-gOC-y_qi7ePdSvGXCFjHaoThYF0tY7A6G3FMZ-P_6raTWM39IcSEP1oGUnLace6vK536bx4i0nLFh0FtaHzlCHDhE_kgkqw7QKA2vIHsYYpeGUjvi9q71UhsnhVI6ud_zLjrlNkEubgWRtE",
  },
  {
    id: 2,
    name: "Bàn Làm Việc Industrial",
    collection: "Dòng văn phòng cao cấp",
    sku: "PLT-DK-042",
    quantity: 8,
    location: "Khu B - Kệ 12",
    status: "low_stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkdE3lX3aJAF41qyh7oBAzO94XXRda3RgB-TEBrGA09-eSUaWfWFH-e2uTARWbLv7W3GwirZfqigRWd53Skg0hsEaWVgnVcYvVr9oFX_EcwhWKIqiWZxYZyIpDE4-rgLtVrpHDrxkTGQIfkRya4nJ-J_m5dKw2r7TdVohLPtW-IB3Vcs2n5csww5sls8sk-96OTYG7IxCjCxRIWLNRjAPk3v8gNK0Drmnorv1v9OrysfgT0-GZDj7s-QHE_pKynSdxUURX1Z5JHoUq",
  },
  {
    id: 3,
    name: "Sofa Velvet Xanh Forest",
    collection: "Dòng nội thất phòng khách",
    sku: "PLT-SF-015",
    quantity: 22,
    location: "Khu C - Tầng 1",
    status: "packing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8H1TTsV_8noy06ejokIRo-pInqsvtlStgHu6ZtCMSVxGmdg9U_G0edWeWvGVzK3KPnA82H2QKqrOSgVVuExOY0_Rh6RxXpOxh6hfbQAfWHMuLUlmB1a24qbBiPUH5a-ASs6RaMvusTcupVIHlpEXWdDUEwSjCoXJ6gbNap0BuX6qHD2fSP0f2JR1WFz08xykuaZqYKiuNiPOjajpClY-ZPTz9FEM4TfMZYiItGgxZcRNTCuE9zIUH8dNhV5Ah9Y0whN6c-flNj0m",
  },
];

const statusMap = {
  in_stock: {
    label: "Còn hàng",
    className: "bg-tertiary/10 text-tertiary",
  },
  low_stock: {
    label: "Sắp hết hàng",
    className: "bg-error/10 text-error",
  },
  packing: {
    label: "Chờ đóng gói",
    className: "bg-secondary/10 text-secondary",
  },
};

export default function WarehouseTable() {
  const [data] = useState(mockData);

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-surface-container sm:flex-wrap">
        <h3 className="text-lg font-bold text-on-surface">
          Danh sách Thành phẩm
        </h3>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dim rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Nhập kho mới</span>
          </button>

          <div className="relative w-64 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-high border-none rounded-lg text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              placeholder="Tìm kiếm sản phẩm..."
              type="text"
            />
          </div>

          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>

          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded transition-colors">
            <span className="material-symbols-outlined">sort</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          <thead className="bg-surface-container-low text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            <tr>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Mã SKU</th>
              <th className="px-6 py-4">Số lượng</th>
              <th className="px-6 py-4">Vị trí kho</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container">
            {data.map((item) => {
              const status = statusMap[item.status];

              return (
                <tr
                  key={item.id}
                  className="hover:bg-surface-container-low/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-surface-container flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt="Sản phẩm"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">
                          {item.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {item.collection}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs font-semibold text-outline">
                    {item.sku}
                  </td>

                  <td
                    className={`px-6 py-4 font-bold text-sm ${
                      item.quantity < 10 ? "text-error" : ""
                    }`}
                  >
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-surface-container-high px-2 py-1 rounded w-fit">
                      <span className="material-symbols-outlined text-[14px]">
                        grid_view
                      </span>
                      {item.location}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-1 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination (giữ nguyên UI) */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-surface-container">
        <p className="text-xs text-on-surface-variant font-medium">
          Hiển thị 1 - {data.length} trên 256 sản phẩm
        </p>

        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-surface-container transition-colors disabled:opacity-50">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <button className="w-8 h-8 flex items-center justify-center text-xs font-bold bg-primary text-white rounded">
            1
          </button>

          <button className="w-8 h-8 flex items-center justify-center text-xs font-medium text-on-surface-variant hover:bg-surface-container rounded">
            2
          </button>

          <button className="w-8 h-8 flex items-center justify-center text-xs font-medium text-on-surface-variant hover:bg-surface-container rounded">
            3
          </button>

          <span className="px-2 text-on-surface-variant">...</span>

          <button className="p-1 rounded hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}