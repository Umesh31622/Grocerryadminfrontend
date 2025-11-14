
// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import "./PriceList.css";

// // const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// // const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// // export default function PriceList() {
// //   const [items, setItems] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [form, setForm] = useState({
// //     name: "",
// //     category: "",
// //     description: "",
// //     basePrice: "",
// //     difference: "",
// //     validTill: "",
// //     file: null,
// //   });
// //   const [editId, setEditId] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [csvFile, setCsvFile] = useState(null);
// //   const [addingCategory, setAddingCategory] = useState(false);
// //   const [newCategoryName, setNewCategoryName] = useState("");
// //   const csvInputRef = useRef();

// //   useEffect(() => {
// //     fetchItems();
// //     fetchCategories();

// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const fetchItems = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(API_URL);
// //       if (res.data.success) setItems(res.data.data);
// //     } catch (err) {
// //       console.error("Error fetching items:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const res = await axios.get(CATEGORY_URL);
// //       if (res.data.success) setCategories(res.data.categories);
// //     } catch (err) {
// //       console.error("Error fetching categories:", err);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (files) setForm({ ...form, file: files[0] });
// //     else setForm({ ...form, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       if (!form.name || !form.category || !form.basePrice) {
// //         alert("Name, category, and base price are required");
// //         setLoading(false);
// //         return;
// //       }

// //       const fd = new FormData();
// //       Object.keys(form).forEach((key) => {
// //         if (form[key]) fd.append(key, form[key]);
// //       });

// //       if (editId) await axios.put(`${API_URL}/${editId}`, fd);
// //       else await axios.post(API_URL, fd);

// //       setForm({
// //         name: "",
// //         category: "",
// //         description: "",
// //         basePrice: "",
// //         difference: "",
// //         validTill: "",
// //         file: null,
// //       });
// //       setEditId(null);
// //       fetchItems();
// //     } catch (err) {
// //       console.error("Error saving price:", err);
// //       alert("Failed to save price.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setForm({
// //       name: item.name,
// //       category: item.category?._id || "",
// //       description: item.description || "",
// //       basePrice: item.basePrice,
// //       difference: item.difference,
// //       validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //       file: null,
// //     });
// //     setEditId(item._id);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this item?")) return;
// //     setLoading(true);
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       fetchItems();
// //     } catch (err) {
// //       console.error("Error deleting item:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     setForm({
// //       name: "",
// //       category: "",
// //       description: "",
// //       basePrice: "",
// //       difference: "",
// //       validTill: "",
// //       file: null,
// //     });
// //     setEditId(null);
// //   };

// //   const handleAddCategory = async () => {
// //     if (!newCategoryName.trim()) return alert("Enter category name");
// //     try {
// //       const res = await axios.post(CATEGORY_URL, { name: newCategoryName.trim() });
// //       if (res.data.success) {
// //         setNewCategoryName("");
// //         setAddingCategory(false);
// //         fetchCategories();
// //         alert("Category added successfully!");
// //       } else {
// //         alert(res.data.message || "Failed to add category");
// //       }
// //     } catch (err) {
// //       console.error("Add category error:", err);
// //       alert("Add category failed");
// //     }
// //   };

// //   const handleCsvSelect = (e) => setCsvFile(e.target.files[0]);

// //   const handleImportCsv = async () => {
// //     if (!csvFile) return alert("Choose a CSV file first");
// //     const fd = new FormData();
// //     fd.append("file", csvFile);
// //     setLoading(true);
// //     try {
// //       const res = await axios.post(`${API_URL}/import`, fd, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       if (res.data.success) {
// //         alert(`Imported ${res.data.inserted || 0} items`);
// //         fetchItems();
// //         setCsvFile(null);
// //         if (csvInputRef.current) csvInputRef.current.value = null;
// //       } else alert("Import failed, check file format");
// //     } catch (err) {
// //       console.error("Import error:", err);
// //       alert("Import failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleExportCsv = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
// //       const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = `prices_export_${Date.now()}.csv`;
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();
// //       window.URL.revokeObjectURL(url);
// //     } catch (err) {
// //       console.error("Export error:", err);
// //       alert("Export failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="price-container">
// //       <div className="header-section">
// //         <h1>💰 Price Management</h1>
// //         <p>Manage prices, import/export CSV, and add new categories easily.</p>
// //       </div>

// //       {/* Add/Edit Form */}
// //       <div className="price-form-card">
// //         <h2>{editId ? "✏️ Edit Price" : "➕ Add New Price"}</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-grid">
// //             <div className="form-group">
// //               <label>Product Name *</label>
// //               <input name="name" value={form.name} onChange={handleChange} placeholder="Enter name" required />
// //             </div>

// //             <div className="form-group">
// //               <label>Category *</label>
// //               <div className="category-row">
// //                 <select name="category" value={form.category} onChange={handleChange} required>
// //                   <option value="">Select Category</option>
// //                   {categories.map((cat) => (
// //                     <option key={cat._id} value={cat._id}>
// //                       {cat.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <button
// //                   type="button"
// //                   className="btn small"
// //                   onClick={() => setAddingCategory(!addingCategory)}
// //                 >
// //                   {addingCategory ? "Close" : "Add"}
// //                 </button>
// //               </div>
// //             </div>

// //             {addingCategory && (
// //               <div className="form-group full-width">
// //                 <label>New Category</label>
// //                 <div className="category-row">
// //                   <input
// //                     value={newCategoryName}
// //                     onChange={(e) => setNewCategoryName(e.target.value)}
// //                     placeholder="Enter new category"
// //                   />
// //                   <button
// //                     type="button"
// //                     className="btn primary"
// //                     onClick={handleAddCategory}
// //                   >
// //                     Create
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             <div className="form-group">
// //               <label>Base Price (₹) *</label>
// //               <input
// //                 type="number"
// //                 name="basePrice"
// //                 value={form.basePrice}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Difference (₹)</label>
// //               <input
// //                 type="number"
// //                 name="difference"
// //                 value={form.difference}
// //                 onChange={handleChange}
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Valid Till</label>
// //               <input
// //                 type="date"
// //                 name="validTill"
// //                 value={form.validTill}
// //                 onChange={handleChange}
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Image</label>
// //               <input type="file" name="file" onChange={handleChange} accept="image/*" />
// //             </div>
// //           </div>

// //           <div className="form-group full-width">
// //             <label>Description</label>
// //             <textarea
// //               name="description"
// //               value={form.description}
// //               onChange={handleChange}
// //               placeholder="Write product details..."
// //             />
// //           </div>

// //           <div className="form-actions">
// //             <button type="submit" className="btn primary" disabled={loading}>
// //               {loading ? "Saving..." : editId ? "Update Price" : "Add Price"}
// //             </button>
// //             {editId && (
// //               <button type="button" className="btn cancel" onClick={handleCancel}>
// //                 Cancel
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       </div>

// //       {/* CSV Section */}
// //       <div className="csv-controls">
// //         <div>
// //           <input
// //             type="file"
// //             accept=".csv,text/csv"
// //             ref={csvInputRef}
// //             onChange={handleCsvSelect}
// //           />
// //           <button className="btn small" onClick={handleImportCsv}>
// //             📥 Import CSV
// //           </button>
// //         </div>
// //         <div>
// //           <button className="btn primary" onClick={handleExportCsv}>
// //             📤 Export CSV
// //           </button>
// //         </div>
// //       </div>

// //       {/* Table + Mobile Card */}
// //       <div className="table-card">
// //         <div className="table-header">
// //           <h2>📋 Price List</h2>
// //           <span>Total: {items.length}</span>
// //         </div>

// //         {loading ? (
// //           <div className="loader">Loading...</div>
// //         ) : items.length === 0 ? (
// //           <p className="empty">No data found</p>
// //         ) : !isMobile ? (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Image</th>
// //                 <th>Name</th>
// //                 <th>Category</th>
// //                 <th>Base Price</th>
// //                 <th>Diff</th>
// //                 <th>Final</th>
// //                 <th>Valid Till</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {items.map((item) => (
// //                 <tr key={item._id}>
// //                   <td>
// //                     {item.image ? (
// //                       <img src={item.image} alt={item.name} />
// //                     ) : (
// //                       <span className="no-img">No Img</span>
// //                     )}
// //                   </td>
// //                   <td>{item.name}</td>
// //                   <td>{item.category?.name || "N/A"}</td>
// //                   <td>₹{item.basePrice}</td>
// //                   <td>{item.difference || 0}</td>
// //                   <td>₹{item.basePrice + (item.difference || 0)}</td>
// //                   <td>
// //                     {item.validTill
// //                       ? new Date(item.validTill).toLocaleDateString("en-IN")
// //                       : "-"}
// //                   </td>
// //                   <td className="actions">
// //                     <button className="btn edit" onClick={() => handleEdit(item)}>
// //                       Edit
// //                     </button>
// //                     <button
// //                       className="btn delete"
// //                       onClick={() => handleDelete(item._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <div className="mobile-list">
// //             {items.map((item) => (
// //               <div className="mobile-card" key={item._id}>
// //                 {item.image ? (
// //                   <img src={item.image} alt={item.name} />
// //                 ) : (
// //                   <div className="no-img">No Image</div>
// //                 )}
// //                 <h3>{item.name}</h3>
// //                 <p><strong>Category:</strong> {item.category?.name || "N/A"}</p>
// //                 <p><strong>Base Price:</strong> ₹{item.basePrice}</p>
// //                 <p><strong>Difference:</strong> ₹{item.difference || 0}</p>
// //                 <p><strong>Final:</strong> ₹{item.basePrice + (item.difference || 0)}</p>
// //                 <p>
// //                   <strong>Valid Till:</strong>{" "}
// //                   {item.validTill
// //                     ? new Date(item.validTill).toLocaleDateString("en-IN")
// //                     : "-"}
// //                 </p>
// //                 <div className="actions">
// //                   <button className="btn edit" onClick={() => handleEdit(item)}>
// //                     Edit
// //                   </button>
// //                   <button className="btn delete" onClick={() => handleDelete(item._id)}>
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "./PriceList.css";

// const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// export default function PriceList() {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     description: "",
//     basePrice: "",
//     difference: "",
//     validTill: "",
//     file: null,
//   });
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [csvFile, setCsvFile] = useState(null);
//   const [addingCategory, setAddingCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkPrice, setBulkPrice] = useState("");
//   const [bulkMode, setBulkMode] = useState(false);
//   const csvInputRef = useRef();

//   useEffect(() => {
//     fetchItems();
//     fetchCategories();
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       if (res.data.success) setItems(res.data.data);
//     } catch (err) {
//       console.error("Error fetching items:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data.success) setCategories(res.data.categories);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setForm({ ...form, file: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (!form.name || !form.category || !form.basePrice) {
//         alert("Name, category, and base price are required");
//         setLoading(false);
//         return;
//       }

//       const fd = new FormData();
//       Object.keys(form).forEach((key) => {
//         if (form[key]) fd.append(key, form[key]);
//       });

//       if (editId) await axios.put(`${API_URL}/${editId}`, fd);
//       else await axios.post(API_URL, fd);

//       setForm({
//         name: "",
//         category: "",
//         description: "",
//         basePrice: "",
//         difference: "",
//         validTill: "",
//         file: null,
//       });
//       setEditId(null);
//       fetchItems();
//     } catch (err) {
//       console.error("Error saving price:", err);
//       alert("Failed to save price.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name,
//       category: item.category?._id || "",
//       description: item.description || "",
//       basePrice: item.basePrice,
//       difference: item.difference,
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//     });
//     setEditId(item._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     setLoading(true);
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchItems();
//     } catch (err) {
//       console.error("Error deleting item:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setForm({
//       name: "",
//       category: "",
//       description: "",
//       basePrice: "",
//       difference: "",
//       validTill: "",
//       file: null,
//     });
//     setEditId(null);
//   };

//   const handleAddCategory = async () => {
//     if (!newCategoryName.trim()) return alert("Enter category name");
//     try {
//       const res = await axios.post(CATEGORY_URL, { name: newCategoryName.trim() });
//       if (res.data.success) {
//         setNewCategoryName("");
//         setAddingCategory(false);
//         fetchCategories();
//         alert("Category added successfully!");
//       } else {
//         alert(res.data.message || "Failed to add category");
//       }
//     } catch (err) {
//       console.error("Add category error:", err);
//       alert("Add category failed");
//     }
//   };

//   const handleCsvSelect = (e) => setCsvFile(e.target.files[0]);

//   const handleImportCsv = async () => {
//     if (!csvFile) return alert("Choose a CSV file first");
//     const fd = new FormData();
//     fd.append("file", csvFile);
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API_URL}/import`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (res.data.success) {
//         alert(`Imported ${res.data.inserted || 0} items`);
//         fetchItems();
//         setCsvFile(null);
//         if (csvInputRef.current) csvInputRef.current.value = null;
//       } else alert("Import failed, check file format");
//     } catch (err) {
//       console.error("Import error:", err);
//       alert("Import failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportCsv = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
//       const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `prices_export_${Date.now()}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Export error:", err);
//       alert("Export failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🧩 BULK ACTIONS
//   const toggleSelectAll = () => {
//     if (selectedItems.length === items.length) setSelectedItems([]);
//     else setSelectedItems(items.map((i) => i._id));
//   };

//   const toggleSelectOne = (id) => {
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((i) => i !== id));
//     } else {
//       setSelectedItems([...selectedItems, id]);
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedItems.length === 0) return alert("No items selected!");
//     if (!window.confirm(`Delete ${selectedItems.length} selected items?`)) return;

//     try {
//       setLoading(true);
//       for (let id of selectedItems) {
//         await axios.delete(`${API_URL}/${id}`);
//       }
//       alert("Bulk delete successful!");
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk delete error:", err);
//       alert("Bulk delete failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBulkPriceUpdate = async () => {
//     if (selectedItems.length === 0) return alert("No items selected!");
//     if (!bulkPrice) return alert("Enter a new base price");

//     try {
//       setLoading(true);
//       for (let id of selectedItems) {
//         await axios.put(`${API_URL}/${id}`, { basePrice: Number(bulkPrice) });
//       }
//       alert("Base prices updated successfully!");
//       setSelectedItems([]);
//       setBulkPrice("");
//       setBulkMode(false);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk price update error:", err);
//       alert("Bulk update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="price-container">
//       <div className="header-section">
//         <h1>💰 Price Management</h1>
//         <p>Manage prices, import/export CSV, and bulk edit/delete.</p>
//       </div>

//       {/* ===== Bulk Actions ===== */}
//       {selectedItems.length > 0 && (
//         <div className="bulk-bar">
//           <span>{selectedItems.length} selected</span>
//           {!bulkMode ? (
//             <div className="bulk-actions">
//               <button className="btn delete" onClick={handleBulkDelete}>
//                 🗑️ Bulk Delete
//               </button>
//               <button
//                 className="btn primary"
//                 onClick={() => setBulkMode(true)}
//               >
//                 ✏️ Bulk Edit Price
//               </button>
//             </div>
//           ) : (
//             <div className="bulk-actions">
//               <input
//                 type="number"
//                 placeholder="Enter new base price"
//                 value={bulkPrice}
//                 onChange={(e) => setBulkPrice(e.target.value)}
//               />
//               <button className="btn primary" onClick={handleBulkPriceUpdate}>
//                 Update
//               </button>
//               <button className="btn cancel" onClick={() => setBulkMode(false)}>
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ====== Add/Edit Form ====== */}
//       {/* Same as your original form */}
//       {/* Keeping full structure */}
//       <div className="price-form-card">
//         <h2>{editId ? "✏️ Edit Price" : "➕ Add New Price"}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="form-group">
//               <label>Product Name *</label>
//               <input name="name" value={form.name} onChange={handleChange} placeholder="Enter name" required />
//             </div>

//             <div className="form-group">
//               <label>Category *</label>
//               <div className="category-row">
//                 <select name="category" value={form.category} onChange={handleChange} required>
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   className="btn small"
//                   onClick={() => setAddingCategory(!addingCategory)}
//                 >
//                   {addingCategory ? "Close" : "Add"}
//                 </button>
//               </div>
//             </div>

//             {addingCategory && (
//               <div className="form-group full-width">
//                 <label>New Category</label>
//                 <div className="category-row">
//                   <input
//                     value={newCategoryName}
//                     onChange={(e) => setNewCategoryName(e.target.value)}
//                     placeholder="Enter new category"
//                   />
//                   <button
//                     type="button"
//                     className="btn primary"
//                     onClick={handleAddCategory}
//                   >
//                     Create
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="form-group">
//               <label>Base Price (₹) *</label>
//               <input
//                 type="number"
//                 name="basePrice"
//                 value={form.basePrice}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Difference (₹)</label>
//               <input
//                 type="number"
//                 name="difference"
//                 value={form.difference}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>Valid Till</label>
//               <input
//                 type="date"
//                 name="validTill"
//                 value={form.validTill}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>Image</label>
//               <input type="file" name="file" onChange={handleChange} accept="image/*" />
//             </div>
//           </div>

//           <div className="form-group full-width">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Write product details..."
//             />
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="btn primary" disabled={loading}>
//               {loading ? "Saving..." : editId ? "Update Price" : "Add Price"}
//             </button>
//             {editId && (
//               <button type="button" className="btn cancel" onClick={handleCancel}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* ===== CSV Section ===== */}
//       <div className="csv-controls">
//         <div>
//           <input
//             type="file"
//             accept=".csv,text/csv"
//             ref={csvInputRef}
//             onChange={handleCsvSelect}
//           />
//           <button className="btn small" onClick={handleImportCsv}>
//             📥 Import CSV
//           </button>
//         </div>
//         <div>
//           <button className="btn primary" onClick={handleExportCsv}>
//             📤 Export CSV
//           </button>
//         </div>
//       </div>

//       {/* ===== Table / Mobile Card ===== */}
//       <div className="table-card">
//         <div className="table-header">
//           <h2>📋 Price List</h2>
//           <span>Total: {items.length}</span>
//         </div>

//         {!isMobile ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.length === items.length}
//                     onChange={toggleSelectAll}
//                   />
//                 </th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Base Price</th>
//                 <th>Diff</th>
//                 <th>Final</th>
//                 <th>Valid Till</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(item._id)}
//                       onChange={() => toggleSelectOne(item._id)}
//                     />
//                   </td>
//                   <td>
//                     {item.image ? (
//                       <img src={item.image} alt={item.name} />
//                     ) : (
//                       <span className="no-img">No Img</span>
//                     )}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.category?.name || "N/A"}</td>
//                   <td>₹{item.basePrice}</td>
//                   <td>{item.difference || 0}</td>
//                   <td>₹{item.basePrice + (item.difference || 0)}</td>
//                   <td>
//                     {item.validTill
//                       ? new Date(item.validTill).toLocaleDateString("en-IN")
//                       : "-"}
//                   </td>
//                   <td className="actions">
//                     <button className="btn edit" onClick={() => handleEdit(item)}>
//                       Edit
//                     </button>
//                     <button className="btn delete" onClick={() => handleDelete(item._id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="mobile-list">
//             {items.map((item) => (
//               <div className="mobile-card" key={item._id}>
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(item._id)}
//                   onChange={() => toggleSelectOne(item._id)}
//                 />
//                 {item.image ? (
//                   <img src={item.image} alt={item.name} />
//                 ) : (
//                   <div className="no-img">No Image</div>
//                 )}
//                 <h3>{item.name}</h3>
//                 <p><strong>Category:</strong> {item.category?.name || "N/A"}</p>
//                 <p><strong>Base Price:</strong> ₹{item.basePrice}</p>
//                 <p><strong>Final:</strong> ₹{item.basePrice + (item.difference || 0)}</p>
//                 <div className="actions">
//                   <button className="btn edit" onClick={() => handleEdit(item)}>Edit</button>
//                   <button className="btn delete" onClick={() => handleDelete(item._id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./PriceList.css";

const API_URL = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

export default function PriceList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [search, setSearch] = useState(""); // 🔍 SEARCH STATE

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
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  // ADD CATEGORY IMAGE SUPPORT
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [newCategoryPreview, setNewCategoryPreview] = useState(null);

  // BULK
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  const csvInputRef = useRef();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Items & Categories
  useEffect(() => {
    fetchItems();
    fetchCategories();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) setItems(res.data.data || []);
    } catch (err) {
      console.error("Fetch items error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      if (res.data.success) setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  // Input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // Submit / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.name || !form.category || !form.basePrice) {
        alert("Name, category & base price required");
        return;
      }

      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== undefined && form[key] !== null && form[key] !== "")
          fd.append(key, form[key]);
      });

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, fd);
      } else {
        await axios.post(API_URL, fd);
      }

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
      setCurrentPage(1);
      fetchItems();
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      category: item.category?._id || "",
      description: item.description || "",
      basePrice: item.basePrice,
      difference: item.difference,
      validTill: item.validTill ? item.validTill.split("T")[0] : "",
      file: null,
    });

    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch {}
  };

  // ADD NEW CATEGORY (with Image)
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return alert("Category name required");
    try {
      const fd = new FormData();
      fd.append("name", newCategoryName);
      if (newCategoryImage) fd.append("image", newCategoryImage);

      const res = await axios.post(CATEGORY_URL, fd);
      if (res.data.success) {
        setNewCategoryName("");
        setNewCategoryImage(null);
        setNewCategoryPreview(null);
        setAddingCategory(false);
        fetchCategories();
        alert("Category Added!");
      }
    } catch (err) {
      console.error("Category error:", err);
    }
  };

  // CSV Import
  const handleCsvSelect = (e) => setCsvFile(e.target.files[0]);

  const handleImportCsv = async () => {
    if (!csvFile) return alert("Choose CSV file");
    const fd = new FormData();
    fd.append("file", csvFile);

    try {
      const res = await axios.post(`${API_URL}/import`, fd);
      if (res.data.success) fetchItems();
      alert("Imported!");
    } catch (err) {
      console.error(err);
    }
  };

  // Export CSV
  const handleExportCsv = async () => {
    try {
      const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "prices.csv";
      a.click();
    } catch (err) {
      console.log("Export error:", err);
    }
  };

  // Select All
  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) setSelectedItems([]);
    else setSelectedItems(items.map((i) => i._id));
  };

  // Select One
  const toggleSelectOne = (id) => {
    selectedItems.includes(id)
      ? setSelectedItems(selectedItems.filter((x) => x !== id))
      : setSelectedItems([...selectedItems, id]);
  };

  // Status Toggle
  const handleStatusToggle = async (item) => {
    const newStatus = item.status === "active" ? "inactive" : "active";
    await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });

    setItems((prev) =>
      prev.map((it) => (it._id === item._id ? { ...it, status: newStatus } : it))
    );
  };

  // BULK DELETE
  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected?")) return;

    await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
    setSelectedItems([]);
    fetchItems();
  };

  // BULK UPDATE
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

  // 🔍 FILTER LOGIC (Name + Category)
  const filteredItems = items.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) ||
      item.category?.name?.toLowerCase().includes(text)
    );
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const updateLocalItemField = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it._id === id ? { ...it, [field]: value } : it)));
  };

  return (
    <div className="price-container">
      <div className="header-section">
        <h1>💰 Product Management</h1>
        <p>Manage prices, categories, CSV, bulk actions & search.</p>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BULK BAR */}
      {selectedItems.length > 0 && (
        <div className="bulk-bar">
          <span>{selectedItems.length} selected</span>

          {!bulkMode ? (
            <div className="bulk-actions">
              <button className="btn delete" onClick={handleBulkDelete}>
                🗑 Bulk Delete
              </button>
              <button className="btn primary" onClick={() => setBulkMode(true)}>
                ✏ Bulk Edit
              </button>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <strong>Bulk Edit Selected Items</strong>
              {items
                .filter((i) => selectedItems.includes(i._id))
                .map((item) => (
                  <div key={item._id} className="bulk-edit-item-box">
                    <h4>{item.name}</h4>

                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateLocalItemField(item._id, "name", e.target.value)}
                    />

                    <input
                      type="number"
                      value={item.basePrice}
                      onChange={(e) =>
                        updateLocalItemField(item._id, "basePrice", Number(e.target.value))
                      }
                    />

                    <input
                      type="number"
                      value={item.difference || 0}
                      onChange={(e) =>
                        updateLocalItemField(item._id, "difference", Number(e.target.value))
                      }
                    />

                    <input
                      type="date"
                      value={item.validTill ? item.validTill.split("T")[0] : ""}
                      onChange={(e) =>
                        updateLocalItemField(item._id, "validTill", e.target.value)
                      }
                    />
                  </div>
                ))}

              <button className="btn primary" onClick={handleBulkSave}>
                Save
              </button>
              <button className="btn cancel" onClick={() => setBulkMode(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRICE FORM */}
      <div className="price-form-card">
        <h2>{editId ? "✏ Edit Price" : "➕ Add Price"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <div className="category-row">
                <select
                  required
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn small"
                  onClick={() => setAddingCategory(!addingCategory)}
                >
                  {addingCategory ? "Close" : "Add"}
                </button>
              </div>
            </div>

            {addingCategory && (
              <div className="form-group full-width addCategoryBox">
                <label>New Category</label>
                <div className="category-row">
                  <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setNewCategoryImage(e.target.files[0]);
                      setNewCategoryPreview(
                        e.target.files[0]
                          ? URL.createObjectURL(e.target.files[0])
                          : null
                      );
                    }}
                  />

                  <button
                    type="button"
                    className="btn primary"
                    onClick={handleAddCategory}
                  >
                    Create
                  </button>
                </div>

                {newCategoryPreview && (
                  <img
                    src={newCategoryPreview}
                    className="categoryPreview"
                    alt="preview"
                  />
                )}
              </div>
            )}

            <div className="form-group">
              <label>Base Price *</label>
              <input
                required
                type="number"
                name="basePrice"
                value={form.basePrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Difference</label>
              <input
                type="number"
                name="difference"
                value={form.difference}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Valid Till</label>
              <input
                type="date"
                name="validTill"
                value={form.validTill}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button className="btn primary" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn cancel"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CSV IMPORT / EXPORT */}
      <div className="csv-controls">
        <div>
          <input type="file" accept=".csv" ref={csvInputRef} onChange={handleCsvSelect} />
          <button className="btn small" onClick={handleImportCsv}>
            Import CSV
          </button>
        </div>

        <button className="btn primary" onClick={handleExportCsv}>
          Export CSV
        </button>
      </div>

      {/* MAIN TABLE */}
      <div className="table-card">
        <div className="table-header">
          <h2>📋 Items</h2>
          <span>Total: {filteredItems.length}</span>
        </div>

        {!isMobile ? (
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === filteredItems.length &&
                      filteredItems.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Sr. No</th>
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
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => toggleSelectOne(item._id)}
                    />
                  </td>

                  <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>

                  <td>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span className="no-img">No Img</span>
                    )}
                  </td>

                  <td>{item.name}</td>

                  <td>{item.category?.name}</td>

                  <td>₹{item.basePrice}</td>

                  <td>{item.difference || 0}</td>

                  <td>₹{Number(item.basePrice) + Number(item.difference || 0)}</td>

                  <td>
                    <button
                      className={
                        item.status === "active" ? "status-active" : "status-inactive"
                      }
                      onClick={() => handleStatusToggle(item)}
                    >
                      {item.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                    </button>
                  </td>

                  <td>
                    {item.validTill
                      ? new Date(item.validTill).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="actions">
                    <button className="btn edit" onClick={() => handleEdit(item)}>
                      Edit
                    </button>

                    <button
                      className="btn delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mobile-list">
            {currentItems.map((item) => (
              <div className="mobile-card" key={item._id}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => toggleSelectOne(item._id)}
                />

                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div>No Image</div>
                )}

                <h3>{item.name}</h3>

                <p><b>Category:</b> {item.category?.name}</p>

                <p><b>Base:</b> ₹{item.basePrice}</p>

                <p><b>Final:</b> ₹{Number(item.basePrice) + Number(item.difference || 0)}</p>

                <button
                  className={
                    item.status === "active" ? "status-active" : "status-inactive"
                  }
                  onClick={() => handleStatusToggle(item)}
                >
                  {item.status === "active" ? "Active" : "Inactive"}
                </button>

                <div className="actions">
                  <button className="btn edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
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
    </div>
  );
}
