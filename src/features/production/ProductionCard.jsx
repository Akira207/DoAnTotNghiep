const statusConfig = {
  completed: {
    label: "HOÀN THÀNH",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    text: "text-green-600",
    border: "border-l-[#28A745]",
    icon: "check_circle",
    subText: "QC PASSED",
  },

  urgent: {
    label: "CẦN GẤP",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    text: "text-red-600",
    border: "border-l-[#DC3545]",
    icon: "alarm",
    subText: "HẠN: 24H TỚI",
  },

  pending: {
    label: "CHƯA HOÀN THÀNH",
    badge: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    text: "text-orange-600",
    border: "border-l-[#FFC107]",
    icon: "pending_actions",
    subText: "ĐANG LẮP RÁP",
  },
};

const ProductionCard = ({ item }) => {
  const config = statusConfig[item.status] || statusConfig.pending;

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden border-l-4 ${config.border}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-50 text-slate-500 font-bold text-xs py-1.5 px-3 rounded-lg border border-slate-100">
          #{item.code}
        </div>

        <div
          className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${config.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-4 mb-6">
        <div className="w-32 h-32 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-50">
          <img
            src={item.image}
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-xl font-black text-slate-900 truncate">
            {item.name}
          </h4>

          <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">
            {item.orderCode}
          </p>

          <div className="grid grid-cols-2 gap-y-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Kích thước
              </p>
              <p className="text-xs font-semibold text-slate-700">
                {item.size}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Vật liệu
              </p>
              <p className="text-xs font-semibold text-slate-700">
                {item.material}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${config.text}`}>
          <span className="material-symbols-outlined text-lg">
            {config.icon}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-tight">
            {config.subText}
          </span>
        </div>

        <button className="text-primary font-bold text-xs uppercase flex items-center gap-1 group/link">
          Chi tiết
          <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductionCard;