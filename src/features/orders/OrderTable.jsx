import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

// =========================
// STATUS MAP
// =========================
const statusMap = {
  pending: {
    label: "Chờ sản xuất",
    class: "bg-surface-container-high text-on-surface-variant",
  },
  producing: {
    label: "Đang sản xuất",
    class: "bg-secondary-container text-on-secondary-container",
  },
  transporting: {
    label: "Đang vận chuyển",
    class: "bg-primary-container text-on-primary-container",
  },
  waiting_payment: {
    label: "Chờ thanh toán",
    class: "bg-tertiary-container text-on-tertiary-container",
  },
  completed: {
    label: "Hoàn Thành",
    class: "bg-green-100 text-green-700",
  },
  cancelled: {
    label: "Đã huỷ",
    class: "bg-error-container text-error",
  },
};

export default function OrderTable({ orders = [], onReload }) {
  const navigate = useNavigate();

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // ❗ không cho click row

    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xoá đơn hàng này không?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/orders/${id}`);

      alert("Xoá thành công!");

      // reload lại danh sách
      onReload?.();
    } catch (err) {
      console.error(err);
      alert("Xoá thất bại");
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left">

          {/* HEADER */}
          <thead className="bg-surface-container">
            <tr className="text-xs uppercase text-on-surface-variant">
              <th className="px-6 py-4 font-bold">Mã đơn</th>
              <th className="px-6 py-4 font-bold">Khách hàng</th>
              <th className="px-6 py-4 font-bold">Ngày</th>
              <th className="px-6 py-4 font-bold">Trạng thái</th>
              <th className="px-6 py-4 font-bold text-right">Tổng tiền</th>
              <th className="px-6 py-4 font-bold text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {orders.map((o) => (
              <tr
                key={o._id}
                className="hover:bg-slate-50 cursor-pointer"
                onClick={() => navigate(`/orders/${o._id}`)}
              >
                {/* MÃ ĐƠN */}
                <td className="px-6 py-5 font-bold text-primary">
                  {o.orderCode || `#${o._id.slice(-6)}`}
                </td>

                {/* KHÁCH HÀNG */}
                <td className="px-6 py-5 font-semibold">
                  {o.customerId?.name || "—"}
                </td>

                {/* NGÀY */}
                <td className="px-6 py-5">
                  {o.orderDate
                    ? new Date(o.orderDate).toLocaleDateString("vi-VN")
                    : "—"}
                </td>

                {/* TRẠNG THÁI */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 text-[10px] rounded font-bold uppercase ${
                      statusMap[o.status]?.class ||
                      statusMap.pending.class
                    }`}
                  >
                    {statusMap[o.status]?.label || "Chờ sản xuất"}
                  </span>
                </td>

                {/* TỔNG TIỀN */}
                <td className="px-6 py-5 text-right font-black">
                  {o.totalAmount
                    ? o.totalAmount.toLocaleString("vi-VN") + "đ"
                    : "0đ"}
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 text-center">
                  <button
                    onClick={(e) => handleDelete(e, o._id)}
                    className="px-3 py-1 text-xs font-bold bg-error text-white rounded hover:opacity-80"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}

            {/* EMPTY */}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-sm text-on-surface-variant"
                >
                  Không có đơn hàng
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}