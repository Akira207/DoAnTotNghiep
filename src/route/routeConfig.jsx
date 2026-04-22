import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashBoardPage";
import OrdersPage from "../pages/OrdersPage";
import ProductionPage from "../pages/ProductionPage";
import ProductWarehousePage from "../pages/warehouse/ProductsWarehousePage";
import MaterialsHistoryPage from "../pages/warehouse/MaterialsHistoryPage";
import CustomerPage from "../pages/CustomerPage";
import FinancePage from "../pages/FinancePage";
import UsersPage from "../pages/UsersPage";
import ReportsPage from "../pages/ReportsPage";
import ProductsPage from "../pages/ProductsPage";
import AccessoriesPage from "../pages/AccessoriesPage";
import OrderDetailPage from "../pages/OrderDetailPage";

export const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
];

export const protectedRoutes = [
  { path: "/dashboard", element: <DashboardPage />, roles: ["admin", "accountant"] },
  { path: "/orders", element: <OrdersPage />, roles: ["admin", "accountant"] },
  { path: "/production", element: <ProductionPage />, roles: ["admin", "worker", "accountant"] },
  { path: "/orders/:id", element: <OrderDetailPage />, roles: ["admin", "staff"],},
  // { path: "/orders/order-detail", element: <OrderDetailPage />, roles: ["admin", "staff"],}, //test


  { path: "/warehouse/products", element: <ProductWarehousePage />, roles: ["admin", "accountant"] },
  { path: "/warehouse/materials-history", element: <MaterialsHistoryPage />, roles: ["admin", "accountant"] },

  { path: "/customers", element: <CustomerPage />, roles: ["admin", "accountant"] },
  { path: "/finance", element: <FinancePage />, roles: ["admin", "accountant"] },
  { path: "/users", element: <UsersPage />, roles: ["admin"] },
  { path: "/reports", element: <ReportsPage />, roles: ["admin", "accountant"] },

  { path: "/categories/products", element: <ProductsPage />, roles: ["admin"] },
  { path: "/categories/accessories", element: <AccessoriesPage />, roles: ["admin"] },
];