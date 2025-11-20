

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "./PriceList.css";

// const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// export default function PriceList() {
//   // DATA
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   // UI state
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   // FORM state
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     basePrice: "",
//     difference: "",
//     validTill: "",
//     file: null,
//   });

//   const [editId, setEditId] = useState(null);
//   const [isCopyMode, setIsCopyMode] = useState(false);

//   // category/subcategory add UI
//   const [addingCategory, setAddingCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryImage, setNewCategoryImage] = useState(null);
//   const [newCategoryPreview, setNewCategoryPreview] = useState(null);

//   const [addingSub, setAddingSub] = useState(false);
//   const [newSubName, setNewSubName] = useState("");
//   const [newSubImage, setNewSubImage] = useState(null);
//   const [newSubPreview, setNewSubPreview] = useState(null);

//   // bulk
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   // csv import
//   const [csvFile, setCsvFile] = useState(null);
//   const csvInputRef = useRef();

//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 30;

//   // -------------------- FETCH --------------------
//   useEffect(() => {
//     fetchItems();
//     fetchCategories();

//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//     // eslint-disable-next-line
//   }, []);

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       if (res.data && res.data.success) setItems(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch items error", err);
//       alert("Could not fetch items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data && res.data.success) setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Fetch categories error", err);
//       alert("Could not fetch categories");
//     }
//   };

//   // -------------------- SUBCATEGORY AUTO LOAD --------------------
//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }

//     const cat = categories.find((c) => c._id === form.category);
//     const subs = (cat && cat.subcategories) || [];
//     setSubcategories(subs);

//     // keep current subcategory if exists in new subs, otherwise reset
//     const exists = subs.some((s) => s._id === form.subcategory);
//     if (!exists) setForm((prev) => ({ ...prev, subcategory: "" }));
//   }, [form.category, categories]);

//   // -------------------- CREATE CATEGORY --------------------
//   const handleCreateCategory = async () => {
//     if (!newCategoryName.trim()) return alert("Enter category name");
//     try {
//       const fd = new FormData();
//       fd.append("name", newCategoryName.trim());
//       if (newCategoryImage) fd.append("image", newCategoryImage);

//       const res = await axios.post(CATEGORY_URL, fd);
//       if (res.data && res.data.success) {
//         alert("Category created");
//         setNewCategoryName("");
//         setNewCategoryImage(null);
//         setNewCategoryPreview(null);
//         setAddingCategory(false);
//         fetchCategories();
//       } else {
//         alert("Category creation failed");
//       }
//     } catch (err) {
//       console.error("Create category error", err);
//       alert("Category creation failed");
//     }
//   };

//   // -------------------- CREATE SUBCATEGORY --------------------
//   const handleCreateSub = async () => {
//     if (!newSubName.trim()) return alert("Enter subcategory name");
//     if (!form.category) return alert("Select category first");

//     try {
//       const fd = new FormData();
//       fd.append("name", newSubName.trim());
//       if (newSubImage) fd.append("image", newSubImage);

//       const res = await axios.post(`${CATEGORY_URL}/${form.category}/sub`, fd);
//       if (res.data && res.data.success) {
//         alert("Subcategory created");
//         setNewSubName("");
//         setNewSubImage(null);
//         setNewSubPreview(null);
//         setAddingSub(false);
//         fetchCategories();
//       } else {
//         alert("Subcategory creation failed");
//       }
//     } catch (err) {
//       console.error("Create sub error", err);
//       alert("Subcategory creation failed");
//     }
//   };

//   // -------------------- FORM HANDLING --------------------
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files.length) {
//       // file input (both image for product and category/sub)
//       setForm((p) => ({ ...p, file: files[0] }));
//     } else {
//       setForm((p) => ({ ...p, [name]: value }));
//     }
//   };

//   // -------------------- SUBMIT (ADD / UPDATE / COPY) --------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!form.name || !form.category || !form.basePrice) {
//         alert("Name, category & base price are required");
//         setLoading(false);
//         return;
//       }

//       const fd = new FormData();
//       // append all keys (including 0 or empty string when necessary)
//       Object.keys(form).forEach((k) => {
//         const val = form[k];
//         if (val !== undefined && val !== null) {
//           fd.append(k, val);
//         }
//       });

//       let res;
//       if (isCopyMode) {
//         res = await axios.post(API_URL, fd);
//         alert("Copied as new item");
//       } else if (editId) {
//         res = await axios.put(`${API_URL}/${editId}`, fd);
//         alert("Updated");
//       } else {
//         res = await axios.post(API_URL, fd);
//         alert("Added");
//       }

//       // refresh
//       await fetchItems();
//       await fetchCategories();

//       // reset
//       setForm({
//         name: "",
//         category: "",
//         subcategory: "",
//         description: "",
//         basePrice: "",
//         difference: "",
//         validTill: "",
//         file: null,
//       });
//       setEditId(null);
//       setIsCopyMode(false);
//     } catch (err) {
//       console.error("Save error", err);
//       alert("Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------- EDIT --------------------
//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id?.toString() || "",
//       description: item.description || "",
//       basePrice: item.basePrice ?? "",
//       difference: item.difference ?? "",
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//     });

//     // preload subs for better UX
//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(item._id);
//     setIsCopyMode(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // -------------------- COPY --------------------
//   const handleCopyToEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id?.toString() || "",
//       description: item.description || "",
//       basePrice: item.basePrice ?? "",
//       difference: item.difference ?? "",
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//     });

//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(null);
//     setIsCopyMode(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // -------------------- DELETE --------------------
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete item?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setItems((prev) => prev.filter((x) => x._id !== id));
//       setSelectedItems((prev) => prev.filter((x) => x !== id));
//     } catch (err) {
//       console.error("Delete error", err);
//       alert("Delete failed");
//     }
//   };

//   // -------------------- STATUS TOGGLE --------------------
//   const handleStatusToggle = async (item) => {
//     try {
//       const newStatus = item.status === "active" ? "inactive" : "active";
//       await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
//       setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
//     } catch (err) {
//       console.error("Status toggle error", err);
//       alert("Status update failed");
//     }
//   };

//   // -------------------- BULK --------------------
//   const handleBulkDelete = async () => {
//     if (!selectedItems.length) return alert("No items selected");
//     if (!window.confirm("Delete selected items?")) return;

//     try {
//       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
//       setSelectedItems([]);
//       fetchItems();
//       setBulkMode(false);
//     } catch (err) {
//       console.error("Bulk delete error", err);
//       alert("Bulk delete failed");
//     }
//   };

//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
//   };

//   const handleBulkSave = async () => {
//     if (!selectedItems.length) return alert("No items selected for bulk save");

//     const updates = items
//       .filter((x) => selectedItems.includes(x._id))
//       .map((x) => ({
//         id: x._id,
//         name: x.name,
//         basePrice: x.basePrice,
//         difference: x.difference,
//         validTill: x.validTill,
//       }));

//     try {
//       await axios.post(`${API_URL}/bulk-update`, { products: updates });
//       setBulkMode(false);
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk save error", err);
//       alert("Bulk save failed");
//     }
//   };

//   // -------------------- CSV IMPORT/EXPORT --------------------
//   const handleCsvSelect = (e) => {
//     setCsvFile(e.target.files[0]);
//   };

//   const handleImportCsv = async () => {
//     if (!csvFile) return alert("Select CSV file");
//     try {
//       const fd = new FormData();
//       fd.append("file", csvFile);
//       const res = await axios.post(`${API_URL}/import`, fd);
//       if (res.data && res.data.success) {
//         alert(`Imported ${res.data.inserted || 0} items`);
//         setCsvFile(null);
//         if (csvInputRef.current) csvInputRef.current.value = null;
//         fetchItems();
//       } else {
//         alert("CSV import failed");
//       }
//     } catch (err) {
//       console.error("CSV import error", err);
//       alert("CSV import failed");
//     }
//   };

//   const handleExportCsv = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "prices.csv";
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("CSV export error", err);
//       alert("CSV export failed");
//     }
//   };

//   const handleExportSelectedCsv = () => {
//     if (!selectedItems.length) return alert("Select items to export");

//     const selectedData = items.filter((x) => selectedItems.includes(x._id));
//     const header = [
//       "id",
//       "name",
//       "categoryName",
//       "subcategoryName",
//       "basePrice",
//       "difference",
//       "finalPrice",
//       "status",
//       "validTill",
//       "description",
//       "imageUrl",
//     ];

//     const rows = selectedData.map((p) => [
//       p._id,
//       p.name || "",
//       p.category?.name || "",
//       p.subcategory?.name || "",
//       p.basePrice ?? "",
//       p.difference ?? "",
//       (Number(p.basePrice) + Number(p.difference || 0)) || "",
//       p.status || "",
//       p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
//       p.description || "",
//       p.image || "",
//     ]);

//     const csvArray = [header, ...rows];
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       csvArray.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.href = encodedUri;
//     link.download = `selected_prices_${Date.now()}.csv`;
//     link.click();
//   };

//   // -------------------- SEARCH & PAGINATION --------------------
//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     return (
//       (item.name || "").toString().toLowerCase().includes(t) ||
//       (item.category?.name || "").toLowerCase().includes(t) ||
//       (item.subcategory?.name || "").toLowerCase().includes(t)
//     );
//   });

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfLast - itemsPerPage, indexOfLast);
//   const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

//   // -------------------- RENDER --------------------
//   return (
//     <div className="price-container">
//       {/* HEADER */}
//       <div className="header-section">
//         <h1>💰 Product Management</h1>
//         <p>Manage prices, categories, images, CSV & bulk actions.</p>
//       </div>

//       {/* SEARCH */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search product, category or subcategory..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* BULK BAR */}
//       {selectedItems.length > 0 && (
//         <div className="bulk-bar">
//           <span>{selectedItems.length} selected</span>

//           {!bulkMode ? (
//             <div className="bulk-actions" style={{ display: "flex", gap: 10 }}>
//               <button className="btn delete" onClick={handleBulkDelete}>
//                 🗑 Bulk Delete
//               </button>

//               <button className="btn primary" onClick={() => setBulkMode(true)}>
//                 ✏ Bulk Edit
//               </button>


//               <button className="btn small" onClick={handleExportSelectedCsv}>
//                 ⤓ Export Selected
//               </button>
//             </div>
//           ) : (
//             <div className="bulk-panel">
//               <h3>✏ Bulk Edit Selected Items</h3>

//               {items
//                 .filter((item) => selectedItems.includes(item._id))
//                 .map((item) => (
//                   <div key={item._id} className="bulk-edit-item-box">
//                     <h4>{item.name}</h4>

//                     <div className="form-grid">
//                       <div className="form-group">
//                         <label>Name</label>
//                         <input
//                           type="text"
//                           value={item.name}
//                           onChange={(e) => updateLocalItemField(item._id, "name", e.target.value)}
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label>Base Price</label>
//                         <input
//                           type="number"
//                           value={item.basePrice}
//                           onChange={(e) =>
//                             updateLocalItemField(item._id, "basePrice", Number(e.target.value))
//                           }
//                         />
//                       </div>
//                           <div className="form-group">
//   <label>Category</label>
//   <select
//     value={item.category?._id || ""}
//     onChange={(e) => {
//       const newCat = e.target.value;

//       updateLocalItemField(item._id, "category", { _id: newCat });

//       const catObj = categories.find((c) => c._id === newCat);
//       const firstSub = catObj?.subcategories?.[0]?._id || "";

//       updateLocalItemField(item._id, "subcategory", { _id: firstSub });
//     }}
//   >
//     <option value="">Select Category</option>
//     {categories.map((c) => (
//       <option key={c._id} value={c._id}>
//         {c.name}
//       </option>
//     ))}
//   </select>
// </div>

// <div className="form-group">
//   <label>Subcategory</label>
//   <select
//     value={item.subcategory?._id || ""}
//     onChange={(e) =>
//       updateLocalItemField(item._id, "subcategory", { _id: e.target.value })
//     }
//   >
//     <option value="">Select Subcategory</option>

//     {categories
//       .find((c) => c._id === item.category?._id)
//       ?.subcategories?.map((s) => (
//         <option key={s._id} value={s._id}>
//           {s.name}
//         </option>
//       ))}
//   </select>
// </div>
//                       <div className="form-group">
//                         <label>Difference</label>
//                         <input
//                           type="number"
//                           value={item.difference || 0}
//                           onChange={(e) =>
//                             updateLocalItemField(item._id, "difference", Number(e.target.value))
//                           }
//                         />
//                       </div>

//                       {/* <div className="form-group">
//                         <label>Valid Till</label>
//                         <input
//                           type="date"
//                           value={item.validTill ? item.validTill.split("T")[0] : ""}
//                           onChange={(e) => updateLocalItemField(item._id, "validTill", e.target.value)}
//                         />
//                       </div> */}
//                     </div>
//                   </div>
//                 ))}

//               <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
//                 <button className="btn primary" onClick={handleBulkSave}>
//                   ✔ Save All
//                 </button>
//                 <button className="btn cancel" onClick={() => setBulkMode(false)}>
//                   ✖ Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* FORM */}
//       <div className="price-form-card">
//         <h2>{isCopyMode ? "📄 Save Duplicate Product" : editId ? "✏ Update Product" : "➕ Add Product"}</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             {/* NAME */}
//             <div className="form-group">
//               <label>Product Name *</label>
//               <input required name="name" value={form.name} onChange={handleChange} />
//             </div>

//             {/* CATEGORY */}
//             <div className="form-group">
//               <label>Category *</label>
//               <div className="category-row">
//                 <select
//                   required
//                   name="category"
//                   value={form.category}
//                   onChange={(e) => {
//                     handleChange(e);
//                     // reset subcategory on category change (useEffect will set subs)
//                     setForm((p) => ({ ...p, subcategory: "" }));
//                   }}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option value={c._id} key={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>

//                 <button type="button" className="btn small" onClick={() => setAddingCategory((v) => !v)}>
//                   {addingCategory ? "Close" : "Add"}
//                 </button>
//               </div>
//             </div>

//             {/* ADD CATEGORY UI */}
//             {addingCategory && (
//               <div className="form-group full-width addCategoryBox">
//                 <label>Add New Category</label>
//                 <div className="category-row">
//                   <input
//                     value={newCategoryName}
//                     onChange={(e) => setNewCategoryName(e.target.value)}
//                     placeholder="Category name"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       setNewCategoryImage(e.target.files[0]);
//                       setNewCategoryPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
//                     }}
//                   />
//                   <button className="btn primary" type="button" onClick={handleCreateCategory}>
//                     Create
//                   </button>
//                 </div>
//                 {newCategoryPreview && <img src={newCategoryPreview} className="categoryPreview" alt="preview" />}
//               </div>
//             )}

//             {/* SUBCATEGORY */}
//             <div className="form-group">
//               <label>Subcategory</label>
//               <div className="category-row">
//                 <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length}>
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option value={s._id} key={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>

//                 {form.category && (
//                   <button type="button" className="btn small" onClick={() => setAddingSub((v) => !v)}>
//                     {addingSub ? "Close" : "Add"}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* ADD SUBCATEGORY UI */}
//             {addingSub && (
//               <div className="form-group full-width addCategoryBox">
//                 <label>Add New Subcategory</label>
//                 <div className="category-row">
//                   <input value={newSubName} onChange={(e) => setNewSubName(e.target.value)} placeholder="Subcategory name" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       setNewSubImage(e.target.files[0]);
//                       setNewSubPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
//                     }}
//                   />
//                   <button className="btn primary" type="button" onClick={handleCreateSub}>
//                     Create
//                   </button>
//                 </div>
//                 {newSubPreview && <img src={newSubPreview} className="categoryPreview" alt="preview" />}
//               </div>
//             )}

//             {/* BASE PRICE */}
//             <div className="form-group">
//               <label>Base Price *</label>
//               <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} />
//             </div>

//             {/* DIFFERENCE */}
//             <div className="form-group">
//               <label>Difference</label>
//               <input type="number" name="difference" value={form.difference} onChange={handleChange} />
//             </div>

//             {/* VALID TILL */}
//             <div className="form-group">
//               <label>Valid Till</label>
//               <input type="date" name="validTill" value={form.validTill} onChange={handleChange} />
//             </div>

//             {/* IMAGE */}
//             <div className="form-group">
//               <label>Image</label>
//               <input type="file" accept="image/*" onChange={handleChange} />
//             </div>
//           </div>

//           {/* DESCRIPTION */}
//           <div className="form-group full-width">
//             <label>Description</label>
//             <textarea name="description" value={form.description} onChange={handleChange}></textarea>
//           </div>

//           {/* ACTIONS */}
//           <div className="form-actions">
//             <button className="btn primary" disabled={loading}>
//               {loading ? "Saving..." : isCopyMode ? "Save Copy" : editId ? "Update" : "Add"}
//             </button>

//             {(editId || isCopyMode) && (
//               <button
//                 type="button"
//                 className="btn cancel"
//                 onClick={() => {
//                   setEditId(null);
//                   setIsCopyMode(false);
//                   setForm({
//                     name: "",
//                     category: "",
//                     subcategory: "",
//                     description: "",
//                     basePrice: "",
//                     difference: "",
//                     validTill: "",
//                     file: null,
//                   });
//                 }}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* CSV CONTROLS */}
//       <div className="csv-controls">
//         <div>
//           <input type="file" accept=".csv" ref={csvInputRef} onChange={handleCsvSelect} />
//           <button className="btn small" onClick={handleImportCsv}>
//             Import CSV
//           </button>
//         </div>

//         <div style={{ display: "flex", gap: 8 }}>
//           <button className="btn primary" onClick={handleExportCsv}>
//             Export All CSV
//           </button>

//           <button className="btn" onClick={handleExportSelectedCsv}>
//             Export Selected CSV
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="table-card">
//         <div className="table-header">
//           <h2>📋 Items</h2>
//           <span>Total: {filteredItems.length}</span>
//         </div>

//         {!isMobile ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                     onChange={() => {
//                       if (selectedItems.length === filteredItems.length) setSelectedItems([]);
//                       else setSelectedItems(filteredItems.map((x) => x._id));
//                     }}
//                   />
//                 </th>
//                 <th>Sr</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Subcategory</th>
//                 <th>Base</th>
//                 <th>Diff</th>
//                 <th>Final</th>
//                 <th>Status</th>
//                 <th>Valid Till</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentItems.map((item, i) => (
//                 <tr key={item._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(item._id)}
//                       onChange={() =>
//                         setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
//                       }
//                     />
//                   </td>

//                   <td>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

//                   <td>{item.image ? <img src={item.image} alt="" /> : "No Img"}</td>

//                   <td>{item.name}</td>
//                   <td>{item.category?.name || "-"}</td>
//                   <td>{item.subcategory?.name || "-"}</td>

//                   <td>₹{item.basePrice}</td>
//                   <td>{item.difference || 0}</td>
//                   <td>₹{Number(item.basePrice) + Number(item.difference || 0)}</td>

//                   <td>
//                     <button
//                       className={item.status === "active" ? "status-active" : "status-inactive"}
//                       onClick={() => handleStatusToggle(item)}
//                     >
//                       {item.status === "active" ? " Active" : " Inactive"}
//                     </button>
//                   </td>

//                   <td>{item.validTill ? new Date(item.validTill).toLocaleDateString() : "-"}</td>

//                   <td className="actions">
//                     <button className="btn edit" onClick={() => handleEdit(item)}>
//                       Edit
//                     </button>

//                     <button className="btn delete" onClick={() => handleDelete(item._id)}>
//                       Delete
//                     </button>

//                     <button className="btn small" style={{ background: "#6f42c1", color: "white" }} onClick={() => handleCopyToEdit(item)}>
//                       Copy
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="mobile-list">
//             {currentItems.map((item) => (
//               <div key={item._id} className="mobile-card">
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(item._id)}
//                   onChange={() =>
//                     setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
//                   }
//                 />

//                 {item.image ? <img src={item.image} alt="" /> : <div>No Image</div>}

//                 <h3>{item.name}</h3>

//                 <p>
//                   <b>Category:</b> {item.category?.name || "-"}
//                 </p>

//                 <p>
//                   <b>Subcategory:</b> {item.subcategory?.name || "-"}
//                 </p>

//                 <p>
//                   <b>Base:</b> ₹{item.basePrice}
//                 </p>

//                 <p>
//                   <b>Final:</b> ₹{Number(item.basePrice) + Number(item.difference || 0)}
//                 </p>

//                 <button className={item.status === "active" ? "status-active" : "status-inactive"} onClick={() => handleStatusToggle(item)}>
//                   {item.status === "active" ? "Active" : "Inactive"}
//                 </button>

//                 <div className="actions">
//                   <button className="btn edit" onClick={() => handleEdit(item)}>
//                     Edit
//                   </button>

//                   <button className="btn delete" onClick={() => handleDelete(item._id)}>
//                     Delete
//                   </button>

//                   <button className="btn small" style={{ background: "#6f42c1", color: "white" }} onClick={() => handleCopyToEdit(item)}>
//                     Copy
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* PAGINATION */}
//         <div className="pagination">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
//             Previous
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => (
//             <button key={i} className={i + 1 === currentPage ? "active-page" : ""} onClick={() => setCurrentPage(i + 1)}>
//               {i + 1}
//             </button>
//           ))}

//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./PriceList.css"
const API_URL = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

export default function PriceList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // FORM state
  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    basePrice: "",
    difference: "",
    validTill: "",
    file: null,
  });

  const [editId, setEditId] = useState(null);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [newCategoryPreview, setNewCategoryPreview] = useState(null);

  const [addingSub, setAddingSub] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [newSubImage, setNewSubImage] = useState(null);
  const [newSubPreview, setNewSubPreview] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  const [csvFile, setCsvFile] = useState(null);
  const csvInputRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // useEffect(() => {
  //   fetchItems();
  //   fetchCategories();

  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  // 1. Pehle categories load karo
useEffect(() => {
  fetchCategories();
}, []);

// 2. Categories load hone ke baad items load karo
useEffect(() => {
  if (categories.length > 0) {
    fetchItems();
  }
}, [categories]);

// 3. Resize listener
useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      // if (res.data && res.data.success) setItems(res.data.data || []);
      if (res.data && res.data.success) {
  const raw = res.data.data;

  // Agar categories abhi load nahi hui = raw items set
  if (!categories.length) {
    setItems(raw);
    return;
  }

  // Mapping to category + subcategory object
  const enriched = raw.map((item) => {
    const cat = categories.find(
      (c) =>
        c._id === item.category ||
        c._id === item.category?._id
    );

    const sub = cat?.subcategories?.find(
      (s) =>
        s._id === item.subcategory ||
        s._id === item.subcategory?._id
    );

    return {
      ...item,
      category: cat
        ? { _id: cat._id, name: cat.name }
        : item.category,

      subcategory: sub
        ? { _id: sub._id, name: sub.name }
        : item.subcategory,
    };
  });

  setItems(enriched);
}

    } catch (err) {
      console.error("Fetch items error", err);
      alert("Could not fetch items");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      if (res.data && res.data.success) setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch categories error", err);
      alert("Could not fetch categories");
    }
  };

  useEffect(() => {
    if (!form.category) {
      setSubcategories([]);
      setForm((prev) => ({ ...prev, subcategory: "" }));
      return;
    }

    const cat = categories.find((c) => c._id === form.category);
    const subs = (cat && cat.subcategories) || [];
    setSubcategories(subs);

    const exists = subs.some((s) => s._id === form.subcategory);
    if (!exists) setForm((prev) => ({ ...prev, subcategory: "" }));
  }, [form.category, categories]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return alert("Enter category name");
    try {
      const fd = new FormData();
      fd.append("name", newCategoryName.trim());
      if (newCategoryImage) fd.append("image", newCategoryImage);

      const res = await axios.post(CATEGORY_URL, fd);
      if (res.data && res.data.success) {
        alert("Category created");
        setNewCategoryName("");
        setNewCategoryImage(null);
        setNewCategoryPreview(null);
        setAddingCategory(false);
        fetchCategories();
      } else {
        alert("Category creation failed");
      }
    } catch (err) {
      console.error("Create category error", err);
      alert("Category creation failed");
    }
  };

  const handleCreateSub = async () => {
    if (!newSubName.trim()) return alert("Enter subcategory name");
    if (!form.category) return alert("Select category first");

    try {
      const fd = new FormData();
      fd.append("name", newSubName.trim());
      if (newSubImage) fd.append("image", newSubImage);

      const res = await axios.post(`${CATEGORY_URL}/${form.category}/sub`, fd);
      if (res.data && res.data.success) {
        alert("Subcategory created");
        setNewSubName("");
        setNewSubImage(null);
        setNewSubPreview(null);
        setAddingSub(false);
        fetchCategories();
      } else {
        alert("Subcategory creation failed");
      }
    } catch (err) {
      console.error("Create sub error", err);
      alert("Subcategory creation failed");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      setForm((p) => ({ ...p, file: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.name || !form.category || !form.basePrice) {
        alert("Name, category & base price are required");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      Object.keys(form).forEach((k) => {
        const val = form[k];
        if (val !== undefined && val !== null) {
          fd.append(k, val);
        }
      });

      let res;
      if (isCopyMode) {
        res = await axios.post(API_URL, fd);
        alert("Copied as new item");
      } else if (editId) {
        res = await axios.put(`${API_URL}/${editId}`, fd);
        alert("Updated");
      } else {
        res = await axios.post(API_URL, fd);
        alert("Added");
      }

      await fetchItems();
      await fetchCategories();

      setForm({
        name: "",
        category: "",
        subcategory: "",
        description: "",
        basePrice: "",
        difference: "",
        validTill: "",
        file: null,
      });
      setEditId(null);
      setIsCopyMode(false);
      setShowModal(false);
      setShowForm(false);
    } catch (err) {
      console.error("Save error", err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      category: item.category?._id?.toString() || "",
      subcategory: item.subcategory?._id?.toString() || "",
      description: item.description || "",
      basePrice: item.basePrice ?? "",
      difference: item.difference ?? "",
      validTill: item.validTill ? item.validTill.split("T")[0] : "",
      file: null,
    });

    const cat = categories.find((c) => c._id === item.category?._id);
    setSubcategories(cat?.subcategories || []);

    setEditId(item._id);
    setIsCopyMode(false);
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleCopyToEdit = (item) => {
    setForm({
      name: item.name || "",
      category: item.category?._id?.toString() || "",
      subcategory: item.subcategory?._id?.toString() || "",
      description: item.description || "",
      basePrice: item.basePrice ?? "",
      difference: item.difference ?? "",
      validTill: item.validTill ? item.validTill.split("T")[0] : "",
      file: null,
    });

    const cat = categories.find((c) => c._id === item.category?._id);
    setSubcategories(cat?.subcategories || []);

    setEditId(null);
    setIsCopyMode(true);
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems((prev) => prev.filter((x) => x._id !== id));
      setSelectedItems((prev) => prev.filter((x) => x !== id));
      setActiveMenu(null);
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  const handleStatusToggle = async (item) => {
    try {
      const newStatus = item.status === "active" ? "inactive" : "active";
      await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
      setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
    } catch (err) {
      console.error("Status toggle error", err);
      alert("Status update failed");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedItems.length) return alert("No items selected");
    if (!window.confirm("Delete selected items?")) return;

    try {
      await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
      setSelectedItems([]);
      fetchItems();
      setBulkMode(false);
    } catch (err) {
      console.error("Bulk delete error", err);
      alert("Bulk delete failed");
    }
  };

  const updateLocalItemField = (id, key, value) => {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
  };

  const handleBulkSave = async () => {
    if (!selectedItems.length) return alert("No items selected for bulk save");

    const updates = items
      .filter((x) => selectedItems.includes(x._id))
      .map((x) => ({
        id: x._id,
        name: x.name,
        basePrice: x.basePrice,
        difference: x.difference,
        validTill: x.validTill,
      }));

    try {
      await axios.post(`${API_URL}/bulk-update`, { products: updates });
      setBulkMode(false);
      setSelectedItems([]);
      fetchItems();
    } catch (err) {
      console.error("Bulk save error", err);
      alert("Bulk save failed");
    }
  };

  const handleCsvSelect = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleImportCsv = async () => {
    if (!csvFile) return alert("Select CSV file");
    try {
      const fd = new FormData();
      fd.append("file", csvFile);
      const res = await axios.post(`${API_URL}/import`, fd);
      if (res.data && res.data.success) {
        alert(`Imported ${res.data.inserted || 0} items`);
        setCsvFile(null);
        if (csvInputRef.current) csvInputRef.current.value = null;
        fetchItems();
      } else {
        alert("CSV import failed");
      }
    } catch (err) {
      console.error("CSV import error", err);
      alert("CSV import failed");
    }
  };

  // const handleExportCsv = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
  //     const url = window.URL.createObjectURL(new Blob([res.data]));
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "prices.csv";
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   } catch (err) {
  //     console.error("CSV export error", err);
  //     alert("CSV export failed");
  //   }
  // };
const handleExportCsv = () => {
  if (!items.length) return alert("No items to export");

  const header = [
    "id",
    "name",
    "categoryName",
    "subcategoryName",
    "basePrice",
    "difference",
    "finalPrice",
    "status",
    "validTill",
    "description",
    "imageUrl",
  ];

  const rows = items.map((p) => [
    p._id,
    p.name || "",
    p.category?.name || "",
    p.subcategory?.name || "",
    p.basePrice ?? "",
    p.difference ?? "",
    (Number(p.basePrice) + Number(p.difference || 0)) || "",
    p.status || "",
    p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
    p.description || "",
    p.image || "",
  ]);

  const csvArray = [header, ...rows];
  const csvContent =
    "data:text/csv;charset=utf-8," +
    csvArray
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.href = encodedUri;
  link.download = `all_prices_${Date.now()}.csv`;
  link.click();
};

  const handleExportSelectedCsv = () => {
    if (!selectedItems.length) return alert("Select items to export");

    const selectedData = items.filter((x) => selectedItems.includes(x._id));
    const header = [
      "id",
      "name",
      "categoryName",
      "subcategoryName",
      "basePrice",
      "difference",
      "finalPrice",
      "status",
      "validTill",
      "description",
      "imageUrl",
    ];

    const rows = selectedData.map((p) => [
      p._id,
      p.name || "",
      p.category?.name || "",
      p.subcategory?.name || "",
      p.basePrice ?? "",
      p.difference ?? "",
      (Number(p.basePrice) + Number(p.difference || 0)) || "",
      p.status || "",
      p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
      p.description || "",
      p.image || "",
    ]);

    const csvArray = [header, ...rows];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvArray.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `selected_prices_${Date.now()}.csv`;
    link.click();
  };

  const filteredItems = items.filter((item) => {
    const t = search.toLowerCase();
    return (
      (item.name || "").toString().toLowerCase().includes(t) ||
      (item.category?.name || "").toLowerCase().includes(t) ||
      (item.subcategory?.name || "").toLowerCase().includes(t)
    );
  });

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Product Management</h1>
        {/* <p style={styles.subtitle}>Manage prices, categories, images, CSV & bulk actions.</p> */}
      </div>

      {/* SEARCH */}
     <div className="mobile-topbar">
  <input
    type="text"
    placeholder="Search product, category or subcategory..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    style={styles.searchInput}
  />

  <button
    style={styles.addButton}
    onClick={() => {
      setShowForm(!showForm);
      setEditId(null);
      setIsCopyMode(false);
    }}
  >
    {showForm ? "✖" : "Add Product"}
  </button>
</div>


      {/* BULK BAR */}
      {selectedItems.length > 0 && (
        // <div style={styles.bulkBar}>
        <div className="bulk-bar">

          {/* <span style={styles.bulkText}>{selectedItems.length} selected</span> */}

          {!bulkMode ? (
            // <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div className="bulk-actions">

              <button style={styles.btnDelete} onClick={handleBulkDelete}>
                🗑 Bulk Delete
              </button>

              <button style={styles.btnPrimary} onClick={() => setBulkMode(true)}>
                ✏ Bulk Edit
              </button>

              {/* <button style={styles.btnSmall} onClick={handleExportSelectedCsv}>
                ⤓ Export Selected
              </button> */}
            </div>
          ) : (
            <div style={styles.bulkPanel}>
              <h3 style={styles.bulkPanelTitle}>✏ Bulk Edit Selected Items</h3>

              {items
                .filter((item) => selectedItems.includes(item._id))
                .map((item) => (
                  <div key={item._id} style={styles.bulkItemBox}>
                    <h4 style={styles.bulkItemTitle}>{item.name}</h4>

                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Name</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateLocalItemField(item._id, "name", e.target.value)}
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Base Price</label>
                        <input
                          type="number"
                          value={item.basePrice}
                          onChange={(e) =>
                            updateLocalItemField(item._id, "basePrice", Number(e.target.value))
                          }
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Category</label>
                        <select
                          value={item.category?._id || ""}
                          onChange={(e) => {
                            const newCat = e.target.value;
                            updateLocalItemField(item._id, "category", { _id: newCat });
                            const catObj = categories.find((c) => c._id === newCat);
                            const firstSub = catObj?.subcategories?.[0]?._id || "";
                            updateLocalItemField(item._id, "subcategory", { _id: firstSub });
                          }}
                          style={styles.select}
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Subcategory</label>
                        <select
                          value={item.subcategory?._id || ""}
                          onChange={(e) =>
                            updateLocalItemField(item._id, "subcategory", { _id: e.target.value })
                          }
                          style={styles.select}
                        >
                          <option value="">Select Subcategory</option>
                          {categories
                            .find((c) => c._id === item.category?._id)
                            ?.subcategories?.map((s) => (
                              <option key={s._id} value={s._id}>
                                {s.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Difference</label>
                        <input
                          type="number"
                          value={item.difference || 0}
                          onChange={(e) =>
                            updateLocalItemField(item._id, "difference", Number(e.target.value))
                          }
                          style={styles.input}
                        />
                      </div>
                    </div>
                  </div>
                ))}

              <div style={{ display: "flex", gap: 0, marginTop: 12 }}>
                <button style={styles.btnPrimary} onClick={handleBulkSave}>
                  ✔ Save All
                </button>
                <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
                  ✖ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>➕ Add 
            
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name *</label>
                <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Category *</label>
                <div style={styles.categoryRow}>
                  <select
                    required
                    name="category"
                    value={form.category}
                    onChange={(e) => {
                      handleChange(e);
                      setForm((p) => ({ ...p, subcategory: "" }));
                    }}
                    style={styles.select}
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <button type="button" style={styles.btnSmall} onClick={() => setAddingCategory((v) => !v)}>
                    {addingCategory ? "Close" : "Add"}
                  </button>
                </div>
              </div>

              {addingCategory && (
                <div style={styles.addCategoryBox}>
                  <label style={styles.label}>Add New Category</label>
                  <div style={styles.categoryRow}>
                    <input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name"
                      style={styles.input}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setNewCategoryImage(e.target.files[0]);
                        setNewCategoryPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                      }}
                      style={styles.fileInput}
                    />
                    <button style={styles.btnPrimary} type="button" onClick={handleCreateCategory}>
                      Create
                    </button>
                  </div>
                  {newCategoryPreview && <img src={newCategoryPreview} style={styles.preview} alt="preview" />}
                </div>
              )}

              <div style={styles.formGroup}>
                <label style={styles.label}>Subcategory</label>
                <div style={styles.categoryRow}>
                  <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length} style={styles.select}>
                    <option value="">Select Subcategory</option>
                    {subcategories.map((s) => (
                      <option value={s._id} key={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  {form.category && (
                    <button type="button" style={styles.btnSmall} onClick={() => setAddingSub((v) => !v)}>
                      {addingSub ? "Close" : "Add"}
                    </button>
                  )}
                </div>
              </div>

              {addingSub && (
                <div style={styles.addCategoryBox}>
                  <label style={styles.label}>Add New Subcategory</label>
                  <div style={styles.categoryRow}>
                    <input value={newSubName} onChange={(e) => setNewSubName(e.target.value)} placeholder="Subcategory name" style={styles.input} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setNewSubImage(e.target.files[0]);
                        setNewSubPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                      }}
                      style={styles.fileInput}
                    />
                    <button style={styles.btnPrimary} type="button" onClick={handleCreateSub}>
                      Create
                    </button>
                  </div>
                  {newSubPreview && <img src={newSubPreview} style={styles.preview} alt="preview" />}
                </div>
              )}

              <div style={styles.formGroup}>
                <label style={styles.label}>Base Price *</label>
                <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Difference</label>
                <input type="number" name="difference" value={form.difference} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Valid Till</label>
                <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Image</label>
                <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
            </div>

            <div style={styles.formActions}>
              <button style={styles.btnPrimary} disabled={loading}>
                {loading ? "Saving..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CSV CONTROLS */}
      {/* <div style={styles.csvControls}>
        <div>
          <input type="file" accept=".csv" ref={csvInputRef} onChange={handleCsvSelect} style={styles.fileInput} />
          <button style={styles.btnSmall} onClick={handleImportCsv}>
            Import CSV
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.btnPrimary} onClick={handleExportCsv}>
            Export All CSV
          </button>

          <button style={styles.btnSmall} onClick={handleExportSelectedCsv}>
            Export Selected CSV
          </button>
        </div>
      </div> */}
<div className="csv-topbar">
  <div className="csv-row">
    <input
      type="file"
      accept=".csv"
      ref={csvInputRef}
      onChange={handleCsvSelect}
      style={styles.fileInput}
    />

    <button style={styles.btnSmall} onClick={handleImportCsv}>
      Import
    </button>

    <button style={styles.btnPrimary} onClick={handleExportCsv}>
      Export All
    </button>

    <button style={styles.btnSmall} onClick={handleExportSelectedCsv}>
       Selected 
    </button>
  </div>
</div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}> Items</h2>
          <span style={styles.totalCount}>Total: {filteredItems.length}</span>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={() => {
                      if (selectedItems.length === filteredItems.length) setSelectedItems([]);
                      else setSelectedItems(filteredItems.map((x) => x._id));
                    }}
                  />
                </th>
                <th style={styles.th}>Sr</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Subcategory</th>
                <th style={styles.th}>Base</th>
                <th style={styles.th}>Diff</th>
                <th style={styles.th}>Final</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Valid Till</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, i) => (
                <tr key={item._id} style={styles.tr}>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() =>
                        setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
                      }
                    />
                  </td>

                  <td style={styles.td}>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

                  <td style={styles.td}>{item.image ? <img src={item.image} style={styles.tableImg} alt="" /> : "No Img"}</td>

                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.category?.name || "-"}</td>
                  <td style={styles.td}>{item.subcategory?.name || "-"}</td>

                  <td style={styles.td}>₹{item.basePrice}</td>
                  <td style={styles.td}>{item.difference || 0}</td>
                  <td style={styles.td}>₹{Number(item.basePrice) + Number(item.difference || 0)}</td>

                  

                  <td style={styles.td}>
                    <button
                      style={item.status === "active" ? styles.statusActive : styles.statusInactive}
                      onClick={() => handleStatusToggle(item)}
                    >
                      {item.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td style={styles.td}>{item.validTill ? new Date(item.validTill).toLocaleDateString() : "-"}</td>

                  <td style={styles.td}>
                    <div style={{ position: "relative" }}>
                      <button
                        style={styles.menuButton}
                        onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
                      >
                        ⋮
                      </button>

                      {activeMenu === item._id && (
                        <div style={styles.dropdown}>
                          <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
                            ✏ Edit
                          </button>
                          <button style={styles.dropdownItem} onClick={() => handleCopyToEdit(item)}>
                            📄 Copy
                          </button>
                          <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          <button style={styles.paginationBtn} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              style={i + 1 === currentPage ? styles.paginationBtnActive : styles.paginationBtn}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button style={styles.paginationBtn} disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* MODAL FOR EDIT/COPY */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{isCopyMode ? " Copy Product" : " Edit Product"}</h2>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category *</label>
                  <select
                    required
                    name="category"
                    value={form.category}
                    onChange={(e) => {
                      handleChange(e);
                      setForm((p) => ({ ...p, subcategory: "" }));
                    }}
                    style={styles.select}
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Subcategory</label>
                  <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length} style={styles.select}>
                    <option value="">Select Subcategory</option>
                    {subcategories.map((s) => (
                      <option value={s._id} key={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Base Price *</label>
                  <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Difference</label>
                  <input type="number" name="difference" value={form.difference} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Valid Till</label>
                  <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Image</label>
                  <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
              </div>

              <div style={styles.formActions}>
                <button style={styles.btnPrimary} disabled={loading}>
                  {loading ? "Saving..." : isCopyMode ? "Save Copy" : "Update"}
                </button>

                <button
                  type="button"
                  style={styles.btnCancel}
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setIsCopyMode(false);
                    setForm({
                      name: "",
                      category: "",
                      subcategory: "",
                      description: "",
                      basePrice: "",
                      difference: "",
                      validTill: "",
                      file: null,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {

  },
  header: {
  
  },
  title: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#0d3b66",
    marginBottom: "6px",
  },
  subtitle: {
   fontSize: "16px",
  },
  searchBar: {
    maxWidth: "320px",
    margin: "0 auto 25px auto",
  },
  searchInput: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "12px",
    border: "1px solid #ced4da",
    background: "#f9fbfc",
    fontSize: "15px",
    outline: "none",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
  },
  addButtonWrapper: {
    textAlign: "left",
    marginBottom: "25px",
  },
  addButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
  },
  bulkBar: {
    background: "#e9f2ff",
    border: "1px solid #c4d9ff",
    borderRadius: "14px",
    padding: "15px 18px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "14px",
    boxShadow: "0 3px 10px rgba(0, 80, 160, 0.1)",
  },
  bulkText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#0d3b66",
  },
  bulkPanel: {
    width: "100%",
    background: "#f7faff",
    border: "1px solid #cfe2ff",
    padding: "20px",
    borderRadius: "14px",
    marginTop: "10px",
    boxShadow: "0 4px 14px rgba(0, 60, 120, 0.08)",
  },
  bulkPanelTitle: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  bulkItemBox: {
    background: "#ffffff",
    border: "1px solid #dbe5f5",
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 50, 0.05)",
  },
  bulkItemTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#0d3b66",
    borderLeft: "4px solid #007bff",
    paddingLeft: "10px",
  },
  formCard: {
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "28px",
    background: "#ffffff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    border: "1px solid #eef2f7",
  },
  formTitle: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#0d3b66",
    marginBottom: "15px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#233142",
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #cfd6e0",
    background: "#f8fafc",
    transition: "0.2s ease",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #cfd6e0",
    background: "#f8fafc",
    transition: "0.2s ease",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #cfd6e0",
    background: "#f8fafc",
    transition: "0.2s ease",
    resize: "none",
    minHeight: "80px",
    fontSize: "14px",
  },
  fileInput: {
    padding: "8px",
    fontSize: "13px",
  },
  categoryRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  addCategoryBox: {
    gridColumn: "1 / -1",
    background: "#f1f7ff",
    border: "1px solid #cfe1ff",
    padding: "16px",
    borderRadius: "12px",
  },
  preview: {
    width: "110px",
    height: "110px",
    borderRadius: "12px",
    marginTop: "10px",
    objectFit: "cover",
    border: "1px solid #b7c9e2",
  },
  formActions: {
    marginTop: "15px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "9px 16px",

    cursor: "pointer",
    transition: "0.25s ease",
  },
  btnSmall: {
    background: "#43a047",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "9px 16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
  },
  btnDelete: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "9px 16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
  },
  btnCancel: {
    background: "#adb5bd",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "9px 16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
  },
  csvControls: {
    borderRadius: "12px",
    padding: "16px",
    background: "#f7faff",
    border: "1px solid #d8e6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  tableCard: {




  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  tableTitle: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#0d3b66",
  },
  totalCount: {
    fontSize: "15px",
    color: "#6c757d",
    fontWeight: "600",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    background: "#e9f2ff",
    padding: "12px",
    fontWeight: "700",
    color: "#0d3b66",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  tr: {
    borderBottom: "1px solid #edf2f7",
  },
  td: {
    padding: "12px 10px",
    whiteSpace: "nowrap",
  },
  tableImg: {
    width: "55px",
    height: "55px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #cfd9e5",
  },
  statusActive: {
    background: "#93d8ba",
    padding: "7px 12px",
    borderRadius: "8px",
    color: "black",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
  statusInactive: {
    background: "#d9b1b1",
    padding: "7px 12px",
    borderRadius: "8px",
    color: "black",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
  menuButton: {
    background: "#f0f0f0",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  dropdown: {
    position: "absolute",
    right: "0",
    top: "35px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: "100",
    minWidth: "140px",
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    background: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.2s ease",
    borderBottom: "1px solid #f0f0f0",
  },
  dropdownItemDelete: {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    background: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#e63946",
    transition: "0.2s ease",
  },
  pagination: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  paginationBtn: {
    padding: "9px 13px",
    borderRadius: "8px",
    background: "#fff",
    border: "1px solid #ddd",
    cursor: "pointer",
    fontSize: "14px",
  },
  paginationBtnActive: {
    padding: "9px 13px",
    borderRadius: "8px",
    background: "#007bff",
    color: "white",
    border: "1px solid #0062cc",
    cursor: "pointer",
    fontSize: "14px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
    padding: "20px",
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    maxWidth: "700px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  },
  modalTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0d3b66",
    marginBottom: "20px",
    textAlign: "center",
  },
  
  
}
