export default function LoginLeftPanel() {
  return (
    <div className="hidden lg:flex lg:col-span-6 bg-inverse-surface relative overflow-hidden flex-col justify-between p-12">
      
      <div className="z-10">
        <div className="text-4xl font-black text-white tracking-tighter mb-4">
          PLT
        </div>
        <h1 className="text-white text-3xl font-bold leading-tight tracking-tight max-w-sm">
          Quản lý Xưởng Sản xuất Nội thất.
        </h1>
      </div>

      <div className="z-10 space-y-6">
        <Feature icon="architecture" title="Quy trình nghệ nhân" desc="Tối ưu hóa từng công đoạn sản xuất mộc và hoàn thiện." />
        <Feature icon="dashboard_customize" title="Báo cáo thời gian thực" desc="Theo dõi tiến độ đơn hàng chính xác đến từng centimet." />
      </div>

      <img
        alt="Interior Design Workshop"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVOvbwMm3sUnh9DZODG-qKHupkPvyPLGmeaB0A43sESO1HmXN7JdaOkq8GY7Xt0p4f4fjKa76a0AnIYoS3s8GAAOUz2j1sRvwydC7mZmgKzX-DWYQxB4JNmpCZ3R1ttU1GRGzGF96p1yNklP-CJ5COnkmJbch8xC757kMHHWvi-VKd_aFOScRF9r3GR1VNBGmpb_YVzpYrVfxueT2qne43R57j5jcteRqA4EXbxoql7AFe49j6zleQNVImnUGgcveou7fl1fHB2mDQ"
      />
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-white">{icon}</span>
      </div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-white/60 text-sm">{desc}</p>
      </div>
    </div>
  );
}