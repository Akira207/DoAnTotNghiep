import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import { publicRoutes, protectedRoutes } from "./routeConfig";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🔥 DEFAULT ROUTE */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* PUBLIC ROUTES */}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* PROTECTED ROUTES */}
      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute roles={route.roles}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

    </Routes>
  );
};

export default AppRoutes;