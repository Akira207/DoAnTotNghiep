import React from "react";

export default function MaterialsReportBanner() {
  return (
    <div className="mt-8 relative h-48 rounded-xl overflow-hidden bg-surface-dim">
      <div className="absolute inset-0 z-0">
        <img
          alt="Interior manufacturing environment"
          className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeDFd8764cGbI5MBf2jKVBmRuh66IDGSokZTRKkbRQlONtIMVm7CEkMqwGXxK7Jcp07e-FHx-sKXHmn0Ku-Db9cPcwXayjsY53knZ5hFDhdK2Oi6g3Hd5YhHlatAmleO09m6eEfR14ORSt8iRvtobz7086wCOPDR4piKqHqRi8Lro99YrxY8FCxEVs9xZoQIt_3ShB2SOs-_c1klwZiJZo_MUBKP57MskSuVbBKadXxfey53D2vWM9KXOA2E3LB32o8Gh1I9YDdZPX"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent z-10 flex items-center px-10">
        <div className="max-w-md">
          <h4 className="text-2xl font-black text-white tracking-tight mb-2">
            Báo cáo kho thông minh
          </h4>

          <p className="text-white/80 font-medium mb-4 text-sm">
            Hệ thống AI đang phân tích dữ liệu nhập kho để dự báo định mức
            vật tư tối ưu cho quý tiếp theo.
          </p>

          <button className="px-6 py-2 bg-white text-primary font-bold text-sm rounded hover:bg-opacity-90 transition-all">
            Xem báo cáo dự báo
          </button>
        </div>
      </div>
    </div>
  );
}