export default function CustomerActivity() {
  const activities = [
    {
      id: 1,
      icon: "person_add",
      color: "bg-blue-50 text-primary",
      content: (
        <>
          Thêm mới khách hàng:{" "}
          <span className="text-primary">Trần Văn B</span>
        </>
      ),
      time: "10 phút trước • Bởi Admin",
      hasLine: true,
    },
    {
      id: 2,
      icon: "payments",
      color: "bg-orange-50 text-secondary",
      content: (
        <>
          Cập nhật công nợ:{" "}
          <span className="text-secondary">Nội Thất Minh Anh</span>
        </>
      ),
      time: "2 giờ trước • Hệ thống thanh toán",
      hasLine: true,
      fill: true,
    },
    {
      id: 3,
      icon: "verified_user",
      color: "bg-green-50 text-tertiary",
      content: (
        <>
          Xác thực đại lý cấp 1:{" "}
          <span className="text-tertiary">Decor An Bình</span>
        </>
      ),
      time: "Hôm qua • BP. Kinh doanh",
      hasLine: false,
    },
  ];

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-lg shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <h2 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">
        Hoạt động gần đây
      </h2>

      <div className="space-y-6">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color}`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={
                    item.fill
                      ? { fontVariationSettings: '"FILL" 1' }
                      : {}
                  }
                >
                  {item.icon}
                </span>
              </div>

              {item.hasLine && (
                <div className="absolute top-8 left-4 w-px h-12 bg-slate-100"></div>
              )}
            </div>

            <div className="flex-1 pb-4">
              <p className="text-sm text-on-surface font-semibold">
                {item.content}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}