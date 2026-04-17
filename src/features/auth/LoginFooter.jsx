const LoginFooter = () => {
  return (
    <footer className="p-6 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">
              support_agent
            </span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              Hỗ trợ kỹ thuật: 1900 88 99
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">
              mail
            </span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              support@plt.vn
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Hướng dẫn sử dụng
          </a>

          <a
            href="#"
            className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Chính sách bảo mật
          </a>

          <span className="text-xs text-on-surface-variant/40">
            v2.4.0 (2024)
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;
