export default function OrderItemsSection({
  items = [],
  payment = null,
}) {
  // =========================
  // SAFE CALCULATION
  // =========================
  const subtotal = items.reduce((sum, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return sum + price * quantity;
  }, 0);

  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  // 💰 tiền đặt cọc từ payment API
  const deposit = payment?.amount || 0;

  const remaining = total - deposit;

  const formatPrice = (value) =>
    (value || 0).toLocaleString("vi-VN") + "đ";

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
      case "hoàn thành":
        return "bg-tertiary-container/30 text-on-tertiary-container";

      case "waiting":
      case "chờ vật tư":
        return "bg-secondary-container/30 text-on-secondary-container";

      default:
        return "bg-surface-container-high text-on-surface-variant";
    }
  };

  const getStatusText = (status) => status || "Đang xử lý";

  return (
    <section className="lg:col-span-2 space-y-6">

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant/10 flex justify-between items-center">
          <h3 className="font-bold text-on-surface uppercase tracking-wider text-xs">
            Danh sách sản phẩm
          </h3>

          <span className="text-xs font-bold text-on-surface-variant">
            {items.length.toString().padStart(2, "0")} Sản phẩm
          </span>
        </div>

        {/* LIST */}
        <div className="divide-y divide-surface-container">

          {items.map((item, index) => {
            const product = item.productId || item.product || {};

            const image =
              product?.images?.[0] ||
              product?.image ||
              "";

            const name = product?.name || "Sản phẩm";
            const sku = product?._id || "N/A";

            const quantity = item.quantity || 0;
            const price = item.price || 0;
            const totalItem = quantity * price;

            return (
              <div
                key={product._id || index}
                className="p-6 flex items-center gap-6"
              >
                {/* IMAGE */}
                <div className="w-24 h-24 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-on-surface-variant">
                      No image
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-on-surface leading-tight">
                    {name}
                  </h4>

                  <p className="text-xs text-on-surface-variant font-medium mb-2">
                    SKU: {sku}
                  </p>

                  <div className="flex items-center gap-4">

                    <div
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </div>

                    <div className="text-primary font-bold">
                      x{quantity}
                    </div>

                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="text-xs text-on-surface-variant font-bold uppercase mb-1">
                    Thành tiền
                  </p>

                  <p className="text-xl font-black tracking-tight text-on-surface">
                    {formatPrice(totalItem)}
                  </p>

                  <p className="text-[10px] text-on-surface-variant">
                    Đơn giá: {formatPrice(price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-surface p-8">

          <div className="max-w-md ml-auto space-y-4">

            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-on-surface-variant">Tạm tính:</span>
              <span className="text-on-surface">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-on-surface-variant">
                Thuế VAT (10%):
              </span>
              <span className="text-on-surface">
                {formatPrice(vat)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-on-surface-variant">
                Phí vận chuyển:
              </span>
              <span className="text-tertiary font-bold">
                Miễn phí
              </span>
            </div>

            <div className="pt-4 border-t border-outline-variant flex justify-between items-end">

              <div>
                <p className="text-[10px] text-on-surface-variant font-black uppercase">
                  Tổng giá trị đơn hàng
                </p>

                <p className="text-xs text-secondary font-bold">
                  Đã đặt cọc: {formatPrice(deposit)}
                </p>
              </div>

              <p className="text-3xl font-black text-primary tracking-tighter">
                {formatPrice(total)}
              </p>

            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-bold text-error uppercase">
                Còn lại phải thu:
              </span>

              <span className="text-lg font-bold text-error">
                {formatPrice(remaining)}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* TIMELINE (STATIC UI) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-t-4 border-tertiary">
          <span className="material-symbols-outlined text-tertiary mb-3">
            verified
          </span>
          <h5 className="text-sm font-bold mb-1">Xác nhận đơn</h5>
          <p className="text-xs text-on-surface-variant">
            Hoàn thành lúc 14:30 - 12/10/2023
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-t-4 border-primary">
          <span className="material-symbols-outlined text-primary mb-3">
            auto_fix_high
          </span>
          <h5 className="text-sm font-bold mb-1">Gia công thô</h5>
          <p className="text-xs text-on-surface-variant">
            Bắt đầu từ 08:00 - 15/10/2023
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-t-4 border-outline opacity-60">
          <span className="material-symbols-outlined text-outline mb-3">
            local_shipping
          </span>
          <h5 className="text-sm font-bold mb-1">
            Dự kiến giao hàng
          </h5>
          <p className="text-xs text-on-surface-variant">
            25/11/2023 (Ước tính)
          </p>
        </div>

      </div>

    </section>
  );
}