import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
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
      const { data } = await api.post("/auth/register", formData);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual auth-visual-register">
          <div className="auth-visual-overlay">
            <span className="brand-icon-lg">✂</span>
            <h2>Join Us</h2>
            <p>Create an account to start booking your favorite salon services.</p>
          </div>
        </div>
        <div className="auth-form-side">
          <h2>Sign Up</h2>
          <p className="muted auth-subtitle">It only takes a minute to get started.</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required autoFocus />
            </div>

            <div className="field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="field">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
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
                  minLength={6}
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
