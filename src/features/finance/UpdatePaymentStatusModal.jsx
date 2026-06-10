import { useState, useEffect } from "react";
import api from "../../services/api";

export default function UpdatePaymentStatusModal({
  isOpen,
  onClose,
  payment,
  onSuccess,
}) {
  const [updateStatus, setUpdateStatus] = useState("pending");

  useEffect(() => {
    if (payment) {
      setUpdateStatus(payment.status || "pending");
    }
  }, [payment]);

  const handleUpdateStatus = async () => {
    try {
      await api.put(`/payments/${payment._id}`, {
        status: updateStatus,
      });
      alert("Cập nhật trạng thái thành công!");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Cập nhật Trạng thái Giao dịch</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
              Trạng thái mới
            </label>
            <select
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
              className="w-full border p-2 rounded-lg text-sm focus:border-primary focus:ring-primary outline-none"
            >
              <option value="pending">Chờ xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="failed">Thất bại</option>
            </select>
          </div>
          <div className="text-xs text-slate-400">
            Mã giao dịch: #{payment?._id?.substring(0, 6).toUpperCase()}
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
            Huỷ
          </button>
          <button onClick={handleUpdateStatus} className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg shadow-md hover:opacity-90 transition-all">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
