
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "./PriceList.css";

// const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// export default function PriceList() {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const [search, setSearch] = useState("");

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
//   const [loading, setLoading] = useState(false);
//   const [csvFile, setCsvFile] = useState(null);

//   // COPY MODE
//   const [isCopyMode, setIsCopyMode] = useState(false);

//   // CATEGORY ADD
//   const [addingCategory, setAddingCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryImage, setNewCategoryImage] = useState(null);
//   const [newCategoryPreview, setNewCategoryPreview] = useState(null);

//   // SUB CATEGORY ADD
//   const [addingSub, setAddingSub] = useState(false);
//   const [newSubName, setNewSubName] = useState("");
//   const [newSubImage, setNewSubImage] = useState(null);
//   const [newSubPreview, setNewSubPreview] = useState(null);

//   // BULK
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   const csvInputRef = useRef();

//   // PAGINATION
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 30;

//   // ----------------- FETCH ITEMS -----------------
//   useEffect(() => {
//     fetchItems();
//     fetchCategories();

//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       if (res.data.success) setItems(res.data.data || []);
//     } catch (err) {
//       console.log("Fetch error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data.success) {
//         setCategories(res.data.categories || []);
//       }
//     } catch (err) {
//       console.log("Cat fetch err", err);
//     }
//   };
//   // ----------------- WHEN CATEGORY SELECT → LOAD SUBCATEGORIES -----------------
//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }

//     const categoryObj = categories.find((c) => c._id === form.category);
//     if (categoryObj && categoryObj.subcategories) {
//       setSubcategories(categoryObj.subcategories);
//     } else {
//       setSubcategories([]);
//     }

//     setForm((prev) => ({ ...prev, subcategory: "" }));
//   }, [form.category, categories]);

//   // ----------------- CREATE CATEGORY -----------------
//   const handleCreateCategory = async () => {
//     if (!newCategoryName) return alert("Enter category name");

//     try {
//       const fd = new FormData();
//       fd.append("name", newCategoryName);
//       if (newCategoryImage) fd.append("image", newCategoryImage);

//       const res = await axios.post(CATEGORY_URL, fd);

//       if (res.data.success) {
//         alert("Category Created!");

//         setNewCategoryName("");
//         setNewCategoryImage(null);
//         setNewCategoryPreview(null);
//         setAddingCategory(false);

//         fetchCategories();
//       }
//     } catch (err) {
//       console.log("Category create error", err);
//       alert("Category create failed");
//     }
//   };

//   // ----------------- CREATE SUB CATEGORY -----------------
//   const handleCreateSub = async () => {
//     if (!newSubName) return alert("Enter subcategory name");
//     if (!form.category) return alert("Select category first");

//     try {
//       const fd = new FormData();
//       fd.append("name", newSubName);
//       if (newSubImage) fd.append("image", newSubImage);

//       const res = await axios.post(
//         `${CATEGORY_URL}/${form.category}/sub`,
//         fd
//       );

//       if (res.data.success) {
//         alert("Subcategory Created!");

//         setNewSubName("");
//         setNewSubImage(null);
//         setNewSubPreview(null);
//         setAddingSub(false);

//         fetchCategories();
//       }
//     } catch (err) {
//       console.log("Subcategory create error", err);
//       alert("Subcategory create failed");
//     }
//   };

//   // ----------------- HANDLE INPUTS -----------------
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setForm({ ...form, file: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   // ----------------- SUBMIT FORM -----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!form.name || !form.category || !form.basePrice) {
//         alert("Name, category & base price required");
//         return;
//       }

//       const fd = new FormData();
//       Object.keys(form).forEach((k) => {
//         if (form[k] !== "" && form[k] !== null) fd.append(k, form[k]);
//       });

//       if (isCopyMode) {
//         await axios.post(API_URL, fd);
//         alert("Copied as new item!");
//       } else if (editId) {
//         await axios.put(`${API_URL}/${editId}`, fd);
//       } else {
//         await axios.post(API_URL, fd);
//       }

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
//       fetchItems();
//     } catch (err) {
//       console.log("Save error", err);
//       alert("Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----------------- EDIT -----------------
//   const handleEdit = (item) => {
//     setForm({
//       name: item.name,
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id?.toString() || "",
//       description: item.description || "",
//       basePrice: item.basePrice,
//       difference: item.difference,
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//     });

//     setIsCopyMode(false);
//     setEditId(item._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ----------------- COPY → NEW ENTRY -----------------
//   const handleCopyToEdit = (item) => {
//     setForm({
//       name: item.name,
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id?.toString() || "",
//       description: item.description || "",
//       basePrice: item.basePrice,
//       difference: item.difference,
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//     });

//     setEditId(null);
//     setIsCopyMode(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   // ----------------- DELETE -----------------
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchItems();
//     } catch (err) {
//       console.error("Delete error", err);
//       alert("Delete failed");
//     }
//   };

//   // ----------------- STATUS TOGGLE -----------------
//   const handleStatusToggle = async (item) => {
//     const newStatus = item.status === "active" ? "inactive" : "active";

//     try {
//       await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
//       setItems((prev) =>
//         prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x))
//       );
//     } catch (err) {
//       console.error("Status toggle error", err);
//       alert("Status update failed");
//     }
//   };

//   // ----------------- BULK DELETE -----------------
//   const handleBulkDelete = async () => {
//     if (!window.confirm("Delete selected items?")) return;

//     try {
//       await Promise.all(
//         selectedItems.map((id) => axios.delete(`${API_URL}/${id}`))
//       );
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk delete error", err);
//       alert("Bulk delete failed");
//     }
//   };

//   // ----------------- BULK HELPERS -----------------
//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) =>
//       prev.map((x) => (x._id === id ? { ...x, [key]: value } : x))
//     );
//   };

//   const handleBulkSave = async () => {
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

//   // ----------------- CSV IMPORT -----------------
//   const handleCsvSelect = (e) => setCsvFile(e.target.files[0]);

//   const handleImportCsv = async () => {
//     if (!csvFile) return alert("Select CSV");

//     const fd = new FormData();
//     fd.append("file", csvFile);

//     try {
//       const res = await axios.post(`${API_URL}/import`, fd);
//       if (res.data.success) {
//         fetchItems();
//         alert("CSV Imported!");
//         setCsvFile(null);
//         if (csvInputRef.current) csvInputRef.current.value = null;
//       } else {
//         alert("CSV import failed");
//       }
//     } catch (err) {
//       console.error("CSV import error", err);
//       alert("CSV import failed");
//     }
//   };

//   // ----------------- CSV EXPORT -----------------
//   const handleExportCsv = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "prices.csv";
//       a.click();
//     } catch (err) {
//       console.error("CSV export error", err);
//       alert("CSV export failed");
//     }
//   };

//   // ----------------- SEARCH FILTER -----------------
//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     return (
//       item.name.toLowerCase().includes(t) ||
//       item.category?.name?.toLowerCase().includes(t) ||
//       item.subcategory?.name?.toLowerCase().includes(t)
//     );
//   });

//   // ----------------- PAGINATION -----------------
//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     indexOfLast - itemsPerPage,
//     indexOfLast
//   );
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* BULK BAR */}
//       {selectedItems.length > 0 && (
//         <div className="bulk-bar">
//           <span>{selectedItems.length} selected</span>

//           {!bulkMode ? (
//             <div className="bulk-actions">
//               <button className="btn delete" onClick={handleBulkDelete}>
//                 🗑 Bulk Delete
//               </button>

//               <button className="btn primary" onClick={() => setBulkMode(true)}>
//                 ✏ Bulk Edit
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
//                           onChange={(e) =>
//                             updateLocalItemField(item._id, "name", e.target.value)
//                           }
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label>Base Price</label>
//                         <input
//                           type="number"
//                           value={item.basePrice}
//                           onChange={(e) =>
//                             updateLocalItemField(
//                               item._id,
//                               "basePrice",
//                               Number(e.target.value)
//                             )
//                           }
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label>Difference</label>
//                         <input
//                           type="number"
//                           value={item.difference || 0}
//                           onChange={(e) =>
//                             updateLocalItemField(
//                               item._id,
//                               "difference",
//                               Number(e.target.value)
//                             )
//                           }
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label>Valid Till</label>
//                         <input
//                           type="date"
//                           value={item.validTill ? item.validTill.split("T")[0] : ""}
//                           onChange={(e) =>
//                             updateLocalItemField(
//                               item._id,
//                               "validTill",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               <button className="btn primary" onClick={handleBulkSave}>
//                 ✔ Save All
//               </button>

//               <button className="btn cancel" onClick={() => setBulkMode(false)}>
//                 ✖ Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ADD / EDIT FORM */}
//       <div className="price-form-card">
//         <h2>
//           {isCopyMode
//             ? "📄 Save Duplicate Product"
//             : editId
//             ? "✏ Update Product"
//             : "➕ Add Product"}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">

//             {/* NAME */}
//             <div className="form-group">
//               <label>Product Name *</label>
//               <input
//                 required
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* CATEGORY SELECT */}
//             <div className="form-group">
//               <label>Category *</label>
//               <div className="category-row">
//                 <select
//                   required
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option value={c._id} key={c._id}>
//                       {c.name}
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

//             {/* ADD CATEGORY */}
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
//                       setNewCategoryPreview(
//                         e.target.files[0]
//                           ? URL.createObjectURL(e.target.files[0])
//                           : null
//                       );
//                     }}
//                   />

//                   <button className="btn primary" type="button" onClick={handleCreateCategory}>
//                     Create
//                   </button>
//                 </div>

//                 {newCategoryPreview && (
//                   <img src={newCategoryPreview} className="categoryPreview" />
//                 )}
//               </div>
//             )}

//             {/* SUBCATEGORY SELECT */}
//             <div className="form-group">
//               <label>Subcategory</label>
//               <div className="category-row">
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   disabled={!subcategories.length}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option value={s._id} key={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>

//                 {form.category && (
//                   <button
//                     type="button"
//                     className="btn small"
//                     onClick={() => setAddingSub(!addingSub)}
//                   >
//                     {addingSub ? "Close" : "Add"}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* ADD SUBCATEGORY */}
//             {addingSub && (
//               <div className="form-group full-width addCategoryBox">
//                 <label>Add New Subcategory</label>

//                 <div className="category-row">
//                   <input
//                     value={newSubName}
//                     onChange={(e) => setNewSubName(e.target.value)}
//                     placeholder="Subcategory name"
//                   />

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       setNewSubImage(e.target.files[0]);
//                       setNewSubPreview(
//                         e.target.files[0]
//                           ? URL.createObjectURL(e.target.files[0])
//                           : null
//                       );
//                     }}
//                   />

//                   <button className="btn primary" type="button" onClick={handleCreateSub}>
//                     Create
//                   </button>
//                 </div>

//                 {newSubPreview && (
//                   <img src={newSubPreview} className="categoryPreview" />
//                 )}
//               </div>
//             )}

//             {/* BASE PRICE */}
//             <div className="form-group">
//               <label>Base Price *</label>
//               <input
//                 type="number"
//                 required
//                 name="basePrice"
//                 value={form.basePrice}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* DIFFERENCE */}
//             <div className="form-group">
//               <label>Difference</label>
//               <input
//                 type="number"
//                 name="difference"
//                 value={form.difference}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* VALID TILL */}
//             <div className="form-group">
//               <label>Valid Till</label>
//               <input
//                 type="date"
//                 name="validTill"
//                 value={form.validTill}
//                 onChange={handleChange}
//               />
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
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           {/* SUBMIT BUTTON */}
//           <div className="form-actions">
//             <button className="btn primary" disabled={loading}>
//               {loading
//                 ? "Saving..."
//                 : isCopyMode
//                 ? "Save Copy"
//                 : editId
//                 ? "Update"
//                 : "Add"}
//             </button>

//             {(editId || isCopyMode) && (
//               <button
//                 type="button"
//                 className="btn cancel"
//                 onClick={() => {
//                   setEditId(null);
//                   setIsCopyMode(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* CSV IMPORT EXPORT */}
//       <div className="csv-controls">
//         <div>
//           <input
//             type="file"
//             accept=".csv"
//             ref={csvInputRef}
//             onChange={handleCsvSelect}
//           />
//           <button className="btn small" onClick={handleImportCsv}>
//             Import CSV
//           </button>
//         </div>

//         <button className="btn primary" onClick={handleExportCsv}>
//           Export CSV
//         </button>
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
//                     checked={
//                       selectedItems.length === filteredItems.length &&
//                       filteredItems.length > 0
//                     }
//                     onChange={() => {
//                       if (selectedItems.length === filteredItems.length)
//                         setSelectedItems([]);
//                       else
//                         setSelectedItems(filteredItems.map((x) => x._id));
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
//                         selectedItems.includes(item._id)
//                           ? setSelectedItems(selectedItems.filter((x) => x !== item._id))
//                           : setSelectedItems([...selectedItems, item._id])
//                       }
//                     />
//                   </td>

//                   <td>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

//                   <td>{item.image ? <img src={item.image} alt="img" /> : "No Img"}</td>

//                   <td>{item.name}</td>

//                   <td>{item.category?.name}</td>

//                   <td>{item.subcategory?.name || "-"}</td>

//                   <td>₹{item.basePrice}</td>

//                   <td>{item.difference || 0}</td>

//                   <td>₹{Number(item.basePrice) + Number(item.difference || 0)}</td>

//                   <td>
//                     <button
//                       className={
//                         item.status === "active" ? "status-active" : "status-inactive"
//                       }
//                       onClick={() => handleStatusToggle(item)}
//                     >
//                       {item.status === "active" ? "🟢 Active" : "🔴 Inactive"}
//                     </button>
//                   </td>

//                   <td>
//                     {item.validTill
//                       ? new Date(item.validTill).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   <td className="actions">
//                     <button className="btn edit" onClick={() => handleEdit(item)}>
//                       Edit
//                     </button>

//                     <button className="btn delete" onClick={() => handleDelete(item._id)}>
//                       Delete
//                     </button>

//                     <button
//                       className="btn small"
//                       style={{ background: "#6f42c1", color: "#fff" }}
//                       onClick={() => handleCopyToEdit(item)}
//                     >
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
//                     selectedItems.includes(item._id)
//                       ? setSelectedItems(selectedItems.filter((x) => x !== item._id))
//                       : setSelectedItems([...selectedItems, item._id])
//                   }
//                 />

//                 {item.image ? (
//                   <img src={item.image} alt="img" />
//                 ) : (
//                   <div>No Image</div>
//                 )}

//                 <h3>{item.name}</h3>

//                 <p>
//                   <b>Category:</b> {item.category?.name}
//                 </p>

//                 <p>
//                   <b>Subcategory:</b> {item.subcategory?.name || "-"}
//                 </p>

//                 <p>
//                   <b>Base:</b> ₹{item.basePrice}
//                 </p>

//                 <p>
//                   <b>Final:</b> ₹
//                   {Number(item.basePrice) + Number(item.difference || 0)}
//                 </p>

//                 <button
//                   className={
//                     item.status === "active" ? "status-active" : "status-inactive"
//                   }
//                   onClick={() => handleStatusToggle(item)}
//                 >
//                   {item.status === "active" ? "Active" : "Inactive"}
//                 </button>

//                 <div className="actions">
//                   <button className="btn edit" onClick={() => handleEdit(item)}>
//                     Edit
//                   </button>

//                   <button className="btn delete" onClick={() => handleDelete(item._id)}>
//                     Delete
//                   </button>

//                   <button
//                     className="btn small"
//                     style={{ background: "#6f42c1", color: "#fff" }}
//                     onClick={() => handleCopyToEdit(item)}
//                   >
//                     Copy
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* PAGINATION */}
//         <div className="pagination">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//           >
//             Previous
//           </button>

//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               className={i + 1 === currentPage ? "active-page" : ""}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
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
  // DATA
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // UI state
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

  // category/subcategory add UI
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [newCategoryPreview, setNewCategoryPreview] = useState(null);

  const [addingSub, setAddingSub] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [newSubImage, setNewSubImage] = useState(null);
  const [newSubPreview, setNewSubPreview] = useState(null);

  // bulk
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  // csv import
  const [csvFile, setCsvFile] = useState(null);
  const csvInputRef = useRef();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // -------------------- FETCH --------------------
  useEffect(() => {
    fetchItems();
    fetchCategories();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data && res.data.success) setItems(res.data.data || []);
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

  // -------------------- SUBCATEGORY AUTO LOAD --------------------
  useEffect(() => {
    if (!form.category) {
      setSubcategories([]);
      setForm((prev) => ({ ...prev, subcategory: "" }));
      return;
    }

    const cat = categories.find((c) => c._id === form.category);
    const subs = (cat && cat.subcategories) || [];
    setSubcategories(subs);

    // keep current subcategory if exists in new subs, otherwise reset
    const exists = subs.some((s) => s._id === form.subcategory);
    if (!exists) setForm((prev) => ({ ...prev, subcategory: "" }));
  }, [form.category, categories]);

  // -------------------- CREATE CATEGORY --------------------
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

  // -------------------- CREATE SUBCATEGORY --------------------
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

  // -------------------- FORM HANDLING --------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      // file input (both image for product and category/sub)
      setForm((p) => ({ ...p, file: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  // -------------------- SUBMIT (ADD / UPDATE / COPY) --------------------
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
      // append all keys (including 0 or empty string when necessary)
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

      // refresh
      await fetchItems();
      await fetchCategories();

      // reset
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
    } catch (err) {
      console.error("Save error", err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- EDIT --------------------
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

    // preload subs for better UX
    const cat = categories.find((c) => c._id === item.category?._id);
    setSubcategories(cat?.subcategories || []);

    setEditId(item._id);
    setIsCopyMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------- COPY --------------------
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------- DELETE --------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems((prev) => prev.filter((x) => x._id !== id));
      setSelectedItems((prev) => prev.filter((x) => x !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  // -------------------- STATUS TOGGLE --------------------
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

  // -------------------- BULK --------------------
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

  // -------------------- CSV IMPORT/EXPORT --------------------
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

  const handleExportCsv = async () => {
    try {
      const res = await axios.get(`${API_URL}/export`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "prices.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV export error", err);
      alert("CSV export failed");
    }
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

  // -------------------- SEARCH & PAGINATION --------------------
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

  // -------------------- RENDER --------------------
  return (
    <div className="price-container">
      {/* HEADER */}
      <div className="header-section">
        <h1>💰 Product Management</h1>
        <p>Manage prices, categories, images, CSV & bulk actions.</p>
      </div>

      {/* SEARCH */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search product, category or subcategory..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* BULK BAR */}
      {selectedItems.length > 0 && (
        <div className="bulk-bar">
          <span>{selectedItems.length} selected</span>

          {!bulkMode ? (
            <div className="bulk-actions" style={{ display: "flex", gap: 10 }}>
              <button className="btn delete" onClick={handleBulkDelete}>
                🗑 Bulk Delete
              </button>

              <button className="btn primary" onClick={() => setBulkMode(true)}>
                ✏ Bulk Edit
              </button>


              <button className="btn small" onClick={handleExportSelectedCsv}>
                ⤓ Export Selected
              </button>
            </div>
          ) : (
            <div className="bulk-panel">
              <h3>✏ Bulk Edit Selected Items</h3>

              {items
                .filter((item) => selectedItems.includes(item._id))
                .map((item) => (
                  <div key={item._id} className="bulk-edit-item-box">
                    <h4>{item.name}</h4>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateLocalItemField(item._id, "name", e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Base Price</label>
                        <input
                          type="number"
                          value={item.basePrice}
                          onChange={(e) =>
                            updateLocalItemField(item._id, "basePrice", Number(e.target.value))
                          }
                        />
                      </div>
                          <div className="form-group">
  <label>Category</label>
  <select
    value={item.category?._id || ""}
    onChange={(e) => {
      const newCat = e.target.value;

      updateLocalItemField(item._id, "category", { _id: newCat });

      const catObj = categories.find((c) => c._id === newCat);
      const firstSub = catObj?.subcategories?.[0]?._id || "";

      updateLocalItemField(item._id, "subcategory", { _id: firstSub });
    }}
  >
    <option value="">Select Category</option>
    {categories.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ))}
  </select>
</div>

<div className="form-group">
  <label>Subcategory</label>
  <select
    value={item.subcategory?._id || ""}
    onChange={(e) =>
      updateLocalItemField(item._id, "subcategory", { _id: e.target.value })
    }
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
                      <div className="form-group">
                        <label>Difference</label>
                        <input
                          type="number"
                          value={item.difference || 0}
                          onChange={(e) =>
                            updateLocalItemField(item._id, "difference", Number(e.target.value))
                          }
                        />
                      </div>

                      {/* <div className="form-group">
                        <label>Valid Till</label>
                        <input
                          type="date"
                          value={item.validTill ? item.validTill.split("T")[0] : ""}
                          onChange={(e) => updateLocalItemField(item._id, "validTill", e.target.value)}
                        />
                      </div> */}
                    </div>
                  </div>
                ))}

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button className="btn primary" onClick={handleBulkSave}>
                  ✔ Save All
                </button>
                <button className="btn cancel" onClick={() => setBulkMode(false)}>
                  ✖ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FORM */}
      <div className="price-form-card">
        <h2>{isCopyMode ? "📄 Save Duplicate Product" : editId ? "✏ Update Product" : "➕ Add Product"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* NAME */}
            <div className="form-group">
              <label>Product Name *</label>
              <input required name="name" value={form.name} onChange={handleChange} />
            </div>

            {/* CATEGORY */}
            <div className="form-group">
              <label>Category *</label>
              <div className="category-row">
                <select
                  required
                  name="category"
                  value={form.category}
                  onChange={(e) => {
                    handleChange(e);
                    // reset subcategory on category change (useEffect will set subs)
                    setForm((p) => ({ ...p, subcategory: "" }));
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button type="button" className="btn small" onClick={() => setAddingCategory((v) => !v)}>
                  {addingCategory ? "Close" : "Add"}
                </button>
              </div>
            </div>

            {/* ADD CATEGORY UI */}
            {addingCategory && (
              <div className="form-group full-width addCategoryBox">
                <label>Add New Category</label>
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
                      setNewCategoryPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                    }}
                  />
                  <button className="btn primary" type="button" onClick={handleCreateCategory}>
                    Create
                  </button>
                </div>
                {newCategoryPreview && <img src={newCategoryPreview} className="categoryPreview" alt="preview" />}
              </div>
            )}

            {/* SUBCATEGORY */}
            <div className="form-group">
              <label>Subcategory</label>
              <div className="category-row">
                <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length}>
                  <option value="">Select Subcategory</option>
                  {subcategories.map((s) => (
                    <option value={s._id} key={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                {form.category && (
                  <button type="button" className="btn small" onClick={() => setAddingSub((v) => !v)}>
                    {addingSub ? "Close" : "Add"}
                  </button>
                )}
              </div>
            </div>

            {/* ADD SUBCATEGORY UI */}
            {addingSub && (
              <div className="form-group full-width addCategoryBox">
                <label>Add New Subcategory</label>
                <div className="category-row">
                  <input value={newSubName} onChange={(e) => setNewSubName(e.target.value)} placeholder="Subcategory name" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setNewSubImage(e.target.files[0]);
                      setNewSubPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                    }}
                  />
                  <button className="btn primary" type="button" onClick={handleCreateSub}>
                    Create
                  </button>
                </div>
                {newSubPreview && <img src={newSubPreview} className="categoryPreview" alt="preview" />}
              </div>
            )}

            {/* BASE PRICE */}
            <div className="form-group">
              <label>Base Price *</label>
              <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} />
            </div>

            {/* DIFFERENCE */}
            <div className="form-group">
              <label>Difference</label>
              <input type="number" name="difference" value={form.difference} onChange={handleChange} />
            </div>

            {/* VALID TILL */}
            <div className="form-group">
              <label>Valid Till</label>
              <input type="date" name="validTill" value={form.validTill} onChange={handleChange} />
            </div>

            {/* IMAGE */}
            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleChange} />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}></textarea>
          </div>

          {/* ACTIONS */}
          <div className="form-actions">
            <button className="btn primary" disabled={loading}>
              {loading ? "Saving..." : isCopyMode ? "Save Copy" : editId ? "Update" : "Add"}
            </button>

            {(editId || isCopyMode) && (
              <button
                type="button"
                className="btn cancel"
                onClick={() => {
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
            )}
          </div>
        </form>
      </div>

      {/* CSV CONTROLS */}
      <div className="csv-controls">
        <div>
          <input type="file" accept=".csv" ref={csvInputRef} onChange={handleCsvSelect} />
          <button className="btn small" onClick={handleImportCsv}>
            Import CSV
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn primary" onClick={handleExportCsv}>
            Export All CSV
          </button>

          <button className="btn" onClick={handleExportSelectedCsv}>
            Export Selected CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
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
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={() => {
                      if (selectedItems.length === filteredItems.length) setSelectedItems([]);
                      else setSelectedItems(filteredItems.map((x) => x._id));
                    }}
                  />
                </th>
                <th>Sr</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Base</th>
                <th>Diff</th>
                <th>Final</th>
                <th>Status</th>
                <th>Valid Till</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, i) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() =>
                        setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
                      }
                    />
                  </td>

                  <td>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

                  <td>{item.image ? <img src={item.image} alt="" /> : "No Img"}</td>

                  <td>{item.name}</td>
                  <td>{item.category?.name || "-"}</td>
                  <td>{item.subcategory?.name || "-"}</td>

                  <td>₹{item.basePrice}</td>
                  <td>{item.difference || 0}</td>
                  <td>₹{Number(item.basePrice) + Number(item.difference || 0)}</td>

                  <td>
                    <button
                      className={item.status === "active" ? "status-active" : "status-inactive"}
                      onClick={() => handleStatusToggle(item)}
                    >
                      {item.status === "active" ? " Active" : " Inactive"}
                    </button>
                  </td>

                  <td>{item.validTill ? new Date(item.validTill).toLocaleDateString() : "-"}</td>

                  <td className="actions">
                    <button className="btn edit" onClick={() => handleEdit(item)}>
                      Edit
                    </button>

                    <button className="btn delete" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>

                    <button className="btn small" style={{ background: "#6f42c1", color: "white" }} onClick={() => handleCopyToEdit(item)}>
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mobile-list">
            {currentItems.map((item) => (
              <div key={item._id} className="mobile-card">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() =>
                    setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
                  }
                />

                {item.image ? <img src={item.image} alt="" /> : <div>No Image</div>}

                <h3>{item.name}</h3>

                <p>
                  <b>Category:</b> {item.category?.name || "-"}
                </p>

                <p>
                  <b>Subcategory:</b> {item.subcategory?.name || "-"}
                </p>

                <p>
                  <b>Base:</b> ₹{item.basePrice}
                </p>

                <p>
                  <b>Final:</b> ₹{Number(item.basePrice) + Number(item.difference || 0)}
                </p>

                <button className={item.status === "active" ? "status-active" : "status-inactive"} onClick={() => handleStatusToggle(item)}>
                  {item.status === "active" ? "Active" : "Inactive"}
                </button>

                <div className="actions">
                  <button className="btn edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>

                  <button className="btn delete" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>

                  <button className="btn small" style={{ background: "#6f42c1", color: "white" }} onClick={() => handleCopyToEdit(item)}>
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={i + 1 === currentPage ? "active-page" : ""} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}



