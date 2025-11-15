// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./CategoryManager.css";

// const API_BASE = "https://grocerrybackend.vercel.app/api/categories";

// const CategoryManager = () => {
//   const [name, setName] = useState("");
//   const [categories, setCategories] = useState([]);

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Fetch categories
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

//   // Submit: Add / Edit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return toast.warn("Please enter category name");

//     const fd = new FormData();
//     fd.append("name", name);
//     if (image) fd.append("image", image);

//     try {
//       setLoading(true);

//       if (editMode) {
//         await axios.put(`${API_BASE}/${editId}`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Category updated");
//       } else {
//         await axios.post(API_BASE, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Category added");
//       }

//       setName("");
//       setImage(null);
//       setPreview(null);
//       setEditMode(false);
//       setEditId(null);
//       fetchCategories();
//     } catch (err) {
//       toast.error("Error saving category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit
//   const handleEdit = (cat) => {
//     setEditMode(true);
//     setEditId(cat._id);
//     setName(cat.name);
//     setPreview(cat.image || null);
//     setImage(null);

//     window.scrollTo(0, 0);
//   };

//   // Cancel Edit
//   const cancelEdit = () => {
//     setEditMode(false);
//     setEditId(null);
//     setName("");
//     setImage(null);
//     setPreview(null);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this category?")) return;

//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       toast.success("Category deleted");
//       fetchCategories();
//     } catch {
//       toast.error("Failed to delete");
//     }
//   };

//   // Pagination Logic
//   const lastIndex = currentPage * itemsPerPage;
//   const firstIndex = lastIndex - itemsPerPage;

//   const currentCategories = categories.slice(firstIndex, lastIndex);
//   const totalPages = Math.ceil(categories.length / itemsPerPage);

//   return (
//     <div className="category-container">
//       <div className="header">
//         <h2>📂 Category Manager</h2>
//         <p>Add, Edit & Delete categories with image support.</p>
//       </div>

//       {/* FORM */}
//       <form className="category-form" onSubmit={handleSubmit}>
//         <div className="form-row">
//           <input
//             type="text"
//             placeholder="Enter category name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//               setPreview(URL.createObjectURL(e.target.files[0]));
//             }}
//           />
//         </div>

//         {preview && (
//           <div className="preview-box">
//             <img src={preview} alt="preview" />
//           </div>
//         )}

//         <button type="submit" disabled={loading}>
//           {loading
//             ? "Saving..."
//             : editMode
//             ? "Update Category"
//             : "Add Category"}
//         </button>

//         {editMode && (
//           <button type="button" className="cancel-btn" onClick={cancelEdit}>
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       {/* TABLE (Desktop) */}
//       <div className="category-list">
//         {currentCategories.length === 0 ? (
//           <p className="no-data">No categories</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Created</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentCategories.map((cat, i) => (
//                 <tr key={cat._id}>
//                   <td>{firstIndex + i + 1}</td>

//                   <td>
//                     {cat.image ? (
//                       <img src={cat.image} className="table-img" alt="" />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>

//                   <td>{cat.name}</td>

//                   <td>
//                     {new Date(cat.createdAt).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>

//                   <td>
//                     <button className="edit-btn" onClick={() => handleEdit(cat)}>
//                       Edit
//                     </button>

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

//       {/* MOBILE CARDS */}
//       <div className="category-cards">
//         {currentCategories.map((cat, i) => (
//           <div key={cat._id} className="category-card">
//             <div className="card-top">
//               <span className="index-badge">#{firstIndex + i + 1}</span>

//               <button
//                 className="delete-btn small"
//                 onClick={() => handleDelete(cat._id)}
//               >
//                 Delete
//               </button>
//             </div>

//             <div className="card-body">
//               {cat.image && <img src={cat.image} className="mobile-img" alt="" />}

//               <p>
//                 <strong>Name:</strong> {cat.name}
//               </p>

//               <p>
//                 <strong>Created:</strong>{" "}
//                 {new Date(cat.createdAt).toLocaleDateString("en-IN")}
//               </p>

//               <button className="edit-btn mobile" onClick={() => handleEdit(cat)}>
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//         >
//           Previous
//         </button>

//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             className={currentPage === i + 1 ? "active-page" : ""}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategoryManager;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CategoryManager.css";

const API_BASE = "https://grocerrybackend.vercel.app/api/categories";

const emptyCategoryForm = { name: "", image: null };
const emptySubForm = { name: "", image: null };

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [catForm, setCatForm] = useState(emptyCategoryForm);
  const [editCatId, setEditCatId] = useState(null);
  const [expandedCat, setExpandedCat] = useState(null);

  const [subForm, setSubForm] = useState(emptySubForm);
  const [editSubInfo, setEditSubInfo] = useState({ catId: null, subId: null });

  const [catSaving, setCatSaving] = useState(false);
  const [subSaving, setSubSaving] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* ------------------------ Fetch Categories ------------------------ */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_BASE);

      const cats = res.data.categories || res.data.data || [];

      setCategories(
        cats.map((c) => ({
          ...c,
          subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
        }))
      );
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ------------------------ Category Input ------------------------ */
  const onCatInputChange = (e) => {
    const { name, files, value } = e.target;
    if (files) {
      setCatForm((p) => ({ ...p, image: files[0] }));
    } else {
      setCatForm((p) => ({ ...p, [name]: value }));
    }
  };

  /* ------------------------ Save Category ------------------------ */
  const submitCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) return toast.warn("Enter category name");

    const fd = new FormData();
    fd.append("name", catForm.name);
    if (catForm.image) fd.append("image", catForm.image);

    try {
      setCatSaving(true);

      if (editCatId) {
        await axios.put(`${API_BASE}/${editCatId}`, fd);
        toast.success("Category updated");
      } else {
        await axios.post(API_BASE, fd);
        toast.success("Category added");
      }

      setCatForm(emptyCategoryForm);
      setEditCatId(null);
      fetchCategories();
    } catch {
      toast.error("Save failed");
    } finally {
      setCatSaving(false);
    }
  };

  const startEditCategory = (cat) => {
    setEditCatId(cat._id);
    setCatForm({ name: cat.name, image: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Delete failed");
    }
  };
/* ------------------------ Subcategory Input ------------------------ */
const onSubInputChange = (e) => {
  const { name, value, files } = e.target;
  if (files) {
    setSubForm((p) => ({ ...p, image: files[0] }));
  } else {
    setSubForm((p) => ({ ...p, [name]: value }));
  }
};

/* ------------------------ Save Subcategory ------------------------ */
const submitSub = async (e, catId) => {
  e.preventDefault();
  if (!subForm.name.trim()) return toast.warn("Enter subcategory name");

  const fd = new FormData();
  fd.append("name", subForm.name);
  if (subForm.image) fd.append("image", subForm.image);

  try {
    setSubSaving(true);

    if (editSubInfo.subId) {
      await axios.put(
        `${API_BASE}/${editSubInfo.catId}/sub/${editSubInfo.subId}`,
        fd
      );
      toast.success("Subcategory updated");
    } else {
      await axios.post(`${API_BASE}/${catId}/sub`, fd);
      toast.success("Subcategory added");
    }

    setSubForm(emptySubForm);
    setEditSubInfo({ catId: null, subId: null });
    fetchCategories();
  } catch {
    toast.error("Save failed");
  } finally {
    setSubSaving(false);
  }
};

/* ------------------------ Start Edit Sub ------------------------ */
const startEditSub = (catId, sub) => {
  setExpandedCat(catId); // open that category
  setEditSubInfo({ catId, subId: sub._id });
  setSubForm({ name: sub.name, image: null });
};

/* ------------------------ Delete Subcategory ------------------------ */
const deleteSub = async (catId, subId) => {
  if (!window.confirm("Delete this subcategory?")) return;

  try {
    await axios.delete(`${API_BASE}/${catId}/sub/${subId}`);
    toast.success("Subcategory deleted");
    fetchCategories();
  } catch {
    toast.error("Delete failed");
  }
};


  /* ------------------------ Pagination ------------------------ */
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCats = categories.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  /* ------------------------ UI ------------------------ */
  return (
    <div className="category-container">
      <ToastContainer />

      <div className="header">
        <h2>📂 Category Manager</h2>
        <p>Add categories & subcategories (Name + Image only in list)</p>
      </div>

      {/* ---------------- Category Form ---------------- */}
      <form className="category-form" onSubmit={submitCategory}>
        <div className="form-row top-row">
          <input
            name="name"
            type="text"
            placeholder="Enter category name"
            value={catForm.name}
            onChange={onCatInputChange}
          />
          <input name="image" type="file" accept="image/*" onChange={onCatInputChange} />

          <button type="submit">{editCatId ? "Update Category" : "Add Category"}</button>

          {editCatId && (
            <button className="cancel-btn" type="button" onClick={() => setEditCatId(null)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ---------------- Category Table ---------------- */}
      <div className="category-list">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Subcategories</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCats.map((cat, i) => (
              <React.Fragment key={cat._id}>
                <tr>
                  <td>{firstIndex + i + 1}</td>

                  <td>
                    {cat.image ? (
                      <img src={cat.image} className="table-img" />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{cat.name}</td>

                  <td>
                    {(cat.subcategories || []).length}{" "}
                    <button
                      className="small-btn"
                      onClick={() =>
                        setExpandedCat(expandedCat === cat._id ? null : cat._id)
                      }
                    >
                      {expandedCat === cat._id ? "Hide" : "Manage"}
                    </button>
                  </td>

                  <td>
                    <button className="edit-btn" onClick={() => startEditCategory(cat)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteCategory(cat._id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Subcategories */}
                {expandedCat === cat._id && (
                  <tr>
                    <td colSpan="5">
                      <div className="sub-section">
                        <h4>Sub-categories of {cat.name}</h4>

                        <div className="sub-list">
                          {cat.subcategories.map((sub) => (
                            <div className="sub-item" key={sub._id}>
                              <div className="sub-left">
                                {sub.image ? (
                                  <img src={sub.image} className="sub-thumb" />
                                ) : (
                                  <div className="sub-thumb placeholder">No Image</div>
                                )}

                                <span>{sub.name}</span>
                              </div>

                              <div className="sub-actions">
                                <button
                                  className="edit-btn small"
                                  onClick={() => startEditSub(cat._id, sub)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="delete-btn small"
                                  onClick={() => deleteSub(cat._id, sub._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Sub form */}
                        <form
                          className="sub-form"
                          onSubmit={(e) => submitSub(e, cat._id)}
                        >
                          <input
                            name="name"
                            type="text"
                            placeholder="Subcategory name"
                            value={subForm.name}
                            onChange={onSubInputChange}
                          />

                          <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={onSubInputChange}
                          />

                          <button type="submit">
                            {editSubInfo.subId ? "Update Sub" : "Add Sub"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
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

