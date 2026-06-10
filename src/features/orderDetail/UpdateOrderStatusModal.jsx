import { useState, useEffect } from "react";
import api from "../../services/api";

const API = "http://localhost:5000/api";

export default function UpdateOrderStatusModal({
  isOpen,
  onClose,
  orderId,
  onSuccess,
}) {
  const [status, setStatus] = useState("pending");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStatus("pending");
      setAmount("");
      setMethod("cash");
      setNote("");
      setCancelReason("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      // validate
      if (status === "cancelled" && !cancelReason.trim()) {
        alert("Vui lòng nhập lý do huỷ");
        return;
      }

      if (!orderId) {
        alert("Không tìm thấy ID đơn hàng");
        return;
      }

      // 👉 CREATE PAYMENT FIRST (nếu có)
      if (amount && Number(amount) > 0) {
        await api.post(`/payments`, {
          orderId,
          amount: Number(amount),
          paymentMethod: method,
        });
      }

      // 👉 UPDATE ORDER SECOND
      await api.put(`/orders/${orderId}`, {
        status,
        note: status === "cancelled" ? cancelReason : note,
      });

      alert("Cập nhật thành công!");

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      const errorMessage = err.response?.data?.message || "Cập nhật thất bại";
      alert(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary tracking-tight">
            Cập nhật Trạng thái Đơn hàng
          </h3>

          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* STATUS */}
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1.5">
              Trạng thái mới
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-surface-container-low p-3 border-outline-variant/30 rounded-lg text-sm focus:border-primary focus:ring-primary"
            >
              <option value="pending">Chờ sản xuất</option>
              <option value="producing">Đang sản xuất</option>
              <option value="transporting">Vận chuyển</option>
              <option value="waiting_payment">Chờ thanh toán</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Huỷ</option>
            </select>
          </div>

          {/* PAYMENT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block p-3 text-xs font-bold uppercase text-on-surface-variant mb-1.5">
                Số tiền thanh toán thêm
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền trả thêm (nếu có)..."
                className="w-full bg-surface-container-low p-3 border-outline-variant/30 rounded-lg text-sm focus:border-primary focus:ring-primary"
              />
              <p className="text-[10px] text-on-surface-variant mt-1 px-1">
                Chỉ nhập số tiền thanh toán mới, không nhập lại tiền đặt cọc.
              </p>
            </div>

            <div>
              <label className="block text-xs p-3 font-bold uppercase text-on-surface-variant mb-1.5">
                Phương thức
              </label>

              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-surface-container-low p-3 border-outline-variant/30 rounded-lg text-sm focus:border-primary focus:ring-primary"
              >
                <option value="bank">Chuyển khoản</option>
                <option value="cash">Tiền mặt</option>
                <option value="card">Quẹt thẻ</option>
              </select>
            </div>
          </div>

          {/* NOTE */}
          <div>
            <label className="block p-3 text-xs font-bold uppercase text-on-surface-variant mb-1.5">
              Ghi chú
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="3"
              placeholder="Nhập ghi chú..."
              className="w-full bg-surface-container-low p-3 border-outline-variant/30 rounded-lg text-sm focus:border-primary focus:ring-primary"
            />
          </div>

          {/* CANCEL */}
          {status === "cancelled" && (
            <div>
              <label className="block text-xs font-bold uppercase text-error mb-1.5">
                Lý do hủy (Bắt buộc)
              </label>

              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows="2"
                placeholder="Nhập lý do huỷ..."
                className="w-full bg-error-container/10 border-error/30 rounded-lg text-sm focus:border-error focus:ring-error"
              />
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container-high rounded"
          >
            Huỷ
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-bold bg-primary text-white rounded shadow-lg hover:opacity-90"
          >
            Cập nhật
          </button>
        </div>

      </div>
    </div>
  );
}