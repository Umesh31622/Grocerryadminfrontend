// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     axios
//       .get("https://grocerrybackend.vercel.app/api/user/all", {
//         headers: { Authorization: "Bearer " + token },
//       })
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>All Users</h2>
//       <table className="table mt-3">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, i) => (
//             <tr key={u._id}>
//               <td>{i + 1}</td>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role || "user"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    axios
      .get("https://grocerrybackend.vercel.app/api/user/all", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>👥 All Users</h2>
        <p>Manage all registered users from your system.</p>
      </div>

      {loading ? (
        <div className="loader">Loading users...</div>
      ) : users.length === 0 ? (
        <p className="no-data">No users found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`role-badge ${
                        u.role === "admin" ? "admin" : "user"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile card layout */}
          <div className="users-cards">
            {users.map((u, i) => (
              <div key={u._id} className="user-card">
                <div className="card-header">
                  <span className="card-index">#{i + 1}</span>
                  <span
                    className={`role-badge ${
                      u.role === "admin" ? "admin" : "user"
                    }`}
                  >
                    {u.role || "user"}
                  </span>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Name:</strong> {u.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {u.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
