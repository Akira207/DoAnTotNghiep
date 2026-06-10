import { useEffect, useState } from "react";
import api from "../../services/api";
import { getCurrentUser } from "../../services/authService";

const STATUS_FLOW = ["pending", "in-progress", "completed"];

const STATUS_LABEL = {
  pending: "Chờ sản xuất",
  "in-progress": "Đang sản xuất",
  completed: "Hoàn thành",
};

const ProductionDetailModal = ({ isOpen, onClose, item, onUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(item?.status);
  const user = getCurrentUser();
  const isAuthorizedToUpdate = user?.role === "admin" || user?.role === "worker";
  const isAuthorizedToDelete = user?.role === "admin" || user?.role === "accountant";

  useEffect(() => {
    setLocalStatus(item?.status);
    setEditMode(false);
  }, [item]);

  if (!isOpen || !item) return null;

  const product = item.product || null;

  const image =
    product?.image || product?.thumbnail || product?.images?.[0] || null;

  // =========================
  // FORMAT SIZE
  // =========================
  const formatSize = () => {
    if (item.specs && (item.specs.height || item.specs.width || item.specs.depth)) {
      const h = item.specs.height || "0";
      const w = item.specs.width || "0";
      const d = item.specs.depth || "0";
      return `Cao ${h} x Ngang ${w} x Sâu ${d}`;
    }
    if (product && (product.height || product.width || product.depth)) {
      const h = product.height || "0";
      const w = product.width || "0";
      const d = product.depth || "0";
      return `Cao ${h} x Ngang ${w} x Sâu ${d}`;
    }
    return "N/A";
  };

  // =========================
  // CYCLE STATUS
  // =========================
  const handleCycleStatus = () => {
    if (!editMode) return;

    const index = STATUS_FLOW.indexOf(localStatus);
    const next = STATUS_FLOW[(index + 1) % STATUS_FLOW.length];
    setLocalStatus(next);
  };

  // =========================
  // DELETE TASK
  // =========================
  const handleDelete = async () => {
    if (item?.status === "completed") {
      alert("Lệnh sản xuất đã hoàn thành, không thể xoá");
      return;
    }

    if (!user?.role || (user.role !== "admin" && user.role !== "accountant")) {
      alert("Bạn không có quyền xoá lệnh sản xuất này");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn xóa lệnh sản xuất này không?")) return;

    try {
      await api.delete(`/production-tasks/${item._id}`);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      const errorMessage = err.response?.data?.message || "Không thể xóa lệnh sản xuất này.";
      alert(errorMessage);
    }
  };

  // =========================
  // SAVE UPDATE
  // =========================
  const handleSave = async () => {
    try {
      await api.put(
        `/production-tasks/${item._id}`,
        { status: localStatus },
      );

      setEditMode(false);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Cập nhật thất bại";
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[921px] rounded-sm shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-surface">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#007BFF]"></div>
            <h2 className="text-xl font-bold tracking-tight text-on-surface">
              Chi tiết Lệnh Sản xuất #{item._id?.slice(-6)}
            </h2>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Product Visual */}
            <div className="col-span-12 lg:col-span-5">
              <div className="aspect-square bg-surface-container rounded-sm overflow-hidden group">
                {image ? (
                  <img
                    src={image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Product"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    Không có ảnh
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 p-4 bg-surface-container-low rounded-sm text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Mã SP
                  </p>
                  <p className="font-bold text-on-surface">
                    {product?.sku || product?.name || "N/A"}
                  </p>
                </div>
                <div className="flex-1 p-4 bg-surface-container-low rounded-sm text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Màu sơn
                  </p>
                  <p className="font-bold text-on-surface">
                    {product?.color || "Natural PU"}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-low border-l-2 border-primary-container">
                  <p className="text-xs font-bold text-slate-500 mb-1">Đợt</p>
                  <p className="text-lg font-bold text-on-surface">
                    {item.batch || 1}
                  </p>
                </div>
                <div className={`p-4 border-l-2 transition-all duration-300 ${editMode ? 'bg-secondary-container/20 border-secondary ring-2 ring-secondary/30' : 'bg-surface-container-low border-blue-500'}`}>
                  <p className="text-xs font-bold text-slate-500 mb-1">Trạng thái</p>
                  <p
                    onClick={handleCycleStatus}
                    className={`text-lg font-bold flex items-center gap-2 transition-all ${editMode ? 'text-secondary cursor-pointer hover:opacity-80 active:scale-95' : 'text-blue-600'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${editMode ? 'bg-secondary' : 'bg-blue-500'}`}></span>
                    {STATUS_LABEL[localStatus]}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-surface">
                  <span className="text-slate-500 font-medium">Kích thước</span>
                  <span className="font-bold text-on-surface">
                    {formatSize()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-surface">
                  <span className="text-slate-500 font-medium">Vật liệu</span>
                  <span className="font-bold text-on-surface">
                    {product?.material || item.material || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-surface">
                  <span className="text-slate-500 font-medium">Số lượng</span>
                  <span className="font-bold text-on-surface text-lg">
                    {item.quantity || 0} bộ
                  </span>
                </div>
              </div>

              <div className="p-5 bg-surface-container-highest/30 rounded-sm">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="material-symbols-outlined text-sm">assignment</span>
                  <h4 className="text-xs font-bold uppercase tracking-widest">
                    Ghi chú kỹ thuật
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant font-medium">
                  {item.note || "Không có ghi chú kỹ thuật."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 font-bold text-slate-500 hover:text-on-surface transition-colors rounded-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
              Đóng
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 font-bold text-red-500 hover:text-red-700 transition-colors rounded-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
              Xóa
            </button>
          </div>

          {!editMode ? (
            <button
              disabled={item.status === "completed" || !isAuthorizedToUpdate}
              onClick={() => setEditMode(true)}
              className={`px-10 py-3 font-bold rounded-sm shadow-lg transition-all flex items-center gap-2 ${
                item.status === "completed" || !isAuthorizedToUpdate
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-xl hover:-translate-y-0.5"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>sync</span>
              {item.status === "completed" ? "Đã hoàn thành" : (!isAuthorizedToUpdate ? "Không có quyền cập nhật" : "Cập nhật trạng thái")}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditMode(false);
                  setLocalStatus(item.status);
                }}
                className="px-6 py-3 font-bold text-slate-500 hover:text-on-surface transition-colors rounded-sm"
              >
                Huỷ
              </button>

              <button
                onClick={handleSave}
                className="px-10 py-3 bg-green-600 text-white font-bold rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Lưu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionDetailModal;
