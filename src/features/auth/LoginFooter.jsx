export default function LoginFooter() {
  return (
    <footer className="bg-[#efefff] dark:bg-slate-900 w-full py-8 mt-auto flex flex-col md:flex-row justify-between items-center px-10 gap-4">
      <div className="text-[#0058ba] text-sm opacity-80">
        © 2024 PLT Interior Production Management
      </div>
      <div className="flex gap-6">
        <a className="text-slate-500 text-sm hover:text-[#8c4a00]" href="#">Điều khoản</a>
        <a className="text-slate-500 text-sm hover:text-[#8c4a00]" href="#">Bảo mật</a>
        <a className="text-slate-500 text-sm hover:text-[#8c4a00]" href="#">Hỗ trợ</a>
      </div>
    </footer>
  );
}