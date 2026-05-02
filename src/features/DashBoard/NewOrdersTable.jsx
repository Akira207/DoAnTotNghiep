import { useState } from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return { bg: "bg-tertiary-container/30", text: "text-tertiary", label: "Hoàn thành" };
    case "in-progress":
      return { bg: "bg-secondary-container/30", text: "text-secondary", label: "Đang xử lý" };
    case "pending":
      return { bg: "bg-secondary-container/30", text: "text-secondary", label: "Thiết kế" };
    case "paused":
      return { bg: "bg-error-container/20", text: "text-error", label: "Tạm dừng" };
    case "waiting_payment":
      return { bg: "bg-error-container/20", text: "text-error", label: "Chờ thanh toán" };
    default:
      return { bg: "bg-surface-container/30", text: "text-on-surface-variant", label: status };
  }
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .slice(-2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
};

const NewOrdersTable = ({ orders = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Pagination logic
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayOrders = orders.slice(startIndex, endIndex);

  if (!orders.length) {
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
        <div className="p-8 text-center text-on-surface-variant">
          Chưa có đơn hàng nào
        </div>
      </>
    );
  }

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
            {displayOrders.map((order) => {
              const statusInfo = getStatusColor(order.status);
              const customerName = order.customerId?.name || "N/A";
              const initials = getInitials(customerName);

              return (
                <tr key={order._id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-8 py-4 font-bold text-primary">
                    #{order._id?.substring(0, 6)?.toUpperCase() || "N/A"}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-primary">
                        {initials || "?"}
                      </div>
                      <span className="font-semibold text-sm">
                        {customerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 font-medium text-sm">
                    {order.productName || "Sản phẩm"}
                  </td>
                  <td className="px-8 py-4 text-right font-black text-sm">
                    {order.totalAmount?.toLocaleString("vi-VN") || 0}đ
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className={`${statusInfo.bg} ${statusInfo.text} px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap`}>
                      {statusInfo.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-8 py-4 border-t border-surface-container flex justify-between items-center bg-slate-50/50">
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
    </>
  );
};

export default NewOrdersTable;