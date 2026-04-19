export default function CustomerTable() {
  const customers = [
    {
      id: 1,
      name: "Nội Thất Minh Anh",
      phone: "0901.234.567",
      type: "Đại lý",
      address: "123 Lê Lợi, Quận 1, TP.HCM",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAuLJWKeFTaBhz7BtZmKWjU9x19MvnENfC-xXyfBJIzX_YY1ws1ZFP8fzmgsORi1_CPLbcNIMzqdH3C980iov2H4GtvqjjWxQG77OY_CHNPej7WTdXu51AGNPhke5oJEfiQLPGLU0DaDsNtw-eDDgoKi2BeI6Fc5qovlC_pv8GRLiasHWSPkf2_MpJUU6v0AvhX95zk-NsYzLRED2UARTGfDwpWHl2ayqZZ1wkUBMui4OOZaO4OM3uyk8oUFk1c01n1jVfF1D8VaLsa",
    },
    {
      id: 2,
      name: "Nguyễn Thu Thủy",
      phone: "0988.777.666",
      type: "Khách lẻ",
      address: "KDC Him Lam, Quận 7, TP.HCM",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBovN8le4FBFSUE-BhpnMGp7CTLM6ae0SDFdf7bSpVBMQryVGaxEAC3ApHryqQqyjQCQoWb29WOjar8bdcaoSZWpyGqTJaxrTh22T44-YjAzUAuCLyEvNeotwgo-3VnTFwr4WhczssIJDbj0t-2nRi6dGcUcf8j1mt_pJgdi4CQLKjd77PFL_gduVfSTXdty02vjoOSvgK9fWVgNrU3Vme540hnrEw-wlmboOpougsPlckSnOTYsZHCxmeMOVcQr5kVGhERfHKxNGKR",
    },
    {
      id: 3,
      name: "Decor An Bình",
      phone: "0912.000.999",
      type: "Đại lý",
      address: "456 Cách Mạng T8, Quận 10, TP.HCM",
      avatar: null,
      initials: "DA",
    },
  ];

  return (
    <section className="bg-surface-container-lowest rounded-lg shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg font-bold text-on-surface">
          Danh sách đối tác & khách hàng
        </h2>

        <div className="flex w-full md:w-auto">
          <div className="flex-1 md:w-80 flex items-center bg-surface-container-low rounded px-4 py-2">
            <span className="material-symbols-outlined text-slate-400">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
              placeholder="Tìm theo tên, SĐT hoặc mã khách hàng..."
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-slate-500 text-[10px] uppercase tracking-widest font-bold">
              <th className="px-6 py-4">STT</th>
              <th className="px-6 py-4">Tên khách hàng</th>
              <th className="px-6 py-4">Liên hệ</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Địa chỉ</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {customers.map((c, index) => (
              <tr
                key={c.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        className="w-8 h-8 rounded-full object-cover"
                        alt=""
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-[10px] font-bold">
                        {c.initials}
                      </div>
                    )}

                    <div className="font-bold text-sm text-on-surface">
                      {c.name}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {c.phone}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase whitespace-nowrap ${
                      c.type === "Đại lý"
                        ? "bg-blue-50 text-primary"
                        : "bg-orange-50 text-secondary"
                    }`}
                  >
                    {c.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate">
                  {c.address}
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center text-xs text-slate-500 font-medium">
        <p>Hiển thị 10 trong số 1,248 khách hàng</p>

        <div className="flex gap-1">
          <button className="px-2 py-1 rounded bg-white border border-slate-200">
            1
          </button>
          <button className="px-2 py-1 rounded hover:bg-slate-100">
            2
          </button>
          <button className="px-2 py-1 rounded hover:bg-slate-100">
            3
          </button>
          <span className="px-1 self-end">...</span>
          <button className="px-2 py-1 rounded hover:bg-slate-100">
            125
          </button>
        </div>
      </div>
    </section>
  );
}