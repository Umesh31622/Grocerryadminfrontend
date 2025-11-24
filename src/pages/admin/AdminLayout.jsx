
// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   Users,
//   List,
//   BarChart2,
//   DollarSign,
//   LogOut,
//   Menu,
//   X,
// } from "react-feather";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Desktop default OPEN

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f9fc" }}>

//       {/* BACKDROP — Visible only when sidebar open on mobile */}
//       {isSidebarOpen && (
//         <div
//           className="backdrop"
//           onClick={() => setIsSidebarOpen(false)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100vh",
//             background: "rgba(0,0,0,0.45)",
//             zIndex: 90,
//             display: window.innerWidth < 768 ? "block" : "none",
//           }}
//         />
//       )}

//       {/* ======== SIDEBAR ======== */}
//       <aside
//         style={{
//           width: 240,
//           background: "#13385a",
//           color: "#fff",
//           padding: "24px",
//           transition: "all 0.3s ease",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           zIndex: 100,
//           transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
//         }}
//       >
//         {/* HEADER LOGO */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Broker Admin</h4>

//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             style={{
//               background: "transparent",
//               border: "none",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>
//           <li style={styles.navItem}>
//             <Link to="/admin/users" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <Users size={18} style={styles.icon} /> Users
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link to="/admin/Descriptionmanager" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <List size={18} style={styles.icon} /> Add Description
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link to="/admin/CategoryManager" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <List size={18} style={styles.icon} /> Add Category
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link to="/admin/categorylist" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <List size={18} style={styles.icon} /> Category List
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link to="/admin/priceanalytics" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <BarChart2 size={18} style={styles.icon} /> Analytics
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link to="/admin/pricelist" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <DollarSign size={18} style={styles.icon} /> Add Product
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link to="/admin/productlist" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
//               <DollarSign size={18} style={styles.icon} /> Product List
//             </Link>
//           </li>
//         </ul>

//         <button
//           onClick={logout}
//           style={{
//             background: "#e74c3c",
//             border: "none",
//             padding: "10px 14px",
//             color: "#fff",
//             borderRadius: 6,
//             marginTop: 20,
//             cursor: "pointer",
//             width: "100%",
//             fontWeight: 500,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 6,
//           }}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </aside>

//       {/* ======== MAIN CONTENT ======== */}
//       <main
//         style={{
//           flex: 1,
//           width: "100%",
//           marginLeft: isSidebarOpen ? 240 : 0,
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {/* TOP BAR */}
//         <div
//           style={{
//             background: "#fff",
//             padding: "12px 20px",
//             boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//             zIndex: 50,
//           }}
//         >
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={{
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//               color: "#13385a",
//             }}
//           >
//             <Menu size={26} />
//           </button>

//           <h3 style={{ margin: 0, color: "#13385a", fontWeight: 600 }}>Admin Dashboard</h3>

//           <div></div>
//         </div>

//         <div style={{ padding: "24px" }}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

// const styles = {
//   navItem: {
//     padding: "10px 0",
//   },
//   link: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     color: "#fff",
//     textDecoration: "none",
//     fontSize: 15,
//     fontWeight: 500,
//   },
//   icon: {
//     minWidth: 20,
//   },
// };


import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  List,
  BarChart2,
  DollarSign,
  LogOut,
  Menu,
  Grid,
  Package,
  FileText,
  Clock,
} from "react-feather";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // Detect screen size
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // If mobile, keep sidebar closed initially
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, [isMobile]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f6f9fc" }}>

      {/* -------- BACKDROP (Mobile Only) -------- */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.45)",
            zIndex: 90,
          }}
        />
      )}

      {/* -------- SIDEBAR -------- */}
      <aside
        style={{
          width: 250,
          background: "#113b5e",
          color: "#fff",
          padding: "24px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 100,
          transition: "transform 0.35s ease",
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: isMobile ? "2px 0 10px rgba(0,0,0,0.45)" : "none",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Broker Admin</h3>

          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          )}
        </div>

        {/* -------- NAVIGATION -------- */}
        <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>

          <li style={styles.navItem}>
            <Link
              to="/admin/users"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <Users size={18} style={styles.icon} /> Users
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link
              to="/admin/Descriptionmanager"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <FileText size={18} style={styles.icon} /> Add Description
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link
              to="/admin/CategoryManager"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <Grid size={18} style={styles.icon} /> Add Category
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link
              to="/admin/categorylist"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <List size={18} style={styles.icon} /> Category List
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link
              to="/admin/priceanalytics"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <BarChart2 size={18} style={styles.icon} /> Analytics
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link
              to="/admin/pricelist"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <Package size={18} style={styles.icon} /> Add Product
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link
              to="/admin/productlist"
              style={styles.link}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <DollarSign size={18} style={styles.icon} /> Product List
            </Link>
          </li>

         

        </ul>

        {/* -------- LOGOUT -------- */}
        <button
          onClick={logout}
          style={{
            background: "#e74c3c",
            border: "none",
            padding: "10px 14px",
            color: "#fff",
            borderRadius: 6,
            marginTop: 20,
            cursor: "pointer",
            width: "100%",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* -------- MAIN CONTENT -------- */}
      <main
        style={{
          flex: 1,
          width: "100%",
          marginLeft: !isMobile ? 250 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            background: "#fff",
            padding: "12px 20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          {/* Hamburger (Desktop + Mobile both) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#13385a",
            }}
          >
            <Menu size={26} />
          </button>

          <h3 style={{ margin: 0, color: "#13385a", fontWeight: 600 }}>
            Admin Dashboard
          </h3>

          <div></div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "24px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const styles = {
  navItem: {
    padding: "12px 0",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#fff",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    padding: "8px 8px",
    borderRadius: 6,
    transition: "0.2s",
  },
  icon: {
    minWidth: 20,
  },
};

