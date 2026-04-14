import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* <Route path="/orders" element={<h1>Orders</h1>} />
      <Route path="/production" element={<h1>Production</h1>} />
      <Route path="/customers" element={<h1>Customers</h1>} />
      <Route path="/finance" element={<h1>Finance</h1>} />
      <Route path="/reports" element={<h1>Reports</h1>} /> */}
    </Routes>
  );
}

export default App;
