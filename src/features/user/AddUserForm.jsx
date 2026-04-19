import { useEffect, useState } from "react";

export default function AddUserForm({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "worker",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        password: "",
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        role: initialData.role || "worker",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
      {/* modal */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">

        {/* header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">
            {isEdit ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
          </h3>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* username */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="VD: nguyenvana"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
              required
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Mật khẩu <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder={isEdit ? "Để trống nếu không đổi" : "••••••••"}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* name */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Họ và tên
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="VD: Nguyễn Văn A"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@plt.vn"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
            />
          </div>

          {/* phone + role */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Số điện thoại
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0901 234 567"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Vai trò
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
              >
                <option value="worker">Công nhân</option>
                <option value="admin">Admin</option>
                <option value="accountant">Kế toán</option>
              </select>
            </div>
          </div>

          {/* address */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Địa chỉ
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="VD: 123 Đường ABC..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
            />
          </div>

          {/* buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary-dim"
            >
              {isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}