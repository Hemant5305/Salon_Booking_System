import { useEffect, useState } from "react";
import api from "../api/axios";
import { formatPrice } from "../utils/format";

const statusClass = {
  pending: "badge badge-pending",
  confirmed: "badge badge-confirmed",
  completed: "badge badge-completed",
  cancelled: "badge badge-cancelled",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/mine");
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await api.put(`/bookings/${id}/cancel`);
    fetchBookings();
  };

  if (loading) return <div className="page state-message">Loading bookings...</div>;

  return (
    <div className="page">
      <div className="section-heading">
        <h2>My Bookings</h2>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>
                  <div className="row-service">
                    {b.service?.image && <img src={b.service.image} alt={b.service.name} className="thumb" />}
                    <span>{b.service?.name}</span>
                  </div>
                </td>
                <td>{formatPrice(b.service?.price)}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>
                  <span className={statusClass[b.status]}>{b.status}</span>
                </td>
                <td>
                  {b.status === "pending" || b.status === "confirmed" ? (
                    <button className="btn-link" onClick={() => handleCancel(b._id)}>
                      Cancel
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <p>You have no bookings yet.</p>}
      </div>
    </div>
  );
};

export default MyBookings;
