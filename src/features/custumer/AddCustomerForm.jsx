import { useState } from "react";
import { createCustomer } from "../../services/customerService";

export default function AddCustomerForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    type: "retail",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createCustomer(form);
    onSuccess?.();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 w-[400px] rounded-xl space-y-4">

      <input
        placeholder="Tên"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border px-3 py-2"
      />

      <input
        placeholder="SĐT"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border px-3 py-2"
      />

      <input
        placeholder="Địa chỉ"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full border px-3 py-2"
      />

      <select
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full border px-3 py-2"
      >
        <option value="retail">Khách lẻ</option>
        <option value="agency">Đại lý</option>
      </select>

      <div className="flex gap-2">
        <button type="button" onClick={onClose}>Hủy</button>
        <button type="submit">Thêm</button>
      </div>
    </form>
  );
}