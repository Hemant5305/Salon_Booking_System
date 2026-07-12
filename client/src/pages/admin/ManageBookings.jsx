import { useEffect, useState } from "react";
import api from "../../api/axios";

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/admin/all");
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status });
    fetchBookings();
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>
                {b.user?.name}
                <br />
                <span className="muted">{b.user?.email}</span>
              </td>
              <td>{b.service?.name}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>
                <select value={b.status} onChange={(e) => handleStatusChange(b._id, e.target.value)}>
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {bookings.length === 0 && <p>No bookings yet.</p>}
    </div>
  );
};

export default ManageBookings;
