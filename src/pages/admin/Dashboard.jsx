// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Card({ title, value, icon }) {
//   return (
//     <div className="card p-3 shadow-sm">
//       <div className="d-flex align-items-center">
//         <div
//           style={{
//             width: 60,
//             height: 60,
//             background: "#f4f8ff",
//             borderRadius: 12,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: 16,
//           }}
//         >
//           {icon}
//         </div>
//         <div>
//           <h3 className="mb-0">{value}</h3>
//           <small className="text-muted">{title}</small>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [stats, setStats] = useState({ users: 0, brokers: 0, transactions: 0, revenue: 0 });
//   const [recent, setRecent] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("https://grocerrybackend.vercel.app/api/admin/stats", { headers: { Authorization: "Bearer " + token } })
//       .then((res) => setStats(res.data))
//       .catch(() => {});
//     axios
//       .get("https://grocerrybackend.vercel.app/api/admin/recent", { headers: { Authorization: "Bearer " + token } })
//       .then((res) => setRecent(res.data))
//       .catch(() => {});
//   }, []);

//   return (
//     <>
//       <h2 className="mb-4">Dashboard</h2>
//       <div className="row g-3 mb-4">
//         <div className="col-md-3"><Card title="Total Users" value={stats.users} icon="👥" /></div>
//         <div className="col-md-3"><Card title="Total Brokers" value={stats.brokers} icon="💼" /></div>
//         <div className="col-md-3"><Card title="Transactions" value={stats.transactions} icon="🔁" /></div>
//         <div className="col-md-3"><Card title="Revenue" value={'$' + stats.revenue + 'K'} icon="💲" /></div>
//       </div>

//       <div className="card p-3 shadow-sm">
//         <h5>
//           Recent Activity{" "}
//           <small className="text-primary float-end" style={{ cursor: "pointer" }}>
//             View All
//           </small>
//         </h5>
//         <table className="table mt-3 mb-0">
//           <thead className="table-light">
//             <tr>
//               <th>ID</th>
//               <th>User</th>
//               <th>Action</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recent.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center">
//                   No records
//                 </td>
//               </tr>
//             )}
//             {recent.map((r) => (
//               <tr key={r.id}>
//                 <td>{r.id}</td>
//                 <td>{r.user}</td>
//                 <td>{r.action}</td>
//                 <td>{r.date}</td>
//                 <td>
//                   <span className="badge bg-success">{r.status}</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../PriceList.css";

const API_URL = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// ----------------- STAT CARD -----------------
function StatCard({ title, value, icon }) {
  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex align-items-center">
        <div
          style={{
            width: 60,
            height: 60,
            background: "#f4f8ff",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            fontSize: 30,
          }}
        >
          {icon}
        </div>
        <div>
          <h3 className="mb-0">{value}</h3>
          <small className="text-muted">{title}</small>
        </div>
      </div>
    </div>
  );
}

// ------------------- DASHBOARD + PRICELIST -------------------
export default function Dashboard() {
  // ---------------- State ----------------
  const [stats, setStats] = useState({
    users: 0,
    brokers: 0,
    transactions: 0,
    revenue: 0,
  });

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    basePrice: "",
    difference: "",
    validTill: "",
    file: null,
  });

  const [editId, setEditId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [bulkMode, setBulkMode] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const csvRef = useRef();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ---------------- Fetch Data ----------------
  useEffect(() => {
    fetchStats();
    fetchItems();
    fetchCategories();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://grocerrybackend.vercel.app/api/admin/stats",
        { headers: { Authorization: "Bearer " + token } }
      );
      setStats(res.data);
    } catch (e) {}
  };

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    if (res.data.success) setItems(res.data.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_URL);
    if (res.data.success) setCategories(res.data.categories);
  };

  // ---------------- Inputs ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // ---------------- Add/Edit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.keys(form).forEach((k) => form[k] && fd.append(k, form[k]));

    try {
      if (editId) await axios.put(`${API_URL}/${editId}`, fd);
      else await axios.post(API_URL, fd);

      fetchItems();
      setForm({
        name: "",
        category: "",
        description: "",
        basePrice: "",
        difference: "",
        validTill: "",
        file: null,
      });
      setEditId(null);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Edit Button ----------------
  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name,
      category: item.category?._id || "",
      description: item.description || "",
      basePrice: item.basePrice,
      difference: item.difference,
      validTill: item.validTill ? item.validTill.split("T")[0] : "",
      file: null,
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  const handleStatus = async (item) => {
    await axios.put(`${API_URL}/status/${item._id}`, {
      status: item.status === "active" ? "inactive" : "active",
    });
    fetchItems();
  };

  // ---------------- CSV ----------------
  const handleCsvImport = async () => {
    if (!csvFile) return alert("Select CSV");
    const fd = new FormData();
    fd.append("file", csvFile);

    await axios.post(`${API_URL}/import`, fd);
    fetchItems();
  };

  const handleCsvExport = async () => {
    const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "prices.csv";
    a.click();
  };

  // ---------------- Pagination ----------------
  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;
  const currentItems = items.slice(first, last);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // ---------------- Select Items ----------------
  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) setSelectedItems([]);
    else setSelectedItems(items.map((i) => i._id));
  };
  const toggleSelect = (id) => {
    selectedItems.includes(id)
      ? setSelectedItems(selectedItems.filter((x) => x !== id))
      : setSelectedItems([...selectedItems, id]);
  };

  // ---------------- BULK SAVE ----------------
  const handleBulkSave = async () => {
    const updates = items
      .filter((i) => selectedItems.includes(i._id))
      .map((i) => ({
        id: i._id,
        name: i.name,
        basePrice: i.basePrice,
        difference: i.difference,
        validTill: i.validTill,
      }));

    await axios.post(`${API_URL}/bulk-update`, { products: updates });

    setBulkMode(false);
    setSelectedItems([]);
    fetchItems();
  };

  return (
    <div className="price-container">
      {/* -------------- DASHBOARD STATS --------------- */}
      <h2 className="mb-3">Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <StatCard title="Users" value={stats.users} icon="👥" />
        </div>
        <div className="col-md-3">
          <StatCard title="Brokers" value={stats.brokers} icon="💼" />
        </div>
        <div className="col-md-3">
          <StatCard title="Transactions" value={stats.transactions} icon="🔁" />
        </div>
        <div className="col-md-3">
          <StatCard title="Revenue" value={"$" + stats.revenue} icon="💲" />
        </div>
      </div>

      {/* ----------------- ADD/EDIT PRICE FORM ------------------ */}
     

      {/* ---------------- TABLE ---------------- */}
      <div className="table-card mt-4">
        <h3>📋 Product List</h3>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bulk-bar">
            <span>{selectedItems.length} selected</span>
            <button className="btn delete" onClick={() => {
              selectedItems.forEach(async (id) => await axios.delete(`${API_URL}/${id}`));
              fetchItems();
            }}>
              Delete Selected
            </button>
            <button className="btn primary" onClick={() => setBulkMode(true)}>
              Bulk Edit
            </button>
          </div>
        )}

        {/* Bulk Edit Panel */}
        {bulkMode && (
          <div className="bulk-edit-panel mt-3">
            <h4>Bulk Edit</h4>

            {items
              .filter((i) => selectedItems.includes(i._id))
              .map((p) => (
                <div className="bulk-edit-item" key={p._id}>
                  <input
                    defaultValue={p.name}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((x) => (x._id === p._id ? { ...x, name: e.target.value } : x))
                      )
                    }
                  />
                  <input
                    type="number"
                    defaultValue={p.basePrice}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((x) => (x._id === p._id ? { ...x, basePrice: e.target.value } : x))
                      )
                    }
                  />
                </div>
              ))}

            <button className="btn primary mt-2" onClick={handleBulkSave}>
              Save Bulk Update
            </button>
            <button className="btn mt-2" onClick={() => setBulkMode(false)}>
              Cancel
            </button>
          </div>
        )}

        {/* Table */}
        <table className="mt-3">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectedItems.length === items.length} onChange={toggleSelectAll} />
              </th>
              <th>Sr</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Base</th>
              <th>Diff</th>
              <th>Final</th>
              <th>Status</th>
              <th>Valid Till</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <input type="checkbox" checked={selectedItems.includes(item._id)} onChange={() => toggleSelect(item._id)} />
                </td>

                <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>

                <td>{item.image ? <img src={item.image} alt="" /> : "No Image"}</td>
                <td>{item.name}</td>
                <td>{item.category?.name}</td>
                <td>₹{item.basePrice}</td>
                <td>{item.difference}</td>

                <td>₹{Number(item.basePrice) + Number(item.difference)}</td>

                <td>
                  <button className="btn small" onClick={() => handleStatus(item)}>
                    {item.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                  </button>
                </td>

                <td>{item.validTill ? new Date(item.validTill).toLocaleDateString() : "-"}</td>

                <td>
                  <button className="btn edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination mt-3">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
