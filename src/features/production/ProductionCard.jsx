const statusConfig = {
  completed: {
    label: "HOÀN THÀNH",
    badge: "bg-green-100 text-green-700",
    icon: "check_circle",
    text: "text-green-600",
    border: "border-l-[#28A745]",
    subText: "QC PASSED",
  },
  "in-progress": {
    label: "ĐANG SẢN XUẤT",
    badge: "bg-blue-100 text-blue-700",
    icon: "build",
    text: "text-blue-600",
    border: "border-l-[#0D6EFD]",
    subText: "ĐANG THỰC HIỆN",
  },
  pending: {
    label: "CHỜ SẢN XUẤT",
    badge: "bg-orange-100 text-orange-700",
    icon: "pending_actions",
    text: "text-orange-600",
    border: "border-l-[#FFC107]",
    subText: "CHƯA BẮT ĐẦU",
  },
};

const ProductionCard = ({ item, onDetail }) => {
  const config = statusConfig[item.status] || statusConfig.pending;

  // =========================
  // 🔥 UNIFIED PRODUCT ACCESS
  // =========================
  const product =
    item.productId ||
    item.orderDetailId?.productId ||
    null;

  const image =
    product?.image ||
    product?.thumbnail ||
    product?.images?.[0];

  const code =
    item.orderDetailId?.orderId?.orderCode ||
    item.type === "stock"
      ? "STOCK"
      : "MANUAL";

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden border-l-4 ${config.border}`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-50 text-slate-500 font-bold text-xs py-1.5 px-3 rounded-lg border border-slate-100">
          #{item._id?.slice(-6)}
        </div>

        <div className={`text-[10px] font-black px-3 py-1.5 rounded-full ${config.badge}`}>
          {config.label}
        </div>
      </div>

      {/* BODY */}
      <div className="flex gap-4 mb-6">
        {/* IMAGE */}
        <div className="w-32 h-32 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-xs">
              No Image
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xl font-black text-slate-900 truncate">
            {product?.name || "Không có sản phẩm"}
          </h4>

          <p className="text-[10px] text-slate-400 font-bold uppercase mb-3">
            {code}
          </p>

          <div className="grid grid-cols-2 gap-y-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Số lượng
              </p>
              <p className="text-xs font-semibold">
                {item.quantity}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Đợt
              </p>
              <p className="text-xs font-semibold">
                {item.batch || 1}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 mt-2">
            {product?.material || item.material || "Không có vật liệu"}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${config.text}`}>
          <span className="material-symbols-outlined text-lg">
            {config.icon}
          </span>
          <span className="text-[11px] font-bold uppercase">
            {config.subText}
          </span>
        </div>

        <button
          onClick={() => onDetail?.(item)}
          className="text-blue-600 font-bold text-xs uppercase"
        >
          Chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductionCard;