import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import AdminLayout from "./Layout/AdminLayout/Layout";
import UserLayout from "./Layout/UserLayout/Layout";
import AdminUserLayout from "./Layout/AdminUserLayout/Layout";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import DashboardUser from "./pages/User/DashboardUser";
import MealCalander from "./pages/User/MealCalander";
import AddMealTime from "./pages/Admin/AddMealTime";
import AddMealType from "./pages/Admin/AddMealType";
import { Users } from "./pages/Admin/Users";
import AssetAdmin from "./pages/Admin/AssetAdmin";
import MaintenanceDetails from "./pages/Admin/MaintenanceDetails";
import MaintenanceHome from "./pages/Admin/MaintenanceHome";
import AssetMonitoringAdmin from "./pages/Admin/AssetMonitoringAdmin";
import AssetRequestUsers from "./pages/User/AssetRequestUsers";

// PrivateRoute to protect routes
const PrivateRoute = ({ element, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated || !userRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${userRole}-dashboard${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`} />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/" element={<PrivateRoute element={<AdminLayout />} allowedRoles={["admin"]} />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="admin-dashboardadmin" element={<DashboardAdmin />} />
          <Route path="admin-addmealtime" element={<AddMealTime />} />
          <Route path="admin-addmealtype" element={<AddMealType />} />
          <Route path="admin-users" element={<Users />} />
          <Route path="admin-asset" element={<AssetAdmin />} />
          <Route path="admin-assetmonitoring" element={<AssetMonitoringAdmin />} />
          <Route path="admin-maintenanceHome" element={<MaintenanceHome />} />
          <Route path="admin-maintenanceDetails" element={<MaintenanceDetails />} />
        </Route>

        {/*Admin User Routes* */}
        <Route path="/" element={<PrivateRoute element={<AdminUserLayout />} allowedRoles={["admin"]} />}>
          <Route index element={<DashboardUser />} />
          <Route path="adminuser-dashboarduser" element={<DashboardUser />} />
          <Route path="adminuser-mealcalander" element={<MealCalander />} />
          <Route path="adminuser-assetrequest" element={<AssetRequestUsers />} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<PrivateRoute element={<UserLayout />} allowedRoles={["user"]} />}>
          <Route index element={<DashboardUser />} />
          <Route path="user-dashboarduser" element={<DashboardUser />} />
          <Route path="user-mealcalander" element={<MealCalander />} />
          <Route path="user-assetrequest" element={<AssetRequestUsers />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
