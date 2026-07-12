import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const BookAppointment = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({ date: "", time: "", notes: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const { data } = await api.get("/services");
      const found = data.find((s) => s._id === serviceId);
      setService(found || null);
    };
    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/bookings", { service: serviceId, ...formData });
      setSuccess(true);
      setTimeout(() => navigate("/my-bookings"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return <div className="page">Loading...</div>;

  return (
    <div className="page form-page">
      <h2>Book: {service.name}</h2>
      <p className="muted">
        ${service.price} &middot; {service.duration} min
      </p>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Booking confirmed! Redirecting...</p>}
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Time</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />

        <label>Notes (optional)</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
