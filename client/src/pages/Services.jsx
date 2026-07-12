import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get("/services");
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleBook = (serviceId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/book/${serviceId}`);
  };

  if (loading) return <div className="page">Loading services...</div>;

  return (
    <div className="page">
      <h2>Our Services</h2>
      <div className="grid">
        {services.map((service) => (
          <div className="card" key={service._id}>
            <h3>{service.name}</h3>
            <p className="muted">{service.category}</p>
            <p>{service.description}</p>
            <p>
              <strong>${service.price}</strong> &middot; {service.duration} min
            </p>
            <button className="btn btn-primary" onClick={() => handleBook(service._id)}>
              Book Now
            </button>
          </div>
        ))}
        {services.length === 0 && <p>No services available right now.</p>}
      </div>
    </div>
  );
};

export default Services;
