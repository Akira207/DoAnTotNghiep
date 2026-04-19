import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { login: authLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({
        username: form.username,
        password: form.password,
      });

      console.log("LOGIN SUCCESS:", res);

      if (!res?.token) {
        throw new Error("No token returned");
      }

      authLogin(res);

      if (res.user.role === "worker") {
        navigate("/production", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError(
        err?.response?.data?.message || err.message || "Đăng nhập thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-7 p-8 lg:p-20 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <span className="material-symbols-outlined text-primary text-3xl">
            factory
          </span>
          <span className="text-on-surface text-xl font-black tracking-tighter">
            PLT Interior
          </span>
        </div>

        {/* Title */}
        <div className="mb-10">
          <h2 className="text-on-surface text-3xl font-bold tracking-tight mb-2">
            Chào mừng trở lại
          </h2>
          <p className="text-on-surface-variant font-medium">
            Đăng nhập để quản lý quy trình sản xuất của bạn.
          </p>
        </div>

        {/* ERROR (KHÔNG ĐỔI UI) */}
        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant uppercase">
              Tên đăng nhập
            </label>
            <div className="relative flex items-center bg-surface-container-low rounded-lg group">
              <div className="px-4 text-on-surface-variant group-focus-within:text-primary">
                <span className="material-symbols-outlined">person</span>
              </div>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="admin.plt"
                className="w-full bg-transparent py-4 px-2 outline-none text-on-surface"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-on-surface-variant uppercase">
                Mật khẩu
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <div className="relative flex items-center bg-surface-container-low rounded-lg group">
              <div className="px-4 text-on-surface-variant group-focus-within:text-primary">
                <span className="material-symbols-outlined">lock</span>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent py-4 px-2 outline-none text-on-surface"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="ml-3 text-sm text-on-surface-variant">
              Ghi nhớ đăng nhập
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}

            {!loading && (
              <span className="material-symbols-outlined">arrow_forward</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-surface-container flex justify-between items-center">
          <span className="text-sm text-on-surface-variant">
            Chưa có tài khoản?
          </span>
          <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-white">
            Liên hệ Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
