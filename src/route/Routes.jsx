import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashBoardPage";
import OrdersPage from "../pages/OrdersPage";
import ProductionPage from "../pages/ProductionPage";
import ProductWarehousePage from "../pages/warehouse/ProductsWarehousePage";
import MaterialsHistoryPage from "../pages/warehouse/MaterialsHistoryPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/production" element={<ProductionPage />} />
      <Route path="/warehouse/products" element={<ProductWarehousePage />} />
      <Route path="/warehouse/materials-history" element={<MaterialsHistoryPage />} />
    </Routes>
  );
};

export default AppRoutes;