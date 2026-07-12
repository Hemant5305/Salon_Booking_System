import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">✂</span> Salon Booking
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>
          {user && (
            <Link to="/my-bookings" onClick={closeMenu}>
              My Bookings
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu}>
              Admin Dashboard
            </Link>
          )}
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
