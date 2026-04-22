export default function OrderCustomerInfo({ order }) {
  const customer = order?.customerId;

  return (
    <section className="lg:col-span-1 space-y-6">

      {/* =========================
          CUSTOMER INFO
      ========================= */}
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary">

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-on-surface uppercase tracking-wider text-xs">
            Thông tin khách hàng
          </h3>

          <span className="material-symbols-outlined text-primary">
            person
          </span>
        </div>

        <div className="space-y-4">

          {/* NAME */}
          <div>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">
              Tên khách hàng
            </p>

            <p className="text-lg font-semibold text-on-surface">
              {customer?.name || "Không có dữ liệu"}
            </p>
          </div>

          {/* PHONE */}
          <div>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">
              Số điện thoại
            </p>

            <p className="text-on-surface font-medium">
              {customer?.phone || "N/A"}
            </p>
          </div>

          {/* ADDRESS */}
          <div>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">
              Địa chỉ giao hàng
            </p>

            <p className="text-on-surface text-sm leading-relaxed">
              {customer?.address || "Chưa có địa chỉ"}
            </p>
          </div>

        </div>
      </div>

      {/* =========================
          NOTES
      ========================= */}
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">

        <h3 className="font-bold text-on-surface uppercase tracking-wider text-xs mb-4">
          Ghi chú sản xuất
        </h3>

        <div className="bg-surface p-4 rounded text-sm text-on-surface-variant italic">
          {order?.note ||
            `"Lưu ý sử dụng gỗ sồi Mỹ nhập khẩu loại 1 cho phần khung ghế. Bọc da Ý màu nâu sẫm."`}
        </div>

      </div>

    </section>
  );
}