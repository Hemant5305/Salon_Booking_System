import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/format";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&h=600&fit=crop";

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

  if (loading) return <div className="page state-message">Loading services...</div>;

  return (
    <div className="page">
      <div className="section-heading">
        <h2>Our Services</h2>
        <p className="muted">Choose a treatment and book your slot in seconds.</p>
      </div>
      <div className="grid">
        {services.map((service) => (
          <div className="card service-card" key={service._id}>
            <div className="card-media">
              <img
                src={service.image || FALLBACK_IMAGE}
                alt={service.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              <span className="category-pill">{service.category}</span>
            </div>
            <div className="card-body">
              <h3>{service.name}</h3>
              <p className="muted card-desc">{service.description}</p>
              <div className="card-meta">
                <span className="price">{formatPrice(service.price)}</span>
                <span className="duration">{service.duration} min</span>
              </div>
              <button className="btn btn-primary btn-block" onClick={() => handleBook(service._id)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && <p>No services available right now.</p>}
      </div>
    </div>
  );
};

export default Services;
