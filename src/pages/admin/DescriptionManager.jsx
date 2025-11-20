import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://grocerrybackend.vercel.app/api/descriptions";

export default function DescriptionManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null); 
  const [showForm, setShowForm] = useState(false);

  // Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", description: "", id: null });

  // Load all
  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert("Enter title!");

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      alert("Updated!");
    } else {
      await axios.post(API, form);
      alert("Created!");
    }

    setForm({ title: "", description: "" });
    setEditId(null);
    fetchItems();
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;
    await axios.delete(`${API}/${id}`);
    fetchItems();
  };

  // Modal open
  const openModal = (item) => {
    setModalData({
      title: item.title,
      description: item.description,
      id: item._id,
    });
    setModalOpen(true);
  };

  // Modal save
  const saveModal = async () => {
    await axios.put(`${API}/${modalData.id}`, {
      title: modalData.title,
      description: modalData.description,
    });
    setModalOpen(false);
    fetchItems();
  };

  return (
    <div style={styles.container}>
      <h2>Description Manager</h2>

      <button
        style={styles.addBtn}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Description"}
      </button>

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
          />
          <button style={styles.saveBtn}>
            {editId ? "Update" : "Save"}
          </button>
        </form>
      )}

      <div style={styles.list}>
        {items.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => openModal(item)}
              >
                Edit
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Description</h3>

            <input
              type="text"
              value={modalData.title}
              onChange={(e) =>
                setModalData({ ...modalData, title: e.target.value })
              }
              style={styles.input}
            />

            <textarea
              value={modalData.description}
              onChange={(e) =>
                setModalData({ ...modalData, description: e.target.value })
              }
              style={styles.textarea}
            />

            <button style={styles.saveBtn} onClick={saveModal}>
              Update
            </button>
            <button
              style={styles.cancelBtn}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline CSS
const styles = {
  container: { maxWidth: "800px", margin: "20px auto", padding: "20px" },
  addBtn: {
    padding: "10px 15px",
    background: "#007bff",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  form: {
    padding: "15px",
    background: "#f8f8f8",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  saveBtn: {
    padding: "10px 15px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: { marginTop: "20px" },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  },
  actions: { marginTop: "10px", display: "flex", gap: "10px" },
  editBtn: {
    background: "#ffc107",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc3545",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
  },
  cancelBtn: {
    padding: "10px 15px",
    background: "#6c757d",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    marginLeft: "10px",
    cursor: "pointer",
  },
};
