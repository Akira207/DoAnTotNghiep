import { useState } from "react";

export default function MaterialsImportModal({
  open,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    materialName: "",
    materialType: "",
    quantity: "",
    unit: "",
    price: "",
    supplier: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // 🔥 validate
  const validate = () => {
    let err = {};

    if (!form.materialName.trim()) err.materialName = "Bắt buộc nhập tên vật liệu";
    if (!form.quantity || Number(form.quantity) <= 0)
      err.quantity = "Số lượng phải > 0";
    if (!form.price || Number(form.price) <= 0)
      err.price = "Đơn giá phải > 0";
    if (!form.supplier.trim()) err.supplier = "Bắt buộc nhập nhà cung cấp";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // 🔥 change input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 submit
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await onSubmit({
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });

      // reset form
      setForm({
        materialName: "",
        materialType: "",
        quantity: "",
        unit: "",
        price: "",
        supplier: "",
        note: "",
      });

      setErrors({});
      onClose();
    } catch (err) {
      alert("Tạo phiếu nhập thất bại");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-[520px] rounded-xl p-6 space-y-4 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Nhập kho mới</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          <input
            name="materialName"
            placeholder="Tên vật liệu"
            value={form.materialName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.materialName && (
            <p className="text-red-500 text-xs">{errors.materialName}</p>
          )}

          <input
            name="materialType"
            placeholder="Loại vật liệu"
            value={form.materialType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="quantity"
            type="number"
            placeholder="Số lượng"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs">{errors.quantity}</p>
          )}

          <input
            name="unit"
            placeholder="Đơn vị (kg, cái, tấm...)"
            value={form.unit}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            placeholder="Đơn giá"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price}</p>
          )}

          <input
            name="supplier"
            placeholder="Nhà cung cấp"
            value={form.supplier}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.supplier && (
            <p className="text-red-500 text-xs">{errors.supplier}</p>
          )}

          <textarea
            name="note"
            placeholder="Ghi chú (tuỳ chọn)"
            value={form.note}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Huỷ
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>

      </div>
    </div>
  );
}