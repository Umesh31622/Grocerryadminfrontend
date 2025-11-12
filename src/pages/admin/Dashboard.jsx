import React, { useEffect, useState } from "react";
import axios from "axios";

function Card({ title, value, icon }) {
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

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, brokers: 0, transactions: 0, revenue: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://grocerrybackend.vercel.app/api/admin/stats", { headers: { Authorization: "Bearer " + token } })
      .then((res) => setStats(res.data))
      .catch(() => {});
    axios
      .get("https://grocerrybackend.vercel.app/api/admin/recent", { headers: { Authorization: "Bearer " + token } })
      .then((res) => setRecent(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><Card title="Total Users" value={stats.users} icon="👥" /></div>
        <div className="col-md-3"><Card title="Total Brokers" value={stats.brokers} icon="💼" /></div>
        <div className="col-md-3"><Card title="Transactions" value={stats.transactions} icon="🔁" /></div>
        <div className="col-md-3"><Card title="Revenue" value={'$' + stats.revenue + 'K'} icon="💲" /></div>
      </div>

      <div className="card p-3 shadow-sm">
        <h5>
          Recent Activity{" "}
          <small className="text-primary float-end" style={{ cursor: "pointer" }}>
            View All
          </small>
        </h5>
        <table className="table mt-3 mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No records
                </td>
              </tr>
            )}
            {recent.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user}</td>
                <td>{r.action}</td>
                <td>{r.date}</td>
                <td>
                  <span className="badge bg-success">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
