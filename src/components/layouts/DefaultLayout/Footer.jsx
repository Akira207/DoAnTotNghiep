export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t border-primary/5 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500">
          © 2024 Nội Thất Pro. Tất cả các quyền được bảo hộ.
        </p>
        <div className="flex gap-4 md:gap-6">
          <a className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
            Điều khoản dịch vụ
          </a>
          <a className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" href="#">
            Chính sách bảo mật
          </a>
        </div>
      </div>
    </footer>
  );
}