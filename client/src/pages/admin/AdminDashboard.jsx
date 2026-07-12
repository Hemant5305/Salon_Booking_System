import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="admin-tabs">
        <NavLink to="/admin/services" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
          Manage Services
        </NavLink>
        <NavLink to="/admin/bookings" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
          Manage Bookings
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
