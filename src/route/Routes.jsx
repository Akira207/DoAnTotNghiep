import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import { publicRoutes, protectedRoutes } from "./routeConfig";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
