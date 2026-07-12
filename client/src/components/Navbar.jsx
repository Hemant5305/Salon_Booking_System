import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Salon Booking
      </Link>
      <div className="nav-links">
        <Link to="/services">Services</Link>
        {user && <Link to="/my-bookings">My Bookings</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
