import { Link } from "react-router-dom";

const features = [
  {
    icon: "📅",
    title: "Easy Booking",
    text: "Pick a service, choose your date and time, and confirm in seconds.",
  },
  {
    icon: "💈",
    title: "Expert Stylists",
    text: "Trusted professionals delivering quality hair, skin and nail care.",
  },
  {
    icon: "⭐",
    title: "Manage Anytime",
    text: "Track and cancel your appointments anytime from your account.",
  },
];

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Book smarter, look better</p>
          <h1>Your favorite salon, just a few clicks away</h1>
          <p className="hero-subtext">
            Browse our services, pick a time that suits you, and let our stylists take care of the rest.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary btn-lg">
              Browse Services
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Create an Account
            </Link>
          </div>
        </div>
      </section>

      <section className="page features">
        <div className="grid features-grid">
          {features.map((f) => (
            <div className="card feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p className="muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
