export default function LoginForm() {
  return (
    <div className="w-full max-w-[440px] animate-fade-in">
      <div className="bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 rounded-xl border border-primary/10 p-6 md:p-10">
        
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
            Đăng nhập
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Hệ thống Quản lý Sản xuất Nội thất chuyên nghiệp
          </p>
        </div>

        <form className="space-y-4 md:space-y-5">
          
          {/* Account */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="account">
              Email hoặc Tên đăng nhập
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                person
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 md:py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base"
                id="account"
                placeholder="example@noithatpro.vn"
                type="text"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">
                Mật khẩu
              </label>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                lock
              </span>
              <input
                className="w-full pl-10 pr-12 py-3 md:py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm md:text-base"
                id="password"
                placeholder="••••••••"
                type="password"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">
                  visibility
                </span>
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  className="peer appearance-none h-5 w-5 border-2 border-slate-300 dark:border-slate-600 rounded checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 transition-all"
                  type="checkbox"
                />
                <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 pointer-events-none">
                  check
                </span>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                Ghi nhớ đăng nhập
              </span>
            </label>

            <a className="text-sm font-semibold text-primary hover:underline underline-offset-4" href="#">
              Quên mật khẩu?
            </a>
          </div>

          {/* Button */}
          <button
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 md:py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
            type="submit"
          >
            Đăng nhập
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 md:my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>

        {/* SSO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <img
              alt="Google"
              className="w-4 h-4"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6PYEZi1hx82rU9HullkRR3kruP-lWXB0WctRlJk_8Kf5ZGjRg9ozDogEzZ6QUI24gPSFSUNumDi2oyZLgEIpNfjfkM-NwBzbicsE8adxZHWuSQCvwK7R2rW_LJRUn2Fh5M2NmIvypvhG9Ln8e5cC9AQ7Ncjv1g6b8_NOS0hYybkhguJI7Lw6Z6M46c8Nr-G1_d78QQ7JZOUd6lkl9BAttsStbOLFTWaDENhoMW28FzMTEndPjSh4KxFp189IoYkiSXyf0XvzKEs-N"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Google
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-primary text-xl">
              foundation
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Microsoft
            </span>
          </button>
        </div>
      </div>

      {/* Bottom */}
      <p className="mt-6 md:mt-8 text-center text-slate-500 dark:text-slate-400 text-sm px-4">
        Bạn chưa có tài khoản?{" "}
        <a className="text-primary font-semibold hover:underline underline-offset-4" href="#">
          Liên hệ quản trị viên
        </a>
      </p>
    </div>
  );
}