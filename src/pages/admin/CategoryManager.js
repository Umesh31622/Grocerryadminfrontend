// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./CategoryManager.css";

// const API_BASE = "https://grocerrybackend.vercel.app/api/categories";

// const CategoryManager = () => {
//   const [name, setName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setCategories(res.data.categories);
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // ✅ Add Category
//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       return toast.warn("Please enter a category name");
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(API_BASE, { name });
//       toast.success(res.data.message);
//       setName("");
//       fetchCategories();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error adding category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete Category
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`${API_BASE}/${id}`);
//         toast.success("Category deleted successfully");
//         fetchCategories();
//       } catch (err) {
//         toast.error("Error deleting category");
//       }
//     }
//   };

//   return (
//     <div className="category-container">
//       <h2>Category Manager</h2>

//       <form className="category-form" onSubmit={handleAddCategory}>
//         <input
//           type="text"
//           placeholder="Enter category name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Category"}
//         </button>
//       </form>

//       <div className="category-list">
//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Category Name</th>
//               <th>Created At</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.length > 0 ? (
//               categories.map((cat, index) => (
//                 <tr key={cat._id}>
//                   <td>{index + 1}</td>
//                   <td>{cat.name}</td>
//                   <td>{new Date(cat.createdAt).toLocaleString()}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(cat._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center" }}>
//                   No categories found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CategoryManager;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CategoryManager.css";

const API_BASE = "https://grocerrybackend.vercel.app/api/categories";

const CategoryManager = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCategories(res.data.categories || []);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warn("Please enter a category name");

    try {
      setLoading(true);
      const res = await axios.post(API_BASE, { name });
      toast.success(res.data.message || "Category added");
      setName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="category-container">
      <div className="header">
        <h2>📂 Category Manager</h2>
        <p>Manage your product categories easily</p>
      </div>

      <form className="category-form" onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Desktop Table View */}
      <div className="category-list">
        {categories.length === 0 ? (
          <p className="no-data">No categories found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    {new Date(cat.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="category-cards">
        {categories.map((cat, i) => (
          <div key={cat._id} className="category-card">
            <div className="card-top">
              <span className="index-badge">#{i + 1}</span>
              <button
                className="delete-btn small"
                onClick={() => handleDelete(cat._id)}
              >
                Delete
              </button>
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> {cat.name}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(cat.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
