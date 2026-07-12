import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page hero">
      <h1>Welcome to Salon Booking System</h1>
      <p>Book your favorite salon services in just a few clicks.</p>
      <div className="hero-actions">
        <Link to="/services" className="btn btn-primary">
          Browse Services
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
