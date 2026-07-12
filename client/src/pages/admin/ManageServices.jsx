import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyForm = { name: "", description: "", price: "", duration: "", category: "" };

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    const { data } = await api.get("/services/admin/all");
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
      };
      if (editingId) {
        await api.put(`/services/${editingId}`, payload);
      } else {
        await api.post("/services", payload);
      }
      resetForm();
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save service");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price,
      duration: service.duration,
      category: service.category || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await api.delete(`/services/${id}`);
    fetchServices();
  };

  const handleToggleActive = async (service) => {
    await api.put(`/services/${service._id}`, { isActive: !service.isActive });
    fetchServices();
  };

  return (
    <div>
      <h3>{editingId ? "Edit Service" : "Add New Service"}</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="inline-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required min="0" />
        <input type="number" name="duration" placeholder="Duration (min)" value={formData.duration} onChange={handleChange} required min="1" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>${s.price}</td>
                <td>{s.duration} min</td>
                <td>
                  <button className="btn-link" onClick={() => handleToggleActive(s)}>
                    {s.isActive ? "Yes" : "No"}
                  </button>
                </td>
                <td>
                  <button className="btn-link" onClick={() => handleEdit(s)}>
                    Edit
                  </button>{" "}
                  <button className="btn-link" onClick={() => handleDelete(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
