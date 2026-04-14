import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="lg:col-span-6 flex flex-col justify-center p-8 md:p-16 bg-surface-container-lowest">
      
      {/* Logo mobile */}
      <div className="mb-10 block lg:hidden">
        <span className="text-3xl font-black text-primary tracking-tighter">
          PLT
        </span>
      </div>

      {/* Header */}
      <header className="mb-10">
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
          Đăng nhập
        </h2>
        <p className="text-on-surface-variant">
          Chào mừng trở lại! Vui lòng nhập thông tin để truy cập hệ thống quản lý.
        </p>
      </header>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Email */}
        <div className="space-y-2">
          <label
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            htmlFor="login_identity"
          >
            Email hoặc Tên đăng nhập
          </label>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">
                person
              </span>
            </div>

            <input
              id="login_identity"
              type="text"
              placeholder="name@company.com"
              className="w-full bg-surface-container-low border-0 border-l-2 border-transparent focus:border-primary focus:ring-0 rounded-lg pl-11 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              htmlFor="login_password"
            >
              Mật khẩu
            </label>

            <a
              href="#"
              className="text-xs font-medium text-secondary hover:text-primary transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">
                lock
              </span>
            </div>

            <input
              id="login_password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-surface-container-low border-0 border-l-2 border-transparent focus:border-primary focus:ring-0 rounded-lg pl-11 py-4 text-on-surface placeholder:text-on-surface-variant/50 transition-all"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-outline-variant bg-surface-container-low"
          />
          <label
            htmlFor="remember_me"
            className="ml-3 text-sm text-on-surface-variant font-medium select-none"
          >
            Duy trì đăng nhập
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dim active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          Đăng nhập hệ thống
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      </form>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-surface-container-high">
        <p className="text-center text-sm text-on-surface-variant">
          Cần tài khoản mới?{" "}
          <a href="#" className="text-primary font-bold hover:underline">
            Liên hệ Quản trị viên
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LoginForm;