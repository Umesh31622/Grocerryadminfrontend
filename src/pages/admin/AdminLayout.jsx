
// // import React, { useState, useEffect } from "react";
// // import { Link, Outlet, useNavigate } from "react-router-dom";
// // import {
// //   Users,
// //   List,
// //   BarChart2,
// //   DollarSign,
// //   LogOut,
// //   Menu,
// //   Grid,
// //   Package,
// //   FileText,
// //   Clock,
// // } from "react-feather";

// // export default function AdminLayout() {
// //   const navigate = useNavigate();

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [hoveredLink, setHoveredLink] = useState(null);

// //   const logout = () => {
// //     localStorage.clear();
// //     navigate("/login", { replace: true });
// //   };

// //   // Detect screen size
// //   useEffect(() => {
// //     const handler = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener("resize", handler);
// //     return () => window.removeEventListener("resize", handler);
// //   }, []);

// //   // If mobile, keep sidebar closed initially
// //   useEffect(() => {
// //     if (isMobile) setIsSidebarOpen(false);
// //     else setIsSidebarOpen(true);
// //   }, [isMobile]);

// //   return (
// //     <div style={{ display: "flex", minHeight: "100vh", background: "#f6f9fc" }}>

// //       {/* -------- BACKDROP (Mobile Only) -------- */}
// //       {isMobile && isSidebarOpen && (
// //         <div
// //           onClick={() => setIsSidebarOpen(false)}
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             width: "100%",
// //             height: "100vh",
// //             background: "rgba(0,0,0,0.45)",
// //             zIndex: 90,
// //           }}
// //         />
// //       )}

// //       {/* -------- SIDEBAR -------- */}
// //       <aside
// //         style={{
// //           width: 250,
// //           background: "linear-gradient(180deg, #0f2e47 0%, #1a4d6f 100%)",
// //           color: "#fff",
// //           padding: "24px",
// //           position: "fixed",
// //           top: 0,
// //           left: 0,
// //           height: "100vh",
// //           zIndex: 100,
// //           transition: "transform 0.35s ease",
// //           transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
// //           boxShadow: isMobile ? "4px 0 20px rgba(0,0,0,0.3)" : "2px 0 10px rgba(0,0,0,0.1)",
// //           borderRight: "1px solid rgba(255,255,255,0.1)",
// //         }}
// //       >
// //         {/* HEADER */}
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             paddingBottom: "20px",
// //             borderBottom: "2px solid rgba(255,255,255,0.15)",
// //             marginBottom: "8px",
// //           }}
// //         >
// //           <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px" }}>Broker Admin</h3>

// //           {isMobile && (
// //             <button
// //               onClick={() => setIsSidebarOpen(false)}
// //               style={{
// //                 background: "transparent",
// //                 border: "none",
// //                 color: "#fff",
// //                 cursor: "pointer",
// //                 fontSize: "20px",
// //               }}
// //             >
// //               ✖
// //             </button>
// //           )}
// //         </div>

// //         {/* -------- NAVIGATION -------- */}
// //         <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/users"
// //               style={{
// //                 ...styles.link,
// //     background: hoveredLink === 'users'
// //   ? "linear-gradient(135deg, #983a30 0%, #c0392b 100%)"
// //   : "transparent",
// // color: hoveredLink === 'users' ? "#fff" : "#e8f1f8",
// // borderColor: hoveredLink === 'users' ? "#c0392b" : "transparent",

// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('users')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <Users size={18} style={styles.icon} /> Users
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/Descriptionmanager"
// //               style={{
// //                 ...styles.link,
// //                 background: hoveredLink === 'desc' ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                 borderColor: hoveredLink === 'desc' ? 'rgba(255,255,255,0.3)' : 'transparent',
// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('desc')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <FileText size={18} style={styles.icon} /> Add Description
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/CategoryManager"
// //               style={{
// //                 ...styles.link,
// //                 background: hoveredLink === 'catmgr' ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                 borderColor: hoveredLink === 'catmgr' ? 'rgba(255,255,255,0.3)' : 'transparent',
// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('catmgr')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <Grid size={18} style={styles.icon} /> Add Category
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/categorylist"
// //               style={{
// //                 ...styles.link,
// //                 background: hoveredLink === 'catlist' ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                 borderColor: hoveredLink === 'catlist' ? 'rgba(255,255,255,0.3)' : 'transparent',
// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('catlist')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <List size={18} style={styles.icon} /> Category List
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/priceanalytics"
// //               style={{
// //                 ...styles.link,
// //                 background: hoveredLink === 'analytics' ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                 borderColor: hoveredLink === 'analytics' ? 'rgba(255,255,255,0.3)' : 'transparent',
// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('analytics')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <BarChart2 size={18} style={styles.icon} /> Analytics
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/pricelist"
// //               style={{
// //                 ...styles.link,
// //                 background: hoveredLink === 'addprod' ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                 borderColor: hoveredLink === 'addprod' ? 'rgba(255,255,255,0.3)' : 'transparent',
// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('addprod')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <Package size={18} style={styles.icon} /> Add Product
// //             </Link>
// //           </li>

// //           <li style={styles.navItem}>
// //             <Link
// //               to="/admin/productlist"
// //               style={{
// //                 ...styles.link,
// //                 background: hoveredLink === 'prodlist' ? 'rgba(255,255,255,0.15)' : 'transparent',
// //                 borderColor: hoveredLink === 'prodlist' ? 'rgba(255,255,255,0.3)' : 'transparent',
// //               }}
// //               onClick={() => isMobile && setIsSidebarOpen(false)}
// //               onMouseEnter={() => setHoveredLink('prodlist')}
// //               onMouseLeave={() => setHoveredLink(null)}
// //             >
// //               <DollarSign size={18} style={styles.icon} /> Product List
// //             </Link>
// //           </li>

// //         </ul>

// //         {/* -------- LOGOUT -------- */}
// //         <button
// //           onClick={logout}
// //           style={{
// //             background: "linear-gradient(135deg, #983a30ff 0%, #c0392b 100%)",
// //             border: "1px solid rgba(255,255,255,0.2)",
// //             padding: "12px 16px",
// //             color: "#fff",
// //             borderRadius: 8,
// //             marginTop: 20,
// //             cursor: "pointer",
// //             width: "100%",
// //             fontWeight: 600,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             gap: 8,
// //             boxShadow: "0 4px 12px rgba(231, 76, 60, 0.3)",
// //             transition: "all 0.25s ease",
// //           }}
// //           onMouseEnter={(e) => {
// //             e.target.style.transform = "translateY(-2px)";
// //             e.target.style.boxShadow = "0 6px 16px rgba(231, 76, 60, 0.4)";
// //           }}
// //           onMouseLeave={(e) => {
// //             e.target.style.transform = "translateY(0)";
// //             e.target.style.boxShadow = "0 4px 12px rgba(231, 76, 60, 0.3)";
// //           }}
// //         >
// //           <LogOut size={18} /> Logout
// //         </button>
// //       </aside>

// //       {/* -------- MAIN CONTENT -------- */}
// //       <main
// //         style={{
// //           flex: 1,
// //           width: "100%",
// //           marginLeft: !isMobile && isSidebarOpen ? 250 : 0,
// //           transition: "margin-left 0.35s ease",
// //         }}
// //       >
// //         {/* TOP BAR */}
// //         <div
// //           style={{
// //             background: "#fff",
// //             padding: "12px 20px",
// //             boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             position: "sticky",
// //             top: 0,
// //             zIndex: 50,
// //             borderBottom: "1px solid #e5e7eb",
// //           }}
// //         >
// //           {/* Hamburger (Desktop + Mobile both) */}
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

// //         {/* CONTENT */}
// //         <div style={{ padding: "24px" }}>
// //           <Outlet />
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // const styles = {
// //   navItem: {
// //     padding: "12px 0",
// //   },
// //   link: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 12,
// //     color: "#e8f1f8",
// //     textDecoration: "none",
// //     fontSize: 15,
// //     fontWeight: 500,
// //     padding: "10px 12px",
// //     borderRadius: 8,
// //     transition: "all 0.25s ease",
// //     border: "1px solid transparent",
// //   },
// //   icon: {
// //     minWidth: 20,
// //   },
// // };
// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   Users,
//   List,
//   BarChart2,
//   DollarSign,
//   LogOut,
//   Menu,
//   Grid,
//   Package,
//   FileText,
// } from "react-feather";

// export default function AdminLayout() {
//   const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   useEffect(() => {
//     if (isMobile) setIsSidebarOpen(false);
//     else setIsSidebarOpen(true);
//   }, [isMobile]);

//   // ---- Redirect to Product List by Default ----
//   useEffect(() => {
//     if (window.location.pathname === "/admin") {
//       navigate("/admin/productlist");
//     }
//   }, []);

//   // UNIVERSAL HOVER STYLE
//   const hoverStyle = (isHover) => ({
//     ...styles.link,
//     background: isHover
//       ? "linear-gradient(135deg, #983a30 0%, #c0392b 100%)"
//       : "transparent",
//     color: isHover ? "#fff" : "#e8f1f8",
//     borderColor: isHover ? "#c0392b" : "transparent",
//   });

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: "#f6f9fc" }}>

//       {isMobile && isSidebarOpen && (
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
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         style={{
//           width: 250,
//           background: "linear-gradient(180deg, #0f2e47 0%, #1a4d6f 100%)",
//           color: "#fff",
//           padding: "24px",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           zIndex: 100,
//           transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
//           transition: "transform 0.35s ease",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingBottom: "20px",
//             borderBottom: "2px solid rgba(255,255,255,0.15)",
//           }}
//         >
//           <h3 style={{ margin: 0 }}>Broker Admin</h3>

//           {isMobile && (
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "#fff",
//                 cursor: "pointer",
//               }}
//             >
//               ✖
//             </button>
//           )}
//         </div>

//         {/* NAVIGATION */}
//         <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>
//           {[
//             { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
//             { to: "/admin/Descriptionmanager", label: "Add Description", icon: <FileText size={18} /> },
//             { to: "/admin/CategoryManager", label: "Add Category", icon: <Grid size={18} /> },
//             { to: "/admin/categorylist", label: "Category List", icon: <List size={18} /> },
//             { to: "/admin/priceanalytics", label: "Analytics", icon: <BarChart2 size={18} /> },
//             { to: "/admin/pricelist", label: "Add Product", icon: <Package size={18} /> },
//             { to: "/admin/productlist", label: "Product List", icon: <DollarSign size={18} /> },
//           ].map((item, i) => (
//             <li key={i} style={styles.navItem}>
//               <Link
//                 to={item.to}
//                 style={hoverStyle(hoveredLink === i)}
//                 onMouseEnter={() => setHoveredLink(i)}
//                 onMouseLeave={() => setHoveredLink(null)}
//                 onClick={() => isMobile && setIsSidebarOpen(false)}
//               >
//                 {item.icon} {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* LOGOUT */}
//         <button
//           onClick={logout}
//           style={styles.logout}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main
//         style={{
//           flex: 1,
//           width: "100%",
//           marginLeft: !isMobile && isSidebarOpen ? 250 : 0,
//           transition: "margin-left 0.35s ease",
//         }}
//       >
//         <div
//           style={{
//             background: "#fff",
//             padding: "12px 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//           }}
//         >
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={{ background: "transparent", border: "none", cursor: "pointer" }}
//           >
//             <Menu size={26} />
//           </button>

//           <h3 style={{ margin: 0 }}>Admin Dashboard</h3>

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
//   navItem: { padding: "12px 0" },

//   link: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//     textDecoration: "none",
//     fontSize: 15,
//     fontWeight: 500,
//     padding: "10px 12px",
//     borderRadius: 8,
//     border: "1px solid transparent",
//     transition: "all 0.25s ease",
//   },

//   logout: {
//     background: "linear-gradient(135deg, #983a30 0%, #c0392b 100%)",
//     border: "1px solid rgba(255,255,255,0.2)",
//     padding: "12px 16px",
//     color: "#fff",
//     borderRadius: 8,
//     marginTop: 20,
//     cursor: "pointer",
//     width: "100%",
//     fontWeight: 600,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
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
} from "react-feather";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredLink, setHoveredLink] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, [isMobile]);

  // ALWAYS redirect to pricelist when entering admin
  useEffect(() => {
    const current = window.location.pathname;

    // Redirect if user opens /admin OR /admin/users OR any random admin page
    if (
      current === "/admin" ||
      current === "/admin/" ||
      current === "/admin/users"
    ) {
      navigate("/admin/pricelist", { replace: true });
    }
  }, []);

  // universal link hover
  const hoverStyle = (isHover) => ({
    ...styles.link,
    background: isHover
      ? "linear-gradient(135deg, #983a30 0%, #c0392b 100%)"
      : "transparent",
    color: isHover ? "#fff" : "#e8f1f8",
    borderColor: isHover ? "#c0392b" : "transparent",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f6f9fc" }}>

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

      <aside
        style={{
          width: 250,
          background: "linear-gradient(180deg, #0f2e47 0%, #1a4d6f 100%)",
          color: "#fff",
          padding: "24px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 100,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "20px",
            borderBottom: "2px solid rgba(255,255,255,0.15)",
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
                fontSize: "20px",
              }}
            >
              ✖
            </button>
          )}
        </div>

        <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>
          {[
            { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
            {
              to: "/admin/Descriptionmanager",
              label: "Add Description",
              icon: <FileText size={18} />,
            },
            {
              to: "/admin/CategoryManager",
              label: "Add Category",
              icon: <Grid size={18} />,
            },
            {
              to: "/admin/categorylist",
              label: "Category List",
              icon: <List size={18} />,
            },
            {
              to: "/admin/priceanalytics",
              label: "Analytics",
              icon: <BarChart2 size={18} />,
            },
            {
              to: "/admin/pricelist",
              label: "Add Product",
              icon: <Package size={18} />,
            },
            {
              to: "/admin/productlist",
              label: "Product List",
              icon: <DollarSign size={18} />,
            },
          ].map((item, i) => (
            <li key={i} style={styles.navItem}>
              <Link
                to={item.to}
                style={hoverStyle(hoveredLink === i)}
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={logout} style={styles.logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main
        style={{
          flex: 1,
          width: "100%",
          marginLeft: !isMobile && isSidebarOpen ? 250 : 0,
          transition: "margin-left 0.35s ease",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
          }}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            <Menu size={26} />
          </button>

          <h3 style={{ margin: 0 }}>Admin Dashboard</h3>

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
    padding: "12px 0",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#e8f1f8",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid transparent",
    transition: "all 0.25s ease",
  },
  logout: {
    background: "linear-gradient(135deg, #983a30 0%, #c0392b 100%)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "12px 16px",
    color: "#fff",
    borderRadius: 8,
    marginTop: 20,
    cursor: "pointer",
    width: "100%",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
};
