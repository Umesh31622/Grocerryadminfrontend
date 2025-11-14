// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "./CategoryManager.css";

// // const API_BASE = "https://grocerrybackend.vercel.app/api/categories";

// // const CategoryManager = () => {
// //   const [name, setName] = useState("");
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Fetch categories
// //   const fetchCategories = async () => {
// //     try {
// //       const res = await axios.get(API_BASE);
// //       setCategories(res.data.categories);
// //     } catch (err) {
// //       toast.error("Failed to load categories");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // ✅ Add Category
// //   const handleAddCategory = async (e) => {
// //     e.preventDefault();
// //     if (!name.trim()) {
// //       return toast.warn("Please enter a category name");
// //     }

// //     try {
// //       setLoading(true);
// //       const res = await axios.post(API_BASE, { name });
// //       toast.success(res.data.message);
// //       setName("");
// //       fetchCategories();
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error adding category");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Delete Category
// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this category?")) {
// //       try {
// //         await axios.delete(`${API_BASE}/${id}`);
// //         toast.success("Category deleted successfully");
// //         fetchCategories();
// //       } catch (err) {
// //         toast.error("Error deleting category");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="category-container">
// //       <h2>Category Manager</h2>

// //       <form className="category-form" onSubmit={handleAddCategory}>
// //         <input
// //           type="text"
// //           placeholder="Enter category name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //         />
// //         <button type="submit" disabled={loading}>
// //           {loading ? "Adding..." : "Add Category"}
// //         </button>
// //       </form>

// //       <div className="category-list">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Category Name</th>
// //               <th>Created At</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {categories.length > 0 ? (
// //               categories.map((cat, index) => (
// //                 <tr key={cat._id}>
// //                   <td>{index + 1}</td>
// //                   <td>{cat.name}</td>
// //                   <td>{new Date(cat.createdAt).toLocaleString()}</td>
// //                   <td>
// //                     <button
// //                       className="delete-btn"
// //                       onClick={() => handleDelete(cat._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="4" style={{ textAlign: "center" }}>
// //                   No categories found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoryManager;
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

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setCategories(res.data.categories || []);
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return toast.warn("Please enter a category name");

//     try {
//       setLoading(true);
//       const res = await axios.post(API_BASE, { name });
//       toast.success(res.data.message || "Category added");
//       setName("");
//       fetchCategories();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error adding category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?"))
//       return;
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       toast.success("Category deleted successfully");
//       fetchCategories();
//     } catch {
//       toast.error("Error deleting category");
//     }
//   };

//   return (
//     <div className="category-container">
//       <div className="header">
//         <h2>📂 Category Manager</h2>
//         <p>Manage your product categories easily</p>
//       </div>

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

//       {/* Desktop Table View */}
//       <div className="category-list">
//         {categories.length === 0 ? (
//           <p className="no-data">No categories found</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Category Name</th>
//                 <th>Created At</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((cat, index) => (
//                 <tr key={cat._id}>
//                   <td>{index + 1}</td>
//                   <td>{cat.name}</td>
//                   <td>
//                     {new Date(cat.createdAt).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(cat._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Mobile Card Layout */}
//       <div className="category-cards">
//         {categories.map((cat, i) => (
//           <div key={cat._id} className="category-card">
//             <div className="card-top">
//               <span className="index-badge">#{i + 1}</span>
//               <button
//                 className="delete-btn small"
//                 onClick={() => handleDelete(cat._id)}
//               >
//                 Delete
//               </button>
//             </div>
//             <div className="card-body">
//               <p>
//                 <strong>Name:</strong> {cat.name}
//               </p>
//               <p>
//                 <strong>Created:</strong>{" "}
//                 {new Date(cat.createdAt).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
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

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch categories
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

  // Submit: Add / Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warn("Please enter category name");

    const fd = new FormData();
    fd.append("name", name);
    if (image) fd.append("image", image);

    try {
      setLoading(true);

      if (editMode) {
        await axios.put(`${API_BASE}/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category updated");
      } else {
        await axios.post(API_BASE, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category added");
      }

      setName("");
      setImage(null);
      setPreview(null);
      setEditMode(false);
      setEditId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat._id);
    setName(cat.name);
    setPreview(cat.image || null);
    setImage(null);

    window.scrollTo(0, 0);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setName("");
    setImage(null);
    setPreview(null);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete");
    }
  };

  // Pagination Logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentCategories = categories.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="category-container">
      <div className="header">
        <h2>📂 Category Manager</h2>
        <p>Add, Edit & Delete categories with image support.</p>
      </div>

      {/* FORM */}
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editMode
            ? "Update Category"
            : "Add Category"}
        </button>

        {editMode && (
          <button type="button" className="cancel-btn" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* TABLE (Desktop) */}
      <div className="category-list">
        {currentCategories.length === 0 ? (
          <p className="no-data">No categories</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.map((cat, i) => (
                <tr key={cat._id}>
                  <td>{firstIndex + i + 1}</td>

                  <td>
                    {cat.image ? (
                      <img src={cat.image} className="table-img" alt="" />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{cat.name}</td>

                  <td>
                    {new Date(cat.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(cat)}>
                      Edit
                    </button>

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

      {/* MOBILE CARDS */}
      <div className="category-cards">
        {currentCategories.map((cat, i) => (
          <div key={cat._id} className="category-card">
            <div className="card-top">
              <span className="index-badge">#{firstIndex + i + 1}</span>

              <button
                className="delete-btn small"
                onClick={() => handleDelete(cat._id)}
              >
                Delete
              </button>
            </div>

            <div className="card-body">
              {cat.image && <img src={cat.image} className="mobile-img" alt="" />}

              <p>
                <strong>Name:</strong> {cat.name}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(cat.createdAt).toLocaleDateString("en-IN")}
              </p>

              <button className="edit-btn mobile" onClick={() => handleEdit(cat)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
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

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;
