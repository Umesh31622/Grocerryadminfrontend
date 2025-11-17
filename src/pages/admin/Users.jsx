
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Users.css";

// const API = "https://grocerrybackend.vercel.app/api/user";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const [editId, setEditId] = useState(null);

//   const fetchUsers = () => {
//     setLoading(true);
//     axios
//       .get(API)
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editId) {
//         await axios.put(`${API}/${editId}`, form);
//         alert("User updated");
//       } else {
//         await axios.post(API, form);
//         alert("User created");
//       }

//       setForm({ name: "", email: "", password: "", role: "user" });
//       setEditId(null);
//       fetchUsers();
//     } catch (err) {
//       alert("Save failed");
//     }
//   };

//   const handleEdit = (usr) => {
//     setForm({
//       name: usr.name,
//       email: usr.email,
//       password: "",
//       role: usr.role,
//     });
//     setEditId(usr._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete user?")) return;

//     try {
//       await axios.delete(`${API}/${id}`);
//       fetchUsers();
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="users-container">
//       <div className="users-header">
//         <h2>👥 User Management</h2>
//         <p>Create • Update • Delete Users</p>
//       </div>

//       {/* Form */}
//       <form className="user-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Password (encrypted)"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <select
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button type="submit">{editId ? "Update User" : "Add User"}</button>

//         {editId && (
//           <button
//             type="button"
//             className="cancel-btn"
//             onClick={() => {
//               setEditId(null);
//               setForm({ name: "", email: "", password: "", role: "user" });
//             }}
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* Desktop Table */}
//       {!loading && (
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Password</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u, i) => (
//               <tr key={u._id}>
//                 <td>{i + 1}</td>
//                 <td>{u.name}</td>
//                 <td>{u.email}</td>

//                 <td className="password-col">{u.password}</td>

//                 <td>
//                   <span className={`role-badge ${u.role}`}>{u.role}</span>
//                 </td>

//                 <td>
//                   <button className="edit-btn" onClick={() => handleEdit(u)}>
//                     Edit
//                   </button>

//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(u._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {loading && <div className="loader">Loading users...</div>}

//       {/* MOBILE CARDS */}
//       <div className="users-cards">
//         {users.map((u, i) => (
//           <div key={u._id} className="user-card">
//             <div className="card-header">
//               <span className="card-index">#{i + 1}</span>

//               <span className={`role-badge ${u.role}`}>{u.role}</span>
//             </div>

//             <div className="card-body">
//               <p>
//                 <strong>Name:</strong> {u.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {u.email}
//               </p>

//               <p className="mobile-password">
//                 <strong>Password:</strong> {u.password}
//               </p>

//               <div className="card-actions">
//                 <button className="edit-btn" onClick={() => handleEdit(u)}>
//                   Edit
//                 </button>

//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(u._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

const API = "https://grocerrybackend.vercel.app/api/user";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editId, setEditId] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        alert("User updated");
      } else {
        await axios.post(API, form);
        alert("User created");
      }

      setForm({ name: "", email: "", password: "", role: "user" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      alert("Save failed");
    }
  };

  const handleEdit = (usr) => {
    setForm({
      name: usr.name,
      email: usr.email,
      password: "",
      role: usr.role,
    });
    setEditId(usr._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>👥 User Management</h2>
        <p>Create • Update • Delete Users</p>
      </div>

      {/* Form */}
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Password (encrypted)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">{editId ? "Update User" : "Add User"}</button>

        {editId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", email: "", password: "", role: "user" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Desktop Table */}
      {!loading && (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td className="password-col">{u.password}</td>

                <td>
                  <span className={`role-badge ${u.role}`}>{u.role}</span>
                </td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(u)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {loading && <div className="loader">Loading users...</div>}

      {/* MOBILE CARDS */}
      <div className="users-cards">
        {users.map((u, i) => (
          <div key={u._id} className="user-card">
            <div className="card-header">
              <span className="card-index">#{i + 1}</span>

              <span className={`role-badge ${u.role}`}>{u.role}</span>
            </div>

            <div className="card-body">
              <p>
                <strong>Name:</strong> {u.name}
              </p>
              <p>
                <strong>Email:</strong> {u.email}
              </p>

              <p className="mobile-password">
                <strong>Password:</strong> {u.password}
              </p>

              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(u)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

