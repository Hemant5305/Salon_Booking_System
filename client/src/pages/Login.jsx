import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      login(data);
      navigate(data.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-visual-overlay">
            <span className="brand-icon-lg">✂</span>
            <h2>Welcome Back</h2>
            <p>Log in to book appointments and manage your salon visits.</p>
          </div>
        </div>
        <div className="auth-form-side">
          <h2>Login</h2>
          <p className="muted auth-subtitle">Enter your details to access your account.</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required autoFocus />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
