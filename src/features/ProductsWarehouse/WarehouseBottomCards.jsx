export default function WarehouseBottomCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1 */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 flex items-start gap-4 hover:bg-primary/10 transition-colors">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            analytics
          </span>
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-on-surface mb-1">
            Tối ưu hóa kho bãi
          </h4>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            Hệ thống gợi ý sắp xếp lại Khu vực B để tăng 15% diện tích lưu
            trữ khả dụng dựa trên tần suất xuất kho tháng qua.
          </p>

          <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 group">
            Xem chi tiết gợi ý
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-tertiary/5 rounded-xl p-6 border border-tertiary/10 flex items-start gap-4 hover:bg-tertiary/10 transition-colors">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-tertiary shadow-sm">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            speed
          </span>
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-on-surface mb-1">
            Giao hàng nhanh
          </h4>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            Đã chuẩn bị xong 24 đơn hàng cần giao trong sáng nay. Các xe
            tải vận chuyển đã được điều phối vào khung giờ 08:00 - 10:00.
          </p>

          <button className="mt-4 text-xs font-bold text-tertiary flex items-center gap-1 group">
            Quản lý chuyến xe
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}