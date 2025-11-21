
// // import React, { useState } from "react";
// // import { Link, Outlet, useNavigate } from "react-router-dom";

// // // Icons
// // import {
// //   Home,
// //   Users,
// //   List,
// //   BarChart2,
// //   DollarSign,
// //   LogOut,
// //   Menu,
// //   X,
// // } from "react-feather";

// // export default function AdminLayout() {
// //   const navigate = useNavigate();
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

// //   const logout = () => {
// //     localStorage.clear();
// //     navigate("/login", { replace: true });
// //   };

// //   // 👉 Mobile sidebar close function
// //   const handleMobileClose = () => {
// //     if (window.innerWidth <= 768) {
// //       setIsSidebarOpen(false);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         minHeight: "100vh",
// //         backgroundColor: "#f6f9fc",
// //       }}
// //     >
// //       {/* Sidebar */}
// //       <aside
// //         style={{
// //           width: isSidebarOpen ? 240 : 0,
// //           background: "#13385a",
// //           color: "#fff",
// //           padding: isSidebarOpen ? "24px" : 0,
// //           transition: "all 0.3s ease-in-out",
// //           overflow: "hidden",
// //           position: "fixed",
// //           height: "100vh",
// //           zIndex: 100,
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //           }}
// //         >
// //           <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Broker Admin</h4>

// //           <button
// //             onClick={() => setIsSidebarOpen(false)}
// //             style={{
// //               background: "transparent",
// //               border: "none",
// //               color: "#fff",
// //               cursor: "pointer",
// //               display: "none",
// //             }}
// //             className="close-btn"
// //           >
// //             <X size={24} />
// //           </button>
// //         </div>

// //         <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>
// //           {/* <li style={styles.navItem}>
// //             <Link to="/admin" style={styles.link} onClick={handleMobileClose}>
// //               <Home size={18} style={styles.icon} /> Dashboard
// //             </Link>
// //           </li> */}

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/users"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <Users size={18} style={styles.icon} /> Users
// //             </Link>
// //           </li>
// //            {/* <li style={styles.navItem}>
// //             <Link
// //               to="/admin/users"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <Users size={18} style={styles.icon} /> Category List
// //             </Link>
// //           </li> */}

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/CategoryManager"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <List size={18} style={styles.icon} /> Add Category
// //             </Link>
// //           </li>


// // <li style={styles.navItem}>
// //             <Link
// //               to="/admin/categorylist"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <List size={18} style={styles.icon} />  Category List
// //             </Link>
// //           </li>











// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/priceanalytics"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <BarChart2 size={18} style={styles.icon} /> Analytics
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/pricelist"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <DollarSign size={18} style={styles.icon} /> Add Product
// //                           </Link>
// //           </li>
// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/productlist"
// //               style={styles.link}
// //               onClick={handleMobileClose}
// //             >
// //               <DollarSign size={18} style={styles.icon} /> Product List
// //                           </Link>
// //           </li>
// //         </ul>

// //         <button
// //           onClick={logout}
// //           style={{
// //             background: "#e74c3c",
// //             border: "none",
// //             padding: "10px 14px",
// //             color: "#fff",
// //             borderRadius: 6,
// //             marginTop: 20,
// //             cursor: "pointer",
// //             width: "100%",
// //             fontWeight: 500,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             gap: 6,
// //           }}
// //         >
// //           <LogOut size={18} /> Logout
// //         </button>
// //       </aside>

// //       {/* Main Content */}
// //       <main
// //         style={{
// //           flex: 1,
// //           marginLeft: isSidebarOpen ? 240 : 0,
// //           transition: "margin 0.3s ease-in-out",
// //           width: "100%",
// //         }}
// //       >
// //         {/* Top Bar */}
// //         <div
// //           style={{
// //             background: "#fff",
// //             padding: "12px 20px",
// //             boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             position: "sticky",
// //             top: 0,
// //             zIndex: 99,
// //           }}
// //         >
// //           <button
// //             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //             style={{
// //               background: "transparent",
// //               border: "none",
// //               cursor: "pointer",
// //               color: "#13385a",
// //             }}
// //           >
// //             <Menu size={26} />
// //           </button>

// //           <h3 style={{ margin: 0, color: "#13385a", fontWeight: 600 }}>
// //             Admin Dashboard
// //           </h3>

// //           <div></div>
// //         </div>

// //         <div style={{ padding: "24px" }}>
// //           <Outlet />
// //         </div>
// //       </main>

// //       {/* Responsive CSS */}
// //       <style>
// //         {`
// //           @media (max-width: 768px) {
// //             aside {
// //               position: fixed;
// //               top: 0;
// //               left: 0;
// //               height: 100vh;
// //               width: 220px;
// //               transform: translateX(${isSidebarOpen ? "0" : "-100%"});
// //               transition: transform 0.3s ease-in-out;
// //             }

// //             main {
// //               margin-left: 0 !important;
// //               width: 100%;
// //             }

// //             .close-btn {
// //               display: inline-block !important;
// //             }
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // }

// // const styles = {
// //   navItem: {
// //     padding: "10px 0",
// //   },
// //   link: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 10,
// //     color: "#fff",
// //     textDecoration: "none",
// //     fontSize: 15,
// //     fontWeight: 500,
// //   },
// //   icon: {
// //     minWidth: 20,
// //   },
// // };
// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   Home,
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
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f9fc" }}>
      
//       {/* ======== MOBILE OVERLAY BACKDROP ======== */}
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100vh",
//             background: "rgba(0,0,0,0.45)",
//             zIndex: 90,
//           }}
//         ></div>
//       )}

//       {/* ======== SIDEBAR ======== */}
//       <aside
//         style={{
//           width: 240,
//           background: "#13385a",
//           color: "#fff",
//           padding: "24px",
//           transition: "all 0.3s ease-in-out",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           zIndex: 100,
//           transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
//         }}
//       >
//         {/* HEADER LOGO + CLOSE BUTTON */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Broker Admin</h4>

//           {/* MOBILE CLOSE BTN */}
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             style={{
//               background: "transparent",
//               border: "none",
//               color: "#fff",
//               cursor: "pointer",
//               display: "block",
//             }}
//             className="close-btn"
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

// <li style={styles.navItem}>
//             <Link
//               to="/admin/Descriptionmanager"
//               style={styles.link}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <List size={18} style={styles.icon} /> Add Description 
//             </Link>
//           </li>



//           <li style={styles.navItem}>
//             <Link
//               to="/admin/CategoryManager"
//               style={styles.link}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <List size={18} style={styles.icon} /> Add Category
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link
//               to="/admin/categorylist"
//               style={styles.link}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <List size={18} style={styles.icon} /> Category List
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link
//               to="/admin/priceanalytics"
//               style={styles.link}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <BarChart2 size={18} style={styles.icon} /> Analytics
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link
//               to="/admin/pricelist"
//               style={styles.link}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <DollarSign size={18} style={styles.icon} /> Add Product
//             </Link>
//           </li>

//           <li style={styles.navItem}>
//             <Link
//               to="/admin/productlist"
//               style={styles.link}
//               onClick={() => setIsSidebarOpen(false)}
//             >
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
//           marginLeft: 0,
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
//           {/* HAMBURGER BTN MOBILE */}
//           <button
//             onClick={() => setIsSidebarOpen(true)}
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

//       {/* CSS RESPONSIVE */}
//       <style>
//         {`
//           @media (min-width: 768px) {
//             aside {
//               transform: translateX(0) !important;
//               width: 240px !important;
//             }

//             .close-btn {
//               display: none !important;
//             }

//             main {
//               margin-left: 240px !important;
//             }
//           }
//         `}
//       </style>
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

import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  List,
  BarChart2,
  DollarSign,
  LogOut,
  Menu,
  X,
} from "react-feather";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Desktop default OPEN

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f9fc" }}>

      {/* BACKDROP — Visible only when sidebar open on mobile */}
      {isSidebarOpen && (
        <div
          className="backdrop"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.45)",
            zIndex: 90,
            display: window.innerWidth < 768 ? "block" : "none",
          }}
        />
      )}

      {/* ======== SIDEBAR ======== */}
      <aside
        style={{
          width: 240,
          background: "#13385a",
          color: "#fff",
          padding: "24px",
          transition: "all 0.3s ease",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 100,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* HEADER LOGO */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0, fontSize: "1.2rem" }}>Broker Admin</h4>

          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>
          <li style={styles.navItem}>
            <Link to="/admin/users" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <Users size={18} style={styles.icon} /> Users
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link to="/admin/Descriptionmanager" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <List size={18} style={styles.icon} /> Add Description
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link to="/admin/CategoryManager" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <List size={18} style={styles.icon} /> Add Category
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link to="/admin/categorylist" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <List size={18} style={styles.icon} /> Category List
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link to="/admin/priceanalytics" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <BarChart2 size={18} style={styles.icon} /> Analytics
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link to="/admin/pricelist" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <DollarSign size={18} style={styles.icon} /> Add Product
            </Link>
          </li>

          <li style={styles.navItem}>
            <Link to="/admin/productlist" style={styles.link} onClick={() => setIsSidebarOpen(false)}>
              <DollarSign size={18} style={styles.icon} /> Product List
            </Link>
          </li>
        </ul>

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

      {/* ======== MAIN CONTENT ======== */}
      <main
        style={{
          flex: 1,
          width: "100%",
          marginLeft: isSidebarOpen ? 240 : 0,
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

          <h3 style={{ margin: 0, color: "#13385a", fontWeight: 600 }}>Admin Dashboard</h3>

          <div></div>
        </div>

        <div style={{ padding: "24px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const styles = {
  navItem: {
    padding: "10px 0",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#fff",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
  },
  icon: {
    minWidth: 20,
  },
};

