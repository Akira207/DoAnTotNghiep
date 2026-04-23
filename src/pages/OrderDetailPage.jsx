import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";

import OrderDetailHeader from "../features/orderDetail/OrderDetailHeader";
import OrderCustomerInfo from "../features/orderDetail/OrderCustomerInfo";
import OrderItemsSection from "../features/orderDetail/OrderItemsSection";

import { getOrderById } from "../services/orderService";

export default function OrderDetailPage() {
  const { id } = useParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrderData(data);
    } catch (err) {
      console.error("Fetch order error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">Đang tải dữ liệu...</div>
    );
  }

  if (!orderData) {
    return (
      <div className="p-10 text-center text-red-500">
        Không tìm thấy đơn hàng
      </div>
    );
  }

  const order = orderData?.order || orderData;

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="md:ml-[280px] p-6 lg:p-10">
        <OrderDetailHeader
          order={orderData.order}
          payment={orderData.payment}
          onReload={fetchOrder}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OrderCustomerInfo order={order} />

          <OrderItemsSection
            items={orderData?.details || []}
            payment={orderData?.payment || null}
            order={orderData?.order || orderData}
          />
        </div>
      </main>
    </div>
  );
}
