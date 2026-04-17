function LoginLeftPanel() {
  return (
    <div className="lg:col-span-5 bg-primary p-8 lg:p-16 flex-col justify-between relative overflow-hidden hidden lg:flex">
      
      {/* Top Content */}
      <div className="relative z-10">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-primary font-bold">
              factory
            </span>
          </div>
          <span className="text-white text-2xl font-black tracking-tighter">
            PLT Interior
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white text-4xl font-bold leading-tight tracking-tight mb-6">
          Kiến tạo không gian,<br />Quản trị chuẩn xác.
        </h1>

        {/* Description */}
        <p className="text-on-primary/80 text-lg font-light leading-relaxed max-w-xs">
          Hệ thống quản lý sản xuất nội thất dành cho những nghệ nhân đương đại.
        </p>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10">
        
        {/* Avatars */}
        <div className="flex -space-x-3 mb-4">
          <img
            className="w-10 h-10 rounded-full border-2 border-primary"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJyaOQyJwLrh3BsjGKkv5_e08OMa9rkpSEDhkyuZWsMZlMZOourxWKrcepdFoR1Viy_oR58zdHJN8dHMRU9b5bwLn9slwnoz0sny3WEYwKhz2lqGNqDaq1uIn84znIU4sUfga5mobf8AH3PhYoUFf53GclJldIYNSukfZpEoPtOJy0KIMBi22lZqpDUw63ep7i9jzJqCSpTEkObHpuMYOAttGlOzXslXougHucFzd8IhgMPAumi3dYNMnFV7fP1OPVD8I4IBG6MecA"
            alt="user1"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-primary"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARXx169WQcs3npJhFywmkUaHLrWWfQDpXVj5iLdkBWSGL-q8YHXEjFmXjUhrFGT1YwbDsdG2g7QmE67pxLCrVwSJjVmC5B-cwfgw5pxI0HUGCVr6UsU_9YGc9IZpFksugYx0EV-VSHTF7rsEfnaLUbakfgmtgPNRRhyETnOtuOjlHdQcY_kStVfnBXd0aCoFAmn1aaQqgKe67uxg0rQjK9Dfd9mZfsi-jW9VvyKUN3nObEiwD1gqCkZivqktLXF1Mdc6UxVY1eMFaj"
            alt="user2"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-primary"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6v1ZrXcdldRsU4TaGUqiuIe6fCe9LvGUqQsMOM9zkPV2rhlwbCNi7hpcL82gdHKHXYhQSnRCBxFThvlOm7QV9bgXwq56dHl1JVGhON0IZCh4e9E_kf0C0UcZSB2pMiD-yzXRGPkFiL7aVwoXISbWZ4XHaDutXEDZmgiMhNLMgRK6jbGFzkC4BjqowCirgIR8_oDRfIIgSGeG7vqWNAQyAGfGeQO5nRRYM7sDq658_pl5ATpLeFn_ougE4zbJIWXieQHh1XwXwPMq"
            alt="user3"
          />
        </div>

        {/* Quote */}
        <p className="text-white/70 text-sm italic">
          "PLT Interior đã giúp chúng tôi tối ưu hóa quy trình sản xuất, giảm thiểu lãng phí và nâng cao chất lượng sản phẩm. Một công cụ không thể thiếu cho bất kỳ xưởng nội thất nào muốn phát triển bền vững."
        </p>
      </div>

      {/* Background Shape */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32"></div>
    </div>
  );
}

export default LoginLeftPanel;