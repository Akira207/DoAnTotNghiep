import { useState } from "react";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";

export default function OrderDetailHeader({ order, payment, onReload }) {
  const [openModal, setOpenModal] = useState(false);

  const orderCode = order?.orderCode || order?._id || "PLT-2401";

  const deposit = payment?.amount || 0;
  const isDeposited = deposit > 0;

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Chờ sản xuất";
      case "producing":
        return "Đang sản xuất";
      case "transporting":
        return "Vận chuyển";
      case "waiting_payment":
        return "Chờ thanh toán";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã huỷ";
      default:
        return "Chưa xác định";
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* LEFT */}
        <div>
          <nav className="flex items-center text-xs text-slate-500 font-medium mb-2 gap-1">
            <span>PLT Management</span>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
            <span>Đơn hàng</span>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>

            <span className="text-primary font-bold">
              Chi tiết đơn hàng {orderCode}
            </span>
          </nav>

          <h2 className="text-3xl font-black text-primary mb-2">
            Đơn hàng {orderCode}
          </h2>

          <div className="flex items-center gap-4 text-sm font-medium">
            {/* PAYMENT */}
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                isDeposited
                  ? "bg-secondary-container text-on-secondary-container"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDeposited ? "bg-secondary" : "bg-on-surface-variant"
                }`}
              ></span>

              {isDeposited ? "Đã đặt cọc" : "Chưa đặt cọc"}
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-2 px-3 py-1 bg-error-container/10 text-error rounded-lg">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              {getStatusLabel(order?.status)}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest font-bold rounded">
            <span className="material-symbols-outlined text-lg">print</span>
            In đơn hàng
          </button>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded shadow-lg shadow-primary/20 active:opacity-80"
          >
            Cập nhật trạng thái
          </button>
        </div>
      </div>

      {/* ✅ MODAL */}
      <UpdateOrderStatusModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        orderId={order?._id}
        onSuccess={onReload} // 🔥 không reload nữa
      />
    </>
  );
}
