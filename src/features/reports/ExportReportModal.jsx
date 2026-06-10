import { useState } from "react";

const ExportReportModal = ({ isOpen, onClose, onConfirm }) => {
  const [reportType, setReportType] = useState("orders");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      alert("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc");
      return;
    }
    onConfirm({
      type: reportType,
      fromDate,
      toDate,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-surface">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary"></div>
            <h2 className="text-xl font-bold tracking-tight text-on-surface">
              Xuất báo cáo thống kê
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Loại báo cáo
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-3 bg-surface-container-low border border-surface rounded-sm text-sm font-medium focus:ring-2 focus-ring-primary outline-none transition-all"
            >
              <option value="orders">Đơn hàng</option>
              <option value="transactions">Giao dịch gần đây</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Từ ngày
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-3 bg-surface-container-low border border-surface rounded-sm text-sm font-medium focus:ring-2 focus-ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Đến ngày
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-3 bg-surface-container-low border border-surface rounded-sm text-sm font-medium focus:ring-2 focus-ring-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-surface-container-low flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 font-bold text-slate-500 hover:text-on-surface transition-colors rounded-sm"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-primary text-white font-bold rounded-sm shadow-md hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Xác nhận xuất file
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportReportModal;
