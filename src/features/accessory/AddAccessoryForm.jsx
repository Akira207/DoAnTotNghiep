import { useState, useEffect } from "react";
import {
  createAccessory,
  updateAccessory,
  deleteAccessory,
} from "../../services/accessoryService";

export default function AddAccessoryForm({
  accessory,
  onClose,
  onSuccess,
}) {
  const isEdit = !!accessory;

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
  });

  // =========================
  // INIT / RESET
  // =========================
  useEffect(() => {
    if (accessory) {
      setForm({
        name: accessory.name || "",
        type: accessory.type || "",
        price: accessory.price || "",
        description: accessory.description || "",
      });
    } else {
      setForm({
        name: "",
        type: "",
        price: "",
        description: "",
      });
    }
  }, [accessory]);

  // =========================
  // INPUT
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateAccessory(accessory._id, form);
      } else {
        await createAccessory(form);
      }

      alert(isEdit ? "Cập nhật thành công" : "Thêm thành công");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Lỗi!");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    if (!window.confirm("Xóa phụ kiện này?")) return;

    try {
      await deleteAccessory(accessory._id);
      alert("Đã xóa");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-white rounded-xl w-[400px]"
    >
      <h2 className="text-lg font-bold">
        {isEdit ? "Chỉnh sửa phụ kiện" : "Thêm phụ kiện"}
      </h2>

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tên phụ kiện"
        className="w-full px-4 py-2 border rounded"
        required
      />

      {/* TYPE */}
      <input
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Loại phụ kiện (vd: bản lề, tay nắm, ...)"
        className="w-full px-4 py-2 border rounded"
      />

      {/* PRICE */}
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Giá"
        className="w-full px-4 py-2 border rounded"
        required
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Mô tả"
        className="w-full px-4 py-2 border rounded h-24 resize-none"
      />

      {/* ACTION */}
      <div className="flex gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-200 py-2 rounded font-semibold hover:bg-gray-300 transition"
        >
          Hủy
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition"
          >
            Xóa
          </button>
        )}

        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {isEdit ? "Cập nhật" : "Thêm"}
        </button>
      </div>
    </form>
  );
}
