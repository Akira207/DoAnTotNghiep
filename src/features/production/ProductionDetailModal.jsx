import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_FLOW = ["pending", "in-progress", "completed"];

const STATUS_LABEL = {
  pending: "Chờ sản xuất",
  "in-progress": "Đang sản xuất",
  completed: "Hoàn thành",
};

const ProductionDetailModal = ({
  isOpen,
  onClose,
  item,
  onUpdated,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(item?.status);

  useEffect(() => {
    setLocalStatus(item?.status);
    setEditMode(false);
  }, [item]);

  if (!isOpen || !item) return null;

  const product = item.orderDetailId?.productId;

  const image =
    product?.image ||
    product?.thumbnail ||
    product?.images?.[0] ||
    null;

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
  // SAVE UPDATE
  // =========================
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/production-tasks/${item._id}`,
        { status: localStatus }
      );

      setEditMode(false);

      // reload list
      onUpdated?.();

      // close modal
      onClose?.();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">

      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-sm shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-200">

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#007BFF]"></div>
            <h2 className="text-xl font-bold">
              Chi tiết #{item._id?.slice(-6)}
            </h2>
          </div>

          <button onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>

        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">

          <div className="grid grid-cols-12 gap-8">

            {/* IMAGE */}
            <div className="col-span-12 lg:col-span-5">
              <div className="aspect-square bg-slate-100 rounded-sm overflow-hidden">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    Không có ảnh
                  </div>
                )}
              </div>
            </div>

            {/* INFO */}
            <div className="col-span-12 lg:col-span-7 space-y-6">

              {/* STATUS */}
              <div className="p-4 bg-slate-50 border-l-2 border-blue-500">

                <p className="text-xs font-bold text-slate-500">
                  Trạng thái
                </p>

                <p
                  onClick={handleCycleStatus}
                  className="text-lg font-bold text-blue-600 flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {STATUS_LABEL[localStatus]}
                </p>

              </div>

              {/* INFO */}
              <div className="space-y-4">

                <div className="flex justify-between border-b py-2">
                  <span>Kích thước</span>
                  <span className="font-bold">
                    {product?.size || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between border-b py-2">
                  <span>Vật liệu</span>
                  <span className="font-bold">
                    {product?.material || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between border-b py-2">
                  <span>Số lượng</span>
                  <span className="font-bold">
                    {item.orderDetailId?.quantity || 0}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 bg-slate-50 flex justify-between items-center">

          <button onClick={onClose}>
            Đóng
          </button>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-8 py-3 bg-blue-600 text-white"
            >
              Cập nhật trạng thái
            </button>
          ) : (
            <div className="flex gap-3">

              <button
                onClick={() => {
                  setEditMode(false);
                  setLocalStatus(item.status);
                }}
              >
                Huỷ
              </button>

              <button
                onClick={handleSave}
                className="px-8 py-3 bg-green-600 text-white"
              >
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