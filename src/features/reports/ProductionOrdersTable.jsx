import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationTable from "../../components/common/PaginationTable";
import UpdatePaymentStatusModal from "../finance/UpdatePaymentStatusModal";

const statusMap = {
  processing: {
    label: "Đang sản xuất",
    class:
      "bg-blue-50 text-[#0058BA] border border-blue-100",
  },
  waiting: {
    label: "Chờ vật tư",
    class:
      "bg-orange-50 text-orange-600 border border-orange-100",
  },
  done: {
    label: "Hoàn thành",
    class:
      "bg-green-50 text-green-700 border border-green-100",
  },
  "in-progress": {
    label: "Đang sản xuất",
    class:
      "bg-blue-50 text-[#0058BA] border border-blue-100",
  },
  pending: {
    label: "Chờ xử lý",
    class:
      "bg-orange-50 text-orange-600 border border-orange-100",
  },
  completed: {
    label: "Hoàn thành",
    class:
      "bg-green-50 text-green-700 border border-green-100",
  },
};

const getStatusClass = (status) => {
  return statusMap[status]?.class || statusMap.pending.class;
};

const getStatusLabel = (status) => {
  return statusMap[status]?.label || "Chờ xử lý";
};

export default function ProductionOrdersTable({
  tasks = [],
  orders = [],
  transactions = [],
  onDetail,
  onReload
}) {
  const [activeTab, setActiveTab] = useState("production");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();

  const [pageProduction, setPageProduction] = useState(1);
  const [pageOrders, setPageOrders] = useState(1);
  const [pageTransactions, setPageTransactions] = useState(1);
  const PAGE_SIZE = 10;

  const tabs = [
    { id: "orders", label: "Đơn hàng" },
    { id: "production", label: "Lệnh sản xuất" },
    { id: "transactions", label: "Giao dịch gần đây" },
  ];

  const renderContent = () => {
    if (activeTab === "production") {
      if (!tasks.length) {
        return (
          <div className="p-6 text-center text-slate-500">
            Chưa có dữ liệu lệnh sản xuất
          </div>
        );
      }

      const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
      const displayTasks = tasks.slice((pageProduction - 1) * PAGE_SIZE, pageProduction * PAGE_SIZE);

      return (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                    Mã lệnh
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-right">
                    Giá trị (VNĐ)
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {displayTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-[#0058BA] whitespace-nowrap">
                      {task._id?.substring(0, 6)?.toUpperCase() || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                      {task.productName || "Sản phẩm"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {task.customerName || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right whitespace-nowrap">
                      {(task.estimatedCost || 0).toLocaleString("vi-VN")}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase ${
                          getStatusClass(task.status)
                        }`}
                      >
                        {getStatusLabel(task.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => onDetail?.(task)}
                        className="px-3 py-1 text-xs font-bold text-white bg-[#0058BA] rounded-sm hover:bg-[#004a9d] transition-colors"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationTable
            currentPage={pageProduction}
            totalPages={totalPages}
            onChangePage={setPageProduction}
          />
        </>
      );
    }

    if (activeTab === "orders") {
      if (!orders.length) {
        return (
          <div className="p-6 text-center text-slate-500">
            Chưa có dữ liệu đơn hàng
          </div>
        );
      }

      const totalPages = Math.ceil(orders.length / PAGE_SIZE);
      const displayOrders = orders.slice((pageOrders - 1) * PAGE_SIZE, pageOrders * PAGE_SIZE);

      return (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Mã đơn</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Khách hàng</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Ngày tạo</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-right">Tổng tiền</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Trạng thái</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-[#0058BA] whitespace-nowrap">{order.orderCode || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{order.customerId?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString("vi-VN")}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right whitespace-nowrap">{(order.totalAmount || 0).toLocaleString("vi-VN")}đ</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase ${getStatusClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="px-3 py-1 text-xs font-bold text-white bg-[#0058BA] rounded-sm hover:bg-[#004a9d] transition-colors"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationTable
            currentPage={pageOrders}
            totalPages={totalPages}
            onChangePage={setPageOrders}
          />
        </>
      );
    }

    if (activeTab === "transactions") {
      if (!transactions.length) {
        return (
          <div className="p-6 text-center text-slate-500">
            Chưa có dữ liệu giao dịch
          </div>
        );
      }

      const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
      const displayTxs = transactions.slice((pageTransactions - 1) * PAGE_SIZE, pageTransactions * PAGE_SIZE);

      return (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Mã giao dịch</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Nội dung</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Phương thức</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Thời gian</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-right">Số tiền</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Trạng thái</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayTxs.map((tx) => (
                  <tr key={tx._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-[#0058BA] whitespace-nowrap">
                      {tx._id?.substring(0, 6)?.toUpperCase() || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      Thanh toán đơn {tx.orderId?.orderCode || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {tx.paymentMethod || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {new Date(tx.paymentDate).toLocaleString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right whitespace-nowrap">
                      {(tx.amount || 0).toLocaleString("vi-VN")}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase ${getStatusClass(tx.status)}`}>
                        {getStatusLabel(tx.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          setSelectedPayment(tx);
                          setIsPaymentModalOpen(true);
                        }}
                        className="px-3 py-1 text-xs font-bold text-white bg-[#0058BA] rounded-sm hover:bg-[#004a9d] transition-colors"
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationTable
            currentPage={pageTransactions}
            totalPages={totalPages}
            onChangePage={setPageTransactions}
          />
        </>
      );
    }
  };

  return (
    <>
      <section className="mt-8 bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div >

          <button
            onClick={() => {
              const paths = {
                orders: "/orders",
                production: "/production",
                transactions: "/finance",
              };
              navigate(paths[activeTab]);
            }}
            className="text-[#0058BA] text-xs font-bold hover:underline"
          >
            Xem tất cả
          </button>
        </div >

        {renderContent()}
      </section>
      <UpdatePaymentStatusModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payment={selectedPayment}
        onSuccess={onReload}
      />
    </>
  );
}
