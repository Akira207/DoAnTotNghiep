import { useEffect, useState } from "react";
import { updateMaterialImport, deleteMaterialImport } from "../../services/materialImportService";

const MaterialsHistoryEditModal = ({ isOpen, onClose, item, onUpdated }) => {
  const [form, setForm] = useState({
    materialName: "",
    materialType: "",
    quantity: 0,
    unit: "",
    price: 0,
    supplier: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (item && isOpen) {
      setForm({
        materialName: item.materialName || "",
        materialType: item.materialType || "",
        quantity: item.quantity || 0,
        unit: item.unit || "",
        price: item.price || 0,
        supplier: item.supplier || "",
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMaterialImport(item._id, form);
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá bản ghi nhập vật liệu này?")) return;

    setIsDeleting(true);
    try {
      await deleteMaterialImport(item._id);
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Không thể xoá bản ghi này");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Cập nhật lịch sử nhập vật liệu</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-bold">Tên vật liệu</label>
              <input
                className="w-full mt-1 p-2 border rounded"
                value={form.materialName}
                onChange={(e) => setForm({ ...form, materialName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold">Loại vật liệu</label>
              <input
                className="w-full mt-1 p-2 border rounded"
                value={form.materialType}
                onChange={(e) => setForm({ ...form, materialType: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-bold">Nhà cung cấp</label>
              <input
                className="w-full mt-1 p-2 border rounded"
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-bold">Số lượng</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border rounded"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold">Đơn vị</label>
              <input
                className="w-full mt-1 p-2 border rounded"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-bold">Đơn giá</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border rounded"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-error text-white rounded hover:bg-error-dim transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Đang xoá..." : "Xoá bản ghi"}
            </button>

            <div className="flex gap-3">
              <button type="button" onClick={onClose}>
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialsHistoryEditModal;
