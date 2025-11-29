

// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import "./PriceList.css";

// // const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// // const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// // export default function PriceList() {
// //   const [items, setItems] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [subcategories, setSubcategories] = useState([]);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // form state for add/update
// //   const [form, setForm] = useState({
// //     name: "",
// //     category: "",
// //     subcategory: "",
// //     description: "",
// //     basePrice: "",
// //     difference: "", // used as todayDiff when creating/updating (but backend update-diff is preferred)
// //     validTill: "",
// //     file: null,
// //     status: "inactive",
// //   });
// // //   const normalizeItem = (item) => {
// // //   return {
// // //     ...item,
// // //     todayDiff: Number(item.todayDiff ?? 0),
// // //     lastFinalPrice: Number(item.lastFinalPrice ?? item.basePrice ?? 0),
// // //     currentFinalPrice: Number(item.currentFinalPrice ?? 0),

// // //     category:
// // //       item.category && typeof item.category === "object"
// // //         ? { _id: item.category._id, name: item.category.name }
// // //         : null,

// // //     subcategory:
// // //   item.subcategory && typeof item.subcategory === "object"
// // //     ? { _id: item.subcategory._id, name: item.subcategory.name }
// // //     : null,

// // //   };
// // // };

// //  const normalizeItem = (item) => {
// //   const cat =
// //     item.category && typeof item.category === "object"
// //       ? { _id: item.category._id, name: item.category.name }
// //       : item.category
// //       ? { _id: item.category, name: "" }
// //       : null;

// //   let sub = null;

// //   if (item.subcategory) {
// //     if (typeof item.subcategory === "object") {
// //       sub = { _id: item.subcategory._id || "", name: item.subcategory.name || "" };
// //     } else {
// //       // subcategory stored as string - treat as name
// //       sub = { _id: "", name: item.subcategory };
// //     }
// //   }

// //   return {
// //     ...item,
// //     todayDiff: Number(item.todayDiff ?? 0),
// //     lastFinalPrice: Number(item.lastFinalPrice ?? item.basePrice ?? 0),
// //     currentFinalPrice: Number(item.currentFinalPrice ?? 0),
// //     category: cat,
// //     subcategory: sub,
// //   };
// // };


// //   const [editId, setEditId] = useState(null);
// //   const [isCopyMode, setIsCopyMode] = useState(false);
// //   const [showForm, setShowForm] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [activeMenu, setActiveMenu] = useState(null);
// // const [quickBasePrices, setQuickBasePrices] = useState({});

// //   const [addingCategory, setAddingCategory] = useState(false);
// //   const [newCategoryName, setNewCategoryName] = useState("");
// //   const [newCategoryImage, setNewCategoryImage] = useState(null);
// //   const [newCategoryPreview, setNewCategoryPreview] = useState(null);

// //   const [addingSub, setAddingSub] = useState(false);
// //   const [newSubName, setNewSubName] = useState("");
// //   const [newSubImage, setNewSubImage] = useState(null);
// //   const [newSubPreview, setNewSubPreview] = useState(null);

// //   const [selectedItems, setSelectedItems] = useState([]);
// //   const [bulkMode, setBulkMode] = useState(false);

// //   const [csvFile, setCsvFile] = useState(null);
// //   const csvInputRef = useRef();

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 30;

// //   const [filterCategory, setFilterCategory] = useState("");
// //   const [filterSubcategory, setFilterSubcategory] = useState("");
// //   const [filterSubs, setFilterSubs] = useState([]);

// //   // local per-row quick diff input map: { [id]: number }
// //   const [quickDiffs, setQuickDiffs] = useState({});

// //   // fetch categories on start
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // whenever categories change, fetch items (so we can populate category/sub names)
// //   useEffect(() => {
// //     if (categories.length > 0) fetchItems();
// //   }, [categories]);

// //   // responsive
// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // when filterCategory changes update filterSubs
// //   useEffect(() => {
// //     if (!filterCategory) {
// //       setFilterSubs([]);
// //       setFilterSubcategory("");
// //       return;
// //     }
// //     const cat = categories.find((c) => c._id === filterCategory);
// //     setFilterSubs(cat?.subcategories || []);
// //     setFilterSubcategory("");
// //   }, [filterCategory, categories]);

// //   // when form.category changes update subcategories for the form
// //   useEffect(() => {
// //     if (!form.category) {
// //       setSubcategories([]);
// //       setForm((prev) => ({ ...prev, subcategory: "" }));
// //       return;
// //     }
// //     const cat = categories.find((c) => c._id === form.category);
// //     setSubcategories(cat?.subcategories || []);
// //     const exists = cat?.subcategories?.some((s) => s._id === form.subcategory);
// //     if (!exists) setForm((prev) => ({ ...prev, subcategory: "" }));
// //   }, [form.category, categories]);

// //   // ------------------ API calls ------------------
// //   const fetchCategories = async () => {
// //     try {
// //       const res = await axios.get(CATEGORY_URL);
// //       if (res.data && res.data.success) setCategories(res.data.categories || []);
// //     } catch (err) {
// //       console.error("Fetch categories error", err);
// //       alert("Could not fetch categories");
// //     }
// //   };

// //   // const fetchItems = async () => {
// //   //   try {
// //   //     setLoading(true);
// //   //     const res = await axios.get(API_URL);
// //   //     if (res.data && res.data.success) {
// //   //       const raw = res.data.data || [];
// // //   const fetchItems = async () => {
// // //   try {
// // //     setLoading(true);
// // //     const res = await axios.get(API_URL);
// // //     if (res.data && res.data.success) {
// // //       const raw = res.data.data || [];

// // //       // ⬇ YAHI PAR CHANGE KARNA HAI
// // //       const enriched = raw.map(normalizeItem);
// // //       setItems(enriched);

// // //     }
// // //   } catch {}
// // // };
// // const fetchItems = async () => {
// //   try {
// //     setLoading(true);
// //     const res = await axios.get(API_URL);

// //     if (res.data?.success) {
// //       const enriched = res.data.data.map((item) => {
// //         const catId = item.category?._id || item.category;
// //         const catObj = categories.find((c) => String(c._id) === String(catId));

// //         let subObj = null;
// //         if (item.subcategory) {
// //           if (typeof item.subcategory === "object") {
// //             subObj = { _id: item.subcategory._id || "", name: item.subcategory.name || "" };
// //           } else if (catObj) {
// //             subObj =
// //               catObj.subcategories.find(
// //                 (s) =>
// //                   String(s._id) === String(item.subcategory) ||
// //                   s.name.toLowerCase() === item.subcategory.toLowerCase()
// //               ) || { _id: "", name: item.subcategory };
// //           }
// //         }

// //         return normalizeItem({
// //           ...item,
// //           category: catObj ? { _id: catObj._id, name: catObj.name } : item.category,
// //           subcategory: subObj,
// //         });
// //       });

// //       setItems(enriched);
// //     }
// //   } catch (err) {
// //     console.error("fetchItems error", err);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //         // ensure fields exist
// //         // const enriched = raw.map((item) => {
// //         //   // category/subcategory may be populated objects or ids
// //         //   const catObj = categories.find(
// //         //     (c) => c._id === item.category || c._id === (item.category?._id || item.category)
// //         //   );
// //         //   const subObj = catObj?.subcategories?.find(
// //         //     (s) =>
// //         //       s._id === item.subcategory ||
// //         //       s._id === (item.subcategory?._id || item.subcategory)
// //         //   );

// // // const enriched = raw.map((item) => {
// // //   return {
// // //     ...item,
// // //     todayDiff: Number(item.todayDiff ?? 0),
// // //     lastFinalPrice: Number(item.lastFinalPrice ?? item.basePrice ?? 0),
// // //     currentFinalPrice: Number(item.currentFinalPrice ?? 0),

// // //     category: item.category
// // //       ? { _id: item.category._id, name: item.category.name }
// // //       : null,

// // //   subcategory: item.subcategory
// // //   ? { _id: item.subcategory._id, name: item.subcategory.name }
// // //   : null,

// // //   };
// // // });
// // // const enriched = raw.map((item) => {
// // //   return {
// // //     ...item,
// // //     todayDiff: Number(item.todayDiff ?? 0),
// // //     lastFinalPrice: Number(item.lastFinalPrice ?? item.basePrice ?? 0),
// // //     currentFinalPrice: Number(item.currentFinalPrice ?? 0),

// // //     category: item.category
// // //       ? { _id: item.category._id, name: item.category.name }
// // //       : null,

// // //     subcategory: item.subcategory
// // //       ? { _id: item.subcategory._id, name: item.subcategory.name }
// // //       : null,
// // //   };
// // // });




// //   // ------------------ Category/Sub creation ------------------
// //   const handleCreateCategory = async () => {
// //     if (!newCategoryName.trim()) return alert("Enter category name");
// //     try {
// //       const fd = new FormData();
// //       fd.append("name", newCategoryName.trim());
// //       if (newCategoryImage) fd.append("image", newCategoryImage);

// //       const res = await axios.post(CATEGORY_URL, fd);
// //       if (res.data && res.data.success) {
// //         setNewCategoryName("");
// //         setNewCategoryImage(null);
// //         setNewCategoryPreview(null);
// //         setAddingCategory(false);
// //         fetchCategories();
// //       } else {
// //         alert("Category creation failed");
// //       }
// //     } catch (err) {
// //       console.error("Create category error", err);
// //       alert("Category creation failed");
// //     }
// //   };

// //   const handleCreateSub = async () => {
// //     if (!newSubName.trim()) return alert("Enter subcategory name");
// //     if (!form.category) return alert("Select category first");

// //     try {
// //       const fd = new FormData();
// //       fd.append("name", newSubName.trim());
// //       if (newSubImage) fd.append("image", newSubImage);

// //       const res = await axios.post(`${CATEGORY_URL}/${form.category}/sub`, fd);
// //       if (res.data && res.data.success) {
// //         setNewSubName("");
// //         setNewSubImage(null);
// //         setNewSubPreview(null);
// //         setAddingSub(false);
// //         fetchCategories();
// //       } else {
// //         alert("Subcategory creation failed");
// //       }
// //     } catch (err) {
// //       console.error("Create sub error", err);
// //       alert("Subcategory creation failed");
// //     }
// //   };

// //   // ------------------ Handlers (create/update/delete) ------------------
// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (files && files.length) {
// //       setForm((p) => ({ ...p, file: files[0] }));
// //     } else {
// //       setForm((p) => ({ ...p, [name]: value }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       if (!form.name || !form.category || !form.basePrice) {
// //         alert("Name, category & base price are required");
// //         setLoading(false);
// //         return;
// //       }

// //       const fd = new FormData();
// //       Object.keys(form).forEach((k) => {
// //         const val = form[k];
// //         if (val !== undefined && val !== null) {
// //           fd.append(k, val);
// //         }
// //       });

// //       let res;
// //       if (isCopyMode) {
// //         // create new item from copy data
// //         res = await axios.post(API_URL, fd);
// //         alert("Copied as new item");
// //       } else if (editId) {
// //         // update general fields (basePrice allowed but base is expected to be fixed by your requirements; be careful)
// //         res = await axios.put(`${API_URL}/${editId}`, fd);
// //         alert("Updated");
// //       } else {
// //         // add new
// //         res = await axios.post(API_URL, fd);
// //         alert("Added");
// //       }

// //       await fetchItems();
// //       await fetchCategories();

// //       setForm({
// //         name: "",
// //         category: "",
// //         subcategory: "",
// //         description: "",
// //         basePrice: "",
// //         difference: "",
// //         validTill: "",
// //         file: null,
// //         status: "inactive",
// //       });
// //       setEditId(null);
// //       setIsCopyMode(false);
// //       setShowModal(false);
// //       setShowForm(false);
// //     } catch (err) {
// //       console.error("Save error", err);
// //       alert("Save failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // const handleEdit = (item) => {
// //   //   setForm({
// //   //     name: item.name || "",
// //   //     category: item.category?._id?.toString() || "",
// //   //     subcategory: item.subcategory?._id?.toString() || "",
// //   //     description: item.description || "",
// //   //     basePrice: item.basePrice ?? "",
// //   //     difference: item.todayDiff ?? 0,
// //   //     validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //   //     file: null,
// //   //     status: item.status || "inactive",
// //   //   });

// //   //   const cat = categories.find((c) => c._id === item.category?._id);
// //   //   setSubcategories(cat?.subcategories || []);

// //   //   setEditId(item._id);
// //   //   setIsCopyMode(false);
// //   //   setShowModal(true);
// //   //   setActiveMenu(null);
// //   // };

// //   // const handleCopyToEdit = (item) => {
// //   //   setForm({
// //   //     name: item.name || "",
// //   //     category: item.category?._id?.toString() || "",
// //   //     subcategory: item.subcategory?._id?.toString() || "",
// //   //     description: item.description || "",
// //   //     basePrice: item.basePrice ?? "",
// //   //     difference: item.todayDiff ?? 0,
// //   //     validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //   //     file: null,
// //   //     status: item.status || "inactive",
// //   //   });

// //   //   const cat = categories.find((c) => c._id === item.category?._id);
// //   //   setSubcategories(cat?.subcategories || []);

// //   //   setEditId(null);
// //   //   setIsCopyMode(true);
// //   //   setShowModal(true);
// //   //   setActiveMenu(null);
// //   // };
// // const handleEdit = (item) => {
// //   // category id might be string or object
// //   const catId = item.category && (item.category._id || item.category);
// //   const cat = categories.find((c) => String(c._id) === String(catId));

// //   setForm({
// //     name: item.name || "",
// //     category: cat ? String(cat._id) : (catId ? String(catId) : ""),
// //     subcategory: item.subcategory?._id ? String(item.subcategory._id) : (item.subcategory || ""),
// //     description: item.description || "",
// //     basePrice: item.basePrice ?? "",
// //     difference: item.todayDiff ?? 0,
// //     validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //     file: null,
// //     status: item.status || "inactive",
// //   });

// //   setSubcategories(cat?.subcategories || []);

// //   setEditId(item._id);
// //   setIsCopyMode(false);
// //   setShowModal(true);
// //   setActiveMenu(null);
// // };

// // const handleCopyToEdit = (item) => {
// //   const catId = item.category && (item.category._id || item.category);
// //   const cat = categories.find((c) => String(c._id) === String(catId));

// //   setForm({
// //     name: item.name || "",
// //     category: cat ? String(cat._id) : (catId ? String(catId) : ""),
// // subcategory: item.subcategory?._id || "",

// //     description: item.description || "",
// //     basePrice: item.basePrice ?? "",
// //     difference: item.todayDiff ?? 0,
// //     validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //     file: null,
// //     status: item.status || "inactive",
// //   });

// //   setSubcategories(cat?.subcategories || []);

// //   setEditId(null);
// //   setIsCopyMode(true);
// //   setShowModal(true);
// //   setActiveMenu(null);
// // };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete item?")) return;
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       setItems((prev) => prev.filter((x) => x._id !== id));
// //       setSelectedItems((prev) => prev.filter((x) => x !== id));
// //       setActiveMenu(null);
// //     } catch (err) {
// //       console.error("Delete error", err);
// //       alert("Delete failed");
// //     }
// //   };

// //   const handleStatusToggle = async (item) => {
// //     try {
// //       const newStatus = item.status === "active" ? "inactive" : "active";
// //       const res = await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
// //       if (res.data && res.data.success) {
// //         // update local
// //         setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
// //       } else {
// //         alert("Status update failed");
// //       }
// //     } catch (err) {
// //       console.error("Status toggle error", err);
// //       alert("Status update failed");
// //     }
// //   };

// //   const handleBulkDelete = async () => {
// //     if (!selectedItems.length) return alert("No items selected");
// //     if (!window.confirm("Delete selected items?")) return;

// //     try {
// //       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
// //       setSelectedItems([]);
// //       fetchItems();
// //       setBulkMode(false);
// //     } catch (err) {
// //       console.error("Bulk delete error", err);
// //       alert("Bulk delete failed");
// //     }
// //   };

// //   const updateLocalItemField = (id, key, value) => {
// //     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
// //   };

// //   // const handleBulkSave = async () => {
// //   //   if (!selectedItems.length) return alert("No items selected for bulk save");

// //   //   const updates = items
// //   //     .filter((x) => selectedItems.includes(x._id))
// //   //     .map((x) => ({
// //   //       id: x._id,
// //   //       name: x.name,
// //   //       basePrice: Number(x.basePrice),
// //   //       difference: Number(x.todayDiff || 0), // backend bulk expects difference key
// //   //       validTill: x.validTill,
// //   //       status: x.status,
// //   //     }));

// //   //   try {
// //   //     const res = await axios.post(`${API_URL}/bulk-update`, { products: updates });
// //   //     if (res.data && res.data.success) {
// //   //       setBulkMode(false);
// //   //       setSelectedItems([]);
// //   //       fetchItems();
// //   //     } else {
// //   //       alert("Bulk save failed");
// //   //     }
// //   //   } catch (err) {
// //   //     console.error("Bulk save error", err);
// //   //     alert("Bulk save failed");
// //   //   }
// //   // };
// //   const handleBulkSave = async () => {
// //   if (!selectedItems.length) return alert("No items selected");

// //   const updates = items
// //     .filter((x) => selectedItems.includes(x._id))
// //     .map((x) => ({
// //       id: x._id,
// //       name: x.name,
// //       basePrice: Number(x.basePrice),
// //       difference: Number(x.todayDiff),
// //       validTill: x.validTill || null,
// //       status: x.status,
// //       category: x.category?._id || "",
// //       subcategory: x.subcategory?._id || "",
// //     }));

// //   try {
// //     const res = await axios.post(`${API_URL}/bulk-update`, { products: updates });
// //     if (res.data.success) {
// //       alert("Bulk Updated");
// //       setBulkMode(false);
// //       setSelectedItems([]);
// //       fetchItems();
// //     }
// //   } catch (err) {
// //     console.log("Bulk update error:", err);
// //     alert("Bulk update failed");
// //   }
// // };



// //   // ------------------ CSV import/export ------------------
// //   const handleCsvSelect = (e) => {
// //     setCsvFile(e.target.files[0]);
// //   };

// //   const handleImportCsv = async () => {
// //     if (!csvFile) return alert("Select CSV file");
// //     try {
// //       const fd = new FormData();
// //       fd.append("file", csvFile);
// //       const res = await axios.post(`${API_URL}/import`, fd);
// //       if (res.data && res.data.success) {
// //         alert(`Imported ${res.data.inserted || 0} items`);
// //         setCsvFile(null);
// //         if (csvInputRef.current) csvInputRef.current.value = null;
// //         fetchItems();
// //       } else {
// //         alert("CSV import failed");
// //       }
// //     } catch (err) {
// //       console.error("CSV import error", err);
// //       alert("CSV import failed");
// //     }
// //   };

// //   const handleExportCsv = () => {
// //     if (!items.length) return alert("No items to export");

// //     const header = [
// //       "id",
// //       "name",
// //       "categoryName",
// //       "subcategoryName",
// //       "basePrice",
// //       "todayDiff",
// //       "lastFinalPrice",
// //       "currentFinalPrice",
// //       "status",
// //       "validTill",
// //       "description",
// //       "imageUrl",
// //     ];

// //     const rows = items.map((p) => [
// //       p._id,
// //       p.name || "",
// //       p.category?.name || "",
// //       p.subcategory?.name || "",
// //       p.basePrice ?? "",
// //       p.todayDiff ?? "",
// //       p.lastFinalPrice ?? "",
// //       p.currentFinalPrice ?? "",
// //       p.status || "",
// //       p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
// //       p.description || "",
// //       p.image || "",
// //     ]);

// //     const csvArray = [header, ...rows];
// //     const csvContent =
// //       "data:text/csv;charset=utf-8," +
// //       csvArray
// //         .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
// //         .join("\n");

// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.href = encodedUri;
// //     link.download = `all_prices_${Date.now()}.csv`;
// //     link.click();
// //   };

// //   const handleExportSelectedCsv = () => {
// //     if (!selectedItems.length) return alert("Select items to export");

// //     const selectedData = items.filter((x) => selectedItems.includes(x._id));
// //     const header = [
// //       "id",
// //       "name",
// //       "categoryName",
// //       "subcategoryName",
// //       "basePrice",
// //       "todayDiff",
// //       "lastFinalPrice",
// //       "currentFinalPrice",
// //       "status",
// //       "validTill",
// //       "description",
// //       "imageUrl",
// //     ];

// //     const rows = selectedData.map((p) => [
// //       p._id,
// //       p.name || "",
// //       p.category?.name || "",
// //       p.subcategory?.name || "",
// //       p.basePrice ?? "",
// //       p.todayDiff ?? "",
// //       p.lastFinalPrice ?? "",
// //       p.currentFinalPrice ?? "",
// //       p.status || "",
// //       p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
// //       p.description || "",
// //       p.image || "",
// //     ]);

// //     const csvArray = [header, ...rows];
// //     const csvContent =
// //       "data:text/csv;charset=utf-8," +
// //       csvArray.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.href = encodedUri;
// //     link.download = `selected_prices_${Date.now()}.csv`;
// //     link.click();
// //   };

// //   // ------------------ Filtering/Pagination ------------------
// //   const filteredItems = items.filter((item) => {
// //     const t = search.toLowerCase();

// //     const matchText =
// //       (item.name || "").toLowerCase().includes(t) ||
// //       (item.category?.name || "").toLowerCase().includes(t) ||
// //       (item.subcategory?.name || "").toLowerCase().includes(t);

// //     const matchCategory = !filterCategory || item.category?._id === filterCategory;
// //     const matchSub =
// //   !filterSubcategory ||
// //   String(item.subcategory?._id || "") === String(filterSubcategory) ||
// //   String(item.subcategory?.name || "").toLowerCase() ===
// //     String(
// //       filterSubs.find((s) => s._id === filterSubcategory)?.name || ""
// //     ).toLowerCase();


// //     return matchText && matchCategory && matchSub;
// //   });

// //   const indexOfLast = currentPage * itemsPerPage;
// //   const currentItems = filteredItems.slice(indexOfLast - itemsPerPage, indexOfLast);
// //   const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

// //   // ------------------ Final price helper ------------------
// //   // const getFinalPrice = (item) => {
// //   //   // trust backend: currentFinalPrice computed server-side
// //   //   return item.currentFinalPrice ?? (Number(item.lastFinalPrice ?? item.basePrice ?? 0) + Number(item.todayDiff ?? 0));
// //   // };
// //   const getFinalPrice = (item) => {
// //   return Number(item.currentFinalPrice ?? 0);
// // };


// //   // ------------------ QUICK DIFF (per-row) ------------------
// //   const handleQuickDiffChange = (id, value) => {
// //     setQuickDiffs((p) => ({ ...p, [id]: value }));
// //   };

// // //   const applyQuickDiff = async (id) => {
// // //     const diff = Number(quickDiffs[id] ?? 0);
// // //     try {
// // //       setLoading(true);
// // //       // const res = await axios.put(`${API_URL}/updateDiff/${id}`, { diff });
// // //       // if (res.data && res.data.success) {
// // //       //   await fetchItems();
// // //       const res = await axios.put(`${API_URL}/updateDiff/${id}`, { diff });

// // // if (res.data.success) {
// // //   const updated = res.data.data;

// // //   setItems((prev) =>
// // //     prev.map((x) => (x._id === id ? updated : x))
// // //   );


// // //         setQuickDiffs((p) => ({ ...p, [id]: undefined }));
// // //       } else {
// // //         alert("Diff update failed");
// // //       }
// // //     } catch (err) {
// // //       console.error("update-diff error", err);
// // //       alert("Diff update failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };


// //   // ------------------ ROUTINE UI ------------------
// // //   const applyQuickDiff = async (id) => {
// // //   const diff = Number(quickDiffs[id] ?? 0);

// // //   try {
// // //     setLoading(true);

// // //     const res = await axios.put(`${API_URL}/updateDiff/${id}`, { diff });

// // //     if (res.data.success) {
// // //       const updated = res.data.data;

// // //       // 🟢 CLEAN SAFE FORMAT (to avoid crash)
// // //       const cleanItem = {
// // //         ...updated,
// // //         todayDiff: Number(updated.todayDiff ?? 0),
// // //         lastFinalPrice: Number(updated.lastFinalPrice ?? 0),
// // //         currentFinalPrice: Number(updated.currentFinalPrice ?? 0),

// // //         category: updated.category
// // //           ? { _id: updated.category._id, name: updated.category.name }
// // //           : null,

// // //         subcategory: updated.subcategory
// // //           ? { name: updated.subcategory.name }
// // //           : null,
// // //       };

// // //       setItems((prev) =>
// // //         prev.map((x) => (x._id === id ? cleanItem : x))
// // //       );

// // //       setQuickDiffs((p) => ({ ...p, [id]: "" }));
// // //     } else {
// // //       alert("Diff update failed");
// // //     }
// // //   } catch (err) {
// // //     console.error("update-diff error", err.response?.data || err);
// // //     alert("Diff update failed");
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
// // const applyQuickDiff = async (id) => {
// //   const diff = Number(quickDiffs[id] ?? 0);

// //   try {
// //     setLoading(true);
// //     const res = await axios.put(`${API_URL}/updateDiff/${id}`, { diff });

// //     if (!res.data.success) {
// //       alert("Diff update failed");
// //       return;
// //     }

// //     const clean = normalizeItem(res.data.data);

// //     setItems((prev) => prev.map((x) => (x._id === id ? clean : x)));
// //     setQuickDiffs((p) => ({ ...p, [id]: "" }));
// //   } catch (err) {
// //     console.error("QUICK DIFF ERROR: ", err.response?.data || err);
// //     alert("Quick diff failed");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.header}>
// //         <h1 style={styles.title}>Product Management</h1>
// //       </div>

// //       <div className="mobile-topbar" style={{ marginBottom: 12 }}>
// //         <input
// //           type="text"
// //           placeholder="Search product, category or subcategory..."
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //           style={styles.searchInput}
// //         />

// //         <button
// //           style={styles.addButton}
// //           onClick={() => {
// //             setShowForm(!showForm);
// //             setEditId(null);
// //             setIsCopyMode(false);
// //           }}
// //         >
// //           {showForm ? "✖ Close" : "➕ Add Product"}
// //         </button>
// //       </div>

// //       <div className="filter-bar" style={{ display: "flex", gap: 10, marginBottom: 12 }}>
// //         <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select" style={styles.select}>
// //           <option value="">Filter by Category</option>
// //           {categories.map((c) => (
// //             <option key={c._id} value={c._id}>
// //               {c.name}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           value={filterSubcategory}
// //           onChange={(e) => setFilterSubcategory(e.target.value)}
// //           className="filter-select"
// //           disabled={!filterSubs.length}
// //           style={styles.select}
// //         >
// //           <option value="">Filter by Subcategory</option>
// //           {filterSubs.map((s) => (
// //             <option key={s._id} value={s._id}>
// //               {s.name}
// //             </option>
// //           ))}
// //         </select>

// //         <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
         
// //           <button style={styles.btnPrimary} onClick={handleExportCsv}>
// //             Export All
// //           </button>
// //         </div>
// //       </div>

// //       {selectedItems.length > 0 && (
// //         <div className="bulk-bar" style={styles.bulkBar}>
// //           {!bulkMode ? (
// //             <div className="bulk-actions" style={{ display: "flex", gap: 8 }}>
// //               <button style={styles.btnDelete} onClick={handleBulkDelete}>
// //                 🗑 Bulk Delete
// //               </button>

// //               <button style={styles.btnPrimary} onClick={() => setBulkMode(true)}>
// //                 ✏ Bulk Edit
// //               </button>
// //             </div>
// //           ) : (
// //             <div style={styles.bulkPanel}>
// //               <h3 style={styles.bulkPanelTitle}>✏ Bulk Edit Selected Items</h3>

// //               {items
// //                 .filter((item) => selectedItems.includes(item._id))
// //                 .map((item) => (
// //                   <div key={item._id} style={styles.bulkItemBox}>
// //                     <h4 style={styles.bulkItemTitle}>{item.name}</h4>

// //                     <div style={styles.formGrid}>
// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Name</label>
// //                         <input
// //                           type="text"
// //                           value={item.name}
// //                           onChange={(e) => updateLocalItemField(item._id, "name", e.target.value)}
// //                           style={styles.input}
// //                         />
// //                       </div>

// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Base Price</label>
// //                         <input
// //                           type="number"
// //                           value={item.basePrice}
// //                           onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
// //                           style={styles.input}
// //                         />
// //                       </div>

// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Today's Difference</label>
// //                         <input
// //                           type="number"
// //                           value={item.todayDiff || 0}
// //                           onChange={(e) => updateLocalItemField(item._id, "todayDiff", Number(e.target.value))}
// //                           style={styles.input}
// //                         />
// //                       </div>

// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Status</label>
// //                         <select
// //                           value={item.status}
// //                           onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
// //                           style={styles.select}
// //                         >
// //                           <option value="active">active</option>
// //                           <option value="inactive">inactive</option>
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}

// //               <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
// //                 <button style={styles.btnPrimary} onClick={handleBulkSave}>
// //                   ✔ Save All
// //                 </button>
// //                 <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
// //                   ✖ Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {showForm && (
// //         <div style={styles.formCard}>
// //           <h2 style={styles.formTitle}> Add Product</h2>

// //           <form onSubmit={handleSubmit}>
// //             <div style={styles.formGrid}>
// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Product Name *</label>
// //                 <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Category *</label>
// //                 <div style={styles.categoryRow}>
// //                   <select
// //                     required
// //                     name="category"
// //                     value={form.category}
// //                     onChange={(e) => {
// //                       handleChange(e);
// //                       setForm((p) => ({ ...p, subcategory: "" }));
// //                     }}
// //                     style={styles.select}
// //                   >
// //                     <option value="">Select Category</option>
// //                     {categories.map((c) => (
// //                       <option value={c._id} key={c._id}>
// //                         {c.name}
// //                       </option>
// //                     ))}
// //                   </select>

// //                   <button type="button" style={styles.btnSmall} onClick={() => setAddingCategory((v) => !v)}>
// //                     {addingCategory ? "Close" : "Add"}
// //                   </button>
// //                 </div>
// //               </div>

// //               {addingCategory && (
// //                 <div style={styles.addCategoryBox}>
// //                   <label style={styles.label}>Add New Category</label>
// //                   <div style={styles.categoryRow}>
// //                     <input
// //                       value={newCategoryName}
// //                       onChange={(e) => setNewCategoryName(e.target.value)}
// //                       placeholder="Category name"
// //                       style={styles.input}
// //                     />
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={(e) => {
// //                         setNewCategoryImage(e.target.files[0]);
// //                         setNewCategoryPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
// //                       }}
// //                       style={styles.fileInput}
// //                     />
// //                     <button style={styles.btnPrimary} type="button" onClick={handleCreateCategory}>
// //                       Create
// //                     </button>
// //                   </div>
// //                   {newCategoryPreview && <img src={newCategoryPreview} style={styles.preview} alt="preview" />}
// //                 </div>
// //               )}

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Subcategory</label>
// //                 <div style={styles.categoryRow}>
// //                   <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length} style={styles.select}>
// //                     <option value="">Select Subcategory</option>
// //                     {subcategories.map((s) => (
// //                       <option value={s._id} key={s._id}>
// //                         {s.name}
// //                       </option>
// //                     ))}
// //                   </select>

// //                   {form.category && (
// //                     <button type="button" style={styles.btnSmall} onClick={() => setAddingSub((v) => !v)}>
// //                       {addingSub ? "Close" : "Add"}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>

// //               {addingSub && (
// //                 <div style={styles.addCategoryBox}>
// //                   <label style={styles.label}>Add New Subcategory</label>
// //                   <div style={styles.categoryRow}>
// //                     <input value={newSubName} onChange={(e) => setNewSubName(e.target.value)} placeholder="Subcategory name" style={styles.input} />
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={(e) => {
// //                         setNewSubImage(e.target.files[0]);
// //                         setNewSubPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
// //                       }}
// //                       style={styles.fileInput}
// //                     />
// //                     <button style={styles.btnPrimary} type="button" onClick={handleCreateSub}>
// //                       Create
// //                     </button>
// //                   </div>
// //                   {newSubPreview && <img src={newSubPreview} style={styles.preview} alt="preview" />}
// //                 </div>
// //               )}

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Base Price *</label>
// //                 <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} style={styles.input} />
// //                 <small style={{ color: "#666" }}>
                  
// //                 </small>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Today's Difference (optional)</label>
// //                 <input type="number" name="difference" value={form.difference} onChange={handleChange} style={styles.input} />
// //                 <small style={{ color: "#666" }}>
                  
// //                 </small>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Valid Till</label>
// //                 <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Image</label>
// //                 <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
// //               </div>
// //             </div>

// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Description</label>
// //               <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
// //             </div>

// //             <div style={styles.formActions}>
// //               <button style={styles.btnPrimary} disabled={loading}>
// //                 {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
// //               </button>

// //               <button
// //                 type="button"
// //                 style={styles.btnCancel}
// //                 onClick={() => {
// //                   setShowForm(false);
// //                   setEditId(null);
// //                   setIsCopyMode(false);
// //                   setForm({
// //                     name: "",
// //                     category: "",
// //                     subcategory: "",
// //                     description: "",
// //                     basePrice: "",
// //                     difference: "",
// //                     validTill: "",
// //                     file: null,
// //                     status: "inactive",
// //                   });
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}

// //       {/* <div className="csv-topbar" style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
     
// //     <input type="file" accept=".csv" ref={csvInputRef} onChange={handleCsvSelect} style={styles.fileInput} />
// //         <button style={styles.btnSmall} onClick={handleImportCsv}>Import</button>
// //         <button style={styles.btnSmall} onClick={handleExportSelectedCsv}>Export Selected</button>
// //       </div> */}
// //       <div style={styles.csvBar}>
// //   <div style={styles.csvLeft}>
// //     <input
// //       type="file"
// //       accept=".csv"
// //       ref={csvInputRef}
// //       onChange={handleCsvSelect}
// //       style={styles.csvInput}
// //     />
// //   </div>

// //   <div style={styles.csvButtons}>
// //     <button style={styles.csvBtn} onClick={handleImportCsv}>Import</button>
// //     <button style={styles.csvBtn} onClick={handleExportSelectedCsv}>Selected</button>
// //     <button style={styles.csvBtnPrimary} onClick={handleExportCsv}>Export All</button>
// //   </div>
// // </div>


// //       <div style={styles.tableCard}>
// //         <div style={styles.tableHeader}>
// //           <h2 style={styles.tableTitle}>Items</h2>
// //           <span style={styles.totalCount}>Total: {filteredItems.length}</span>
// //         </div>

// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
// //                     onChange={() => {
// //                       if (selectedItems.length === filteredItems.length) setSelectedItems([]);
// //                       else setSelectedItems(filteredItems.map((x) => x._id));
// //                     }}
// //                   />
// //                 </th>
// //                 <th style={styles.th}>Sr</th>
// //                 <th style={styles.th}>Image</th>
// //                 <th style={styles.th}>Name</th>
// //                 <th style={styles.th}>Category</th>
// //                 <th style={styles.th}>Subcategory</th>

// //                 <th style={styles.th}>Base</th>
// //                 <th style={styles.th}>YTD</th>
// //                 <th style={styles.th}>Today Diff</th>
// //                 <th style={styles.th}>Current Final</th>

// //                 <th style={styles.th}>Quick Diff</th>
// //                 <th style={styles.th}>Status</th>
// //                 <th style={styles.th}>Valid Till</th>
// //                 <th style={styles.th}>Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {currentItems.map((item, i) => (
// //                 <tr key={item._id} style={styles.tr}>
// //                   <td style={styles.td}>
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedItems.includes(item._id)}
// //                       onChange={() =>
// //                         setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
// //                       }
// //                     />
// //                   </td>

// //                   <td style={styles.td}>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

// //                   <td style={styles.td}>
// //                     {item.image ? <img src={item.image} style={styles.tableImg} alt="" /> : "No Img"}
// //                   </td>

// //                   <td style={styles.td}>{item.name}</td>
// //                   <td style={styles.td}>{item.category?.name || "-"}</td>
// //                   <td style={styles.td}>{item.subcategory?.name || "-"}</td>

// //                   {/* <td style={styles.td}>₹{item.basePrice}</td>
// //                    */}
// //                    <td style={styles.td}>
// //   <>
// //     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //       <input
// //         type="number"
// //         placeholder="base"
// //         value={
// //           quickBasePrices[item._id] !== undefined
// //             ? quickBasePrices[item._id]
// //             : item.basePrice
// //         }
// //         onChange={(e) =>
// //           setQuickBasePrices((p) => ({
// //             ...p,
// //             [item._id]: e.target.value,
// //           }))
// //         }
// //         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
// //       />

// //       <button
// //         style={styles.btnSmall}
// //         onClick={async () => {
// //           const newBase = Number(
// //             quickBasePrices[item._id] ?? item.basePrice
// //           );

// //           if (isNaN(newBase)) return alert("Invalid Base Price");

// //           try {
// //             setLoading(true);
// //             const fd = new FormData();
// //             fd.append("name", item.name);
// //             fd.append("category", item.category?._id);
// //             // fd.append("subcategory", item.subcategory?._id || "");
// //             fd.append("description", item.description || "");
// //             fd.append("basePrice", newBase);
// //             fd.append("validTill", item.validTill || "");
// //             fd.append("status", item.status);

// //             const res = await axios.put(`${API_URL}/${item._id}`, fd);

// //             if (res.data.success) {
// //   const newCurrent = newBase + Number(item.todayDiff || 0);

// //   // Update UI instantly without refresh
// //   // setItems((prev) =>
// //   //   prev.map((x) =>
// //   //     x._id === item._id
// //   //       ? {
// //   //           ...x,
// //   //           basePrice: newBase,
// //   //           currentFinalPrice: newCurrent,
// //   //           lastFinalPrice: newBase, // OPTIONAL (if you want it)
// //   //         }
// //   //       : x
// //   //   )
// //   // );
// // // const updated = res.data.data;

// // // setItems((prev) =>
// // //   prev.map((x) => (x._id === item._id ? updated : x))
// // // );
// // const updated = res.data.data;

// // // const cleanItem = {
// // //   ...updated,
// // //   todayDiff: Number(updated.todayDiff ?? 0),
// // //   lastFinalPrice: Number(updated.lastFinalPrice ?? 0),
// // //   currentFinalPrice: Number(updated.currentFinalPrice ?? 0),

// // //   category: updated.category
// // //     ? { _id: updated.category._id, name: updated.category.name }
// // //     : null,

// // //   subcategory: updated.subcategory
// // //     ? { name: updated.subcategory.name }
// // //     : null,
// // // };

// // // setItems((prev) =>
// // //   prev.map((x) => (x._id === item._id ? cleanItem : x))
// // // );
// // const clean = normalizeItem(res.data.data);

// // setItems((prev) =>
// //   prev.map((x) => (x._id === item._id ? clean : x))
// // );

// //   setQuickBasePrices((p) => ({
// //     ...p,
// //     [item._id]: newBase,
// //   }));
// // }
// //  else {
// //               alert("Base update failed");
// //             }
// //           } catch (err) {
// //             console.error(err);
// //             alert("Base update error");
// //           } finally {
// //             setLoading(false);
// //           }
// //         }}
// //       >
// //         ✔
// //       </button>
// //     </div>

// //     <small style={{ display: "block", color: "#2b8d28ff", marginTop: 4 }}>
// //       Saved: ₹{item.basePrice}
// //     </small>
// //   </>
// // </td>

// //                   <td style={styles.td}>₹{item.lastFinalPrice ?? item.basePrice}</td>
// //                   <td style={styles.td}>{item.todayDiff ?? 0}</td>
// //                   <td style={styles.td}>₹{getFinalPrice(item)}</td>

// //                   <td style={styles.td}>
// //                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //                       <input
// //                         type="number"
// //                         placeholder="diff"
// //                         value={quickDiffs[item._id] ?? ""}
// //                         onChange={(e) => handleQuickDiffChange(item._id, e.target.value)}
// //                         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
// //                       />
// //                       <button style={styles.btnSmall} onClick={() => applyQuickDiff(item._id)}>
// //                         ✔
// //                       </button>
// //                     </div>
// //                     <small style={{ display: "block", color: "#666" }}>
                      
// //                     </small>
// //                   </td>

// //                   <td style={styles.td}>
// //                     <button
// //                       style={item.status === "active" ? styles.statusActive : styles.statusInactive}
// //                       onClick={() => handleStatusToggle(item)}
// //                     >
// //                       {item.status === "active" ? "Active" : "Inactive"}
// //                     </button>
// //                   </td>

// //                   <td style={styles.td}>{item.validTill ? new Date(item.validTill).toLocaleDateString() : "-"}</td>

// //                   <td style={styles.td}>
// //                     <div style={{ position: "relative" }}>
// //                       <button
// //                         style={styles.menuButton}
// //                         onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
// //                       >
// //                         ⋮
// //                       </button>

// //                       {activeMenu === item._id && (
// //                         <div style={styles.dropdown}>
// //                           <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
// //                             ✏ Edit
// //                           </button>
// //                           <button style={styles.dropdownItem} onClick={() => handleCopyToEdit(item)}>
// //                             📄 Copy
// //                           </button>
// //                           <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
// //                             🗑 Delete
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div style={styles.pagination}>
// //           <button style={styles.paginationBtn} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
// //             Previous
// //           </button>

// //           {Array.from({ length: totalPages }, (_, i) => (
// //             <button
// //               key={i}
// //               style={i + 1 === currentPage ? styles.paginationBtnActive : styles.paginationBtn}
// //               onClick={() => setCurrentPage(i + 1)}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}

// //           <button style={styles.paginationBtn} disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
// //           <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
// //             <h2 style={styles.modalTitle}>{isCopyMode ? "📄 Copy Product" : "✏ Edit Product"}</h2>

// //             <form onSubmit={handleSubmit}>
// //               <div style={styles.formGrid}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Product Name *</label>
// //                   <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Category *</label>
// //                   <select
// //                     required
// //                     name="category"
// //                     value={form.category}
// //                     onChange={(e) => {
// //                       handleChange(e);
// //                       setForm((p) => ({ ...p, subcategory: "" }));
// //                     }}
// //                     style={styles.select}
// //                   >
// //                     <option value="">Select Category</option>
// //                     {categories.map((c) => (
// //                       <option value={c._id} key={c._id}>
// //                         {c.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Subcategory</label>
// //                   <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length} style={styles.select}>
// //                     <option value="">Select Subcategory</option>
// //                     {subcategories.map((s) => (
// //                       <option value={s._id} key={s._id}>
// //                         {s.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Base Price *</label>
// //                   <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Today's Difference</label>
// //                   <input type="number" name="difference" value={form.difference} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Valid Till</label>
// //                   <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Image</label>
// //                   <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
// //                 </div>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Description</label>
// //                 <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
// //               </div>

// //               <div style={styles.formActions}>
// //                 <button style={styles.btnPrimary} disabled={loading}>
// //                   {loading ? "Saving..." : isCopyMode ? "Save Copy" : "Update"}
// //                 </button>

// //                 <button
// //                   type="button"
// //                   style={styles.btnCancel}
// //                   onClick={() => {
// //                     setShowModal(false);
// //                     setEditId(null);
// //                     setIsCopyMode(false);
// //                     setForm({
// //                       name: "",
// //                       category: "",
// //                       subcategory: "",
// //                       description: "",
// //                       basePrice: "",
// //                       difference: "",
// //                       validTill: "",
// //                       file: null,
// //                       status: "inactive",
// //                     });
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ---------------------- Styles ---------------------- */
// // /* Reused and tweaked from your original file to match look & feel */
// // const styles = {
// //   container: { padding: 0 },
// //   header: { marginBottom: 0 },
// //   title: {
// //     fontSize: "21px",
// //     fontWeight: "700",
// //     color: "#161718ff",
// //     marginBottom: "6px",
// //   },

// // csvBar: {
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "space-between",
// //   gap: 10,
// //   padding: "8px",
  
// //   borderRadius: 10,
// //   border: "1px solid #d0d7e2",
// //   flexWrap: "wrap",
// // },

// // csvLeft: {
// //   display: "flex",
// //   alignItems: "center",
// // },

// // csvInput: {
// //   padding: "6px",
// //   fontSize: "12px",
// // },

// // csvButtons: {
// //   display: "flex",
// //   gap: 6,
// //   flexWrap: "wrap",
// // },

// // csvBtn: {
// //   background: "#6c8ffc",
// //   color: "#fff",
// //   padding: "6px 10px",
// //   borderRadius: 6,
// //   border: "none",
// //   fontSize: "12px",
// //   cursor: "pointer",
// // },

// // csvBtnPrimary: {
// //   background: "#3b6ef6",
// //   color: "#fff",
// //   padding: "6px 10px",
// //   borderRadius: 6,
// //   border: "none",
// //   fontSize: "12px",
// //   cursor: "pointer",
// // },



// //   searchInput: {
// //     width: "320px",
// //     padding: "10px 12px",
// //     borderRadius: "10px",
// //     border: "1px solid #ced4da",
// //     background: "#f9fbfc",
// //     fontSize: "14px",
// //     outline: "none",
// //   },
// //   addButton: {
// //     marginLeft: 12,
// //     background: "#007bff",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "10px",
// //     padding: "10px 14px",
// //     fontSize: "14px",
// //     cursor: "pointer",
// //   },
// //   bulkBar: {
// //     background: "#e9f2ff",
// //     border: "1px solid #c4d9ff",
// //     borderRadius: "10px",
// //     padding: "12px",
// //     marginBottom: "12px",
// //   },
// //   bulkPanel: {
// //     width: "100%",
// //     background: "#f7faff",
// //     border: "1px solid #cfe2ff",
// //     padding: "12px",
// //     borderRadius: "10px",
// //   },
// //   bulkPanelTitle: {
// //     textAlign: "center",
// //     fontSize: "16px",
// //     fontWeight: "700",
// //     marginBottom: "10px",
// //   },
// //   bulkItemBox: {
// //     background: "#fff",
// //     border: "1px solid #dbe5f5",
// //     padding: "12px",
// //     borderRadius: "8px",
// //     marginBottom: "10px",
// //   },
// //   bulkItemTitle: {
// //     fontSize: "14px",
// //     fontWeight: "600",
// //     marginBottom: "8px",
// //   },
// //   formCard: {
// //     borderRadius: "12px",
// //     padding: "16px",
// //     marginBottom: "18px",
// //     background: "#ffffff",
// //     border: "1px solid #eef2f7",
// //   },
// //   formTitle: { fontSize: "18px", fontWeight: "700", marginBottom: 10 },
// //   formGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// //     gap: "12px",
// //   },
// //   formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
// //   label: { fontWeight: "600", fontSize: "13px", color: "#233142" },
// //   input: {
// //     padding: "8px",
// //     borderRadius: "8px",
// //     border: "1px solid #cfd6e0",
// //     background: "#f8fafc",
// //     fontSize: "13px",
// //   },
// //   select: {
// //     padding: "8px",
// //     borderRadius: "8px",
// //     border: "1px solid #cfd6e0",
// //     background: "#f8fafc",
// //     fontSize: "13px",
// //   },
// //   textarea: {
// //     padding: "8px",
// //     borderRadius: "8px",
// //     border: "1px solid #cfd6e0",
// //     background: "#f8fafc",
// //     minHeight: 80,
// //   },
// //   fileInput: { padding: "6px" },
// //   categoryRow: { display: "flex", gap: "8px", alignItems: "center" },
// //   addCategoryBox: { gridColumn: "1 / -1", padding: 10, background: "#f1f7ff", borderRadius: 8 },
// //   preview: { width: 90, height: 90, objectFit: "cover", borderRadius: 8 },
// //   formActions: { marginTop: 10, display: "flex", gap: 8 },
// //   btnPrimary: {
// //     background: "#007bff",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "8px 12px",
// //     cursor: "pointer",
// //   },
// //   btnSmall: {
// //     background: "#43a047",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "6px 10px",
// //     cursor: "pointer",
// //   },
// //   btnDelete: {
// //     background: "#e63946",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "8px 12px",
// //     cursor: "pointer",
// //   },
// //   btnCancel: {
// //     background: "#adb5bd",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "8px 12px",
// //     cursor: "pointer",
// //   },
// //   tableCard: { marginTop: 12 },
// //   tableHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
// //   tableTitle: { fontSize: "18px", fontWeight: "700" },
// //   totalCount: { fontSize: "13px", color: "#6c757d", fontWeight: "600" },
// //   tableWrapper: { overflowX: "auto" },
// //   table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
// //   th: { background: "#e9f2ff", padding: "10px", fontWeight: "700", color: "#0d3b66", textAlign: "left" },
// //   tr: { borderBottom: "1px solid #edf2f7" },
// //   td: { padding: "10px", whiteSpace: "nowrap", verticalAlign: "middle" },
// //   tableImg: { width: "55px", height: "55px", borderRadius: "6px", objectFit: "cover" },
// //   statusActive: { background: "#93d8ba", padding: "6px 10px", borderRadius: "8px", color: "black", fontWeight: "600", border: "none", cursor: "pointer" },
// //   statusInactive: { background: "#d9b1b1", padding: "6px 10px", borderRadius: "8px", color: "black", fontWeight: "600", border: "none", cursor: "pointer" },
// //   menuButton: { background: "#f0f0f0", border: "none", borderRadius: "6px", padding: "6px 10px", fontSize: "16px", cursor: "pointer" },
// //   dropdown: { position: "absolute", right: 0, top: 32, background: "#fff", border: "1px solid #ddd", borderRadius: 8, zIndex: 100, minWidth: 140 },
// //   dropdownItem: { display: "block", width: "100%", padding: "8px 12px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 500 },
// //   dropdownItemDelete: { display: "block", width: "100%", padding: "8px 12px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#e63946" },
// //   pagination: { marginTop: 12, display: "flex", justifyContent: "center", gap: 8 },
// //   paginationBtn: { padding: "8px 10px", borderRadius: 8, background: "#fff", border: "1px solid #ddd", cursor: "pointer" },
// //   paginationBtnActive: { padding: "8px 10px", borderRadius: 8, background: "#007bff", color: "white", border: "1px solid #0062cc", cursor: "pointer" },
// //   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 },
// //   modal: { background: "#fff", borderRadius: 12, padding: 20, maxWidth: 700, width: "100%", maxHeight: "90vh", overflowY: "auto" },
// //   modalTitle: { fontSize: 18, fontWeight: "700", color: "#0d3b66", marginBottom: 12, textAlign: "center" },
// // };



// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import "./PriceList.css";

// // const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// // const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// // export default function PriceList() {
// //   const [items, setItems] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [subcategories, setSubcategories] = useState([]);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // form state for add/update
// //   const [form, setForm] = useState({
// //     name: "",
// //     category: "",
// //     subcategory: "",
// //     description: "",
// //     basePrice: "",
// //     difference: "", // used as todayDiff when creating/updating (but backend update-diff is preferred)
// //     validTill: "",
// //     file: null,
// //     status: "inactive",
// //   });

// //   const [editId, setEditId] = useState(null);
// //   const [isCopyMode, setIsCopyMode] = useState(false);
// //   const [showForm, setShowForm] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [activeMenu, setActiveMenu] = useState(null);
// // const [quickBasePrices, setQuickBasePrices] = useState({});

// //   const [addingCategory, setAddingCategory] = useState(false);
// //   const [newCategoryName, setNewCategoryName] = useState("");
// //   const [newCategoryImage, setNewCategoryImage] = useState(null);
// //   const [newCategoryPreview, setNewCategoryPreview] = useState(null);

// //   const [addingSub, setAddingSub] = useState(false);
// //   const [newSubName, setNewSubName] = useState("");
// //   const [newSubImage, setNewSubImage] = useState(null);
// //   const [newSubPreview, setNewSubPreview] = useState(null);

// //   const [selectedItems, setSelectedItems] = useState([]);
// //   const [bulkMode, setBulkMode] = useState(false);

// //   const [csvFile, setCsvFile] = useState(null);
// //   const csvInputRef = useRef();

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 30;

// //   const [filterCategory, setFilterCategory] = useState("");
// //   const [filterSubcategory, setFilterSubcategory] = useState("");
// //   const [filterSubs, setFilterSubs] = useState([]);

// //   // local per-row quick diff input map: { [id]: number }
// //   const [quickDiffs, setQuickDiffs] = useState({});

// //   // fetch categories on start
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // whenever categories change, fetch items (so we can populate category/sub names)
// //   useEffect(() => {
// //     if (categories.length > 0) fetchItems();
// //   }, [categories]);

// //   // responsive
// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // when filterCategory changes update filterSubs
// //   useEffect(() => {
// //     if (!filterCategory) {
// //       setFilterSubs([]);
// //       setFilterSubcategory("");
// //       return;
// //     }
// //     const cat = categories.find((c) => c._id === filterCategory);
// //     setFilterSubs(cat?.subcategories || []);
// //     setFilterSubcategory("");
// //   }, [filterCategory, categories]);

// //   // when form.category changes update subcategories for the form
// //   useEffect(() => {
// //     if (!form.category) {
// //       setSubcategories([]);
// //       setForm((prev) => ({ ...prev, subcategory: "" }));
// //       return;
// //     }
// //     const cat = categories.find((c) => c._id === form.category);
// //     setSubcategories(cat?.subcategories || []);
// //     const exists = cat?.subcategories?.some((s) => s._id === form.subcategory);
// //     if (!exists) setForm((prev) => ({ ...prev, subcategory: "" }));
// //   }, [form.category, categories]);

// //   // ------------------ API calls ------------------
// //   const fetchCategories = async () => {
// //     try {
// //       const res = await axios.get(CATEGORY_URL);
// //       if (res.data && res.data.success) setCategories(res.data.categories || []);
// //     } catch (err) {
// //       console.error("Fetch categories error", err);
// //       alert("Could not fetch categories");
// //     }
// //   };

// //   const fetchItems = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get(API_URL);
// //       if (res.data && res.data.success) {
// //         const raw = res.data.data || [];

// //         // ensure fields exist
// //         const enriched = raw.map((item) => {
// //           // category/subcategory may be populated objects or ids
// //           const catObj = categories.find(
// //             (c) => c._id === item.category || c._id === (item.category?._id || item.category)
// //           );
// //           const subObj = catObj?.subcategories?.find(
// //             (s) =>
// //               s._id === item.subcategory ||
// //               s._id === (item.subcategory?._id || item.subcategory)
// //           );

// //           return {
// //             ...item,
// //             // maintain compatibility: backend provides todayDiff/lastFinalPrice/currentFinalPrice
// //             todayDiff: item.todayDiff ?? item.difference ?? 0,
// //             lastFinalPrice: item.lastFinalPrice ?? (item.basePrice ?? 0),
// //             currentFinalPrice:
// //               item.currentFinalPrice ??
// //               item.finalPrice ??
// //               (Number(item.lastFinalPrice ?? item.basePrice ?? 0) + Number(item.todayDiff ?? 0)),
// //             category: catObj ? { _id: catObj._id, name: catObj.name } : (item.category || null),
// //             subcategory: subObj ? { _id: subObj._id, name: subObj.name } : (item.subcategory || null),
// //           };
// //         });

// //         setItems(enriched);
// //       }
// //     } catch (err) {
// //       console.error("Fetch items error", err);
// //       alert("Could not fetch items");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ------------------ Category/Sub creation ------------------
// //   const handleCreateCategory = async () => {
// //     if (!newCategoryName.trim()) return alert("Enter category name");
// //     try {
// //       const fd = new FormData();
// //       fd.append("name", newCategoryName.trim());
// //       if (newCategoryImage) fd.append("image", newCategoryImage);

// //       const res = await axios.post(CATEGORY_URL, fd);
// //       if (res.data && res.data.success) {
// //         setNewCategoryName("");
// //         setNewCategoryImage(null);
// //         setNewCategoryPreview(null);
// //         setAddingCategory(false);
// //         fetchCategories();
// //       } else {
// //         alert("Category creation failed");
// //       }
// //     } catch (err) {
// //       console.error("Create category error", err);
// //       alert("Category creation failed");
// //     }
// //   };

// //   const handleCreateSub = async () => {
// //     if (!newSubName.trim()) return alert("Enter subcategory name");
// //     if (!form.category) return alert("Select category first");

// //     try {
// //       const fd = new FormData();
// //       fd.append("name", newSubName.trim());
// //       if (newSubImage) fd.append("image", newSubImage);

// //       const res = await axios.post(`${CATEGORY_URL}/${form.category}/sub`, fd);
// //       if (res.data && res.data.success) {
// //         setNewSubName("");
// //         setNewSubImage(null);
// //         setNewSubPreview(null);
// //         setAddingSub(false);
// //         fetchCategories();
// //       } else {
// //         alert("Subcategory creation failed");
// //       }
// //     } catch (err) {
// //       console.error("Create sub error", err);
// //       alert("Subcategory creation failed");
// //     }
// //   };

// //   // ------------------ Handlers (create/update/delete) ------------------
// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (files && files.length) {
// //       setForm((p) => ({ ...p, file: files[0] }));
// //     } else {
// //       setForm((p) => ({ ...p, [name]: value }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       if (!form.name || !form.category || !form.basePrice) {
// //         alert("Name, category & base price are required");
// //         setLoading(false);
// //         return;
// //       }

// //       const fd = new FormData();
// //       Object.keys(form).forEach((k) => {
// //         const val = form[k];
// //         if (val !== undefined && val !== null) {
// //           fd.append(k, val);
// //         }
// //       });

// //       let res;
// //       if (isCopyMode) {
// //         // create new item from copy data
// //         res = await axios.post(API_URL, fd);
// //         alert("Copied as new item");
// //       } else if (editId) {
// //         // update general fields (basePrice allowed but base is expected to be fixed by your requirements; be careful)
// //         res = await axios.put(`${API_URL}/${editId}`, fd);
// //         alert("Updated");
// //       } else {
// //         // add new
// //         res = await axios.post(API_URL, fd);
// //         alert("Added");
// //       }

// //       await fetchItems();
// //       await fetchCategories();

// //       setForm({
// //         name: "",
// //         category: "",
// //         subcategory: "",
// //         description: "",
// //         basePrice: "",
// //         difference: "",
// //         validTill: "",
// //         file: null,
// //         status: "inactive",
// //       });
// //       setEditId(null);
// //       setIsCopyMode(false);
// //       setShowModal(false);
// //       setShowForm(false);
// //     } catch (err) {
// //       console.error("Save error", err);
// //       alert("Save failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setForm({
// //       name: item.name || "",
// //       category: item.category?._id?.toString() || "",
// //       subcategory: item.subcategory?._id?.toString() || "",
// //       description: item.description || "",
// //       basePrice: item.basePrice ?? "",
// //       difference: item.todayDiff ?? 0,
// //       validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //       file: null,
// //       status: item.status || "inactive",
// //     });

// //     const cat = categories.find((c) => c._id === item.category?._id);
// //     setSubcategories(cat?.subcategories || []);

// //     setEditId(item._id);
// //     setIsCopyMode(false);
// //     setShowModal(true);
// //     setActiveMenu(null);
// //   };

// //   const handleCopyToEdit = (item) => {
// //     setForm({
// //       name: item.name || "",
// //       category: item.category?._id?.toString() || "",
// //       subcategory: item.subcategory?._id?.toString() || "",
// //       description: item.description || "",
// //       basePrice: item.basePrice ?? "",
// //       difference: item.todayDiff ?? 0,
// //       validTill: item.validTill ? item.validTill.split("T")[0] : "",
// //       file: null,
// //       status: item.status || "inactive",
// //     });

// //     const cat = categories.find((c) => c._id === item.category?._id);
// //     setSubcategories(cat?.subcategories || []);

// //     setEditId(null);
// //     setIsCopyMode(true);
// //     setShowModal(true);
// //     setActiveMenu(null);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete item?")) return;
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       setItems((prev) => prev.filter((x) => x._id !== id));
// //       setSelectedItems((prev) => prev.filter((x) => x !== id));
// //       setActiveMenu(null);
// //     } catch (err) {
// //       console.error("Delete error", err);
// //       alert("Delete failed");
// //     }
// //   };

// //   const handleStatusToggle = async (item) => {
// //     try {
// //       const newStatus = item.status === "active" ? "inactive" : "active";
// //       const res = await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
// //       if (res.data && res.data.success) {
// //         // update local
// //         setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
// //       } else {
// //         alert("Status update failed");
// //       }
// //     } catch (err) {
// //       console.error("Status toggle error", err);
// //       alert("Status update failed");
// //     }
// //   };

// //   const handleBulkDelete = async () => {
// //     if (!selectedItems.length) return alert("No items selected");
// //     if (!window.confirm("Delete selected items?")) return;

// //     try {
// //       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
// //       setSelectedItems([]);
// //       fetchItems();
// //       setBulkMode(false);
// //     } catch (err) {
// //       console.error("Bulk delete error", err);
// //       alert("Bulk delete failed");
// //     }
// //   };

// //   const updateLocalItemField = (id, key, value) => {
// //     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
// //   };

// //   const handleBulkSave = async () => {
// //     if (!selectedItems.length) return alert("No items selected for bulk save");

// //     const updates = items
// //       .filter((x) => selectedItems.includes(x._id))
// //       .map((x) => ({
// //         id: x._id,
// //         name: x.name,
// //         basePrice: Number(x.basePrice),
// //         difference: Number(x.todayDiff || 0), // backend bulk expects difference key
// //         validTill: x.validTill,
// //         status: x.status,
// //       }));

// //     try {
// //       const res = await axios.post(`${API_URL}/bulk-update`, { products: updates });
// //       if (res.data && res.data.success) {
// //         setBulkMode(false);
// //         setSelectedItems([]);
// //         fetchItems();
// //       } else {
// //         alert("Bulk save failed");
// //       }
// //     } catch (err) {
// //       console.error("Bulk save error", err);
// //       alert("Bulk save failed");
// //     }
// //   };

// //   // ------------------ CSV import/export ------------------
// //   const handleCsvSelect = (e) => {
// //     setCsvFile(e.target.files[0]);
// //   };

// //   const handleImportCsv = async () => {
// //     if (!csvFile) return alert("Select CSV file");
// //     try {
// //       const fd = new FormData();
// //       fd.append("file", csvFile);
// //       const res = await axios.post(`${API_URL}/import`, fd);
// //       if (res.data && res.data.success) {
// //         alert(`Imported ${res.data.inserted || 0} items`);
// //         setCsvFile(null);
// //         if (csvInputRef.current) csvInputRef.current.value = null;
// //         fetchItems();
// //       } else {
// //         alert("CSV import failed");
// //       }
// //     } catch (err) {
// //       console.error("CSV import error", err);
// //       alert("CSV import failed");
// //     }
// //   };

// //   const handleExportCsv = () => {
// //     if (!items.length) return alert("No items to export");

// //     const header = [
// //       "id",
// //       "name",
// //       "categoryName",
// //       "subcategoryName",
// //       "basePrice",
// //       "todayDiff",
// //       "lastFinalPrice",
// //       "currentFinalPrice",
// //       "status",
// //       "validTill",
// //       "description",
// //       "imageUrl",
// //     ];

// //     const rows = items.map((p) => [
// //       p._id,
// //       p.name || "",
// //       p.category?.name || "",
// //       p.subcategory?.name || "",
// //       p.basePrice ?? "",
// //       p.todayDiff ?? "",
// //       p.lastFinalPrice ?? "",
// //       p.currentFinalPrice ?? "",
// //       p.status || "",
// //       p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
// //       p.description || "",
// //       p.image || "",
// //     ]);

// //     const csvArray = [header, ...rows];
// //     const csvContent =
// //       "data:text/csv;charset=utf-8," +
// //       csvArray
// //         .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
// //         .join("\n");

// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.href = encodedUri;
// //     link.download = `all_prices_${Date.now()}.csv`;
// //     link.click();
// //   };

// //   const handleExportSelectedCsv = () => {
// //     if (!selectedItems.length) return alert("Select items to export");

// //     const selectedData = items.filter((x) => selectedItems.includes(x._id));
// //     const header = [
// //       "id",
// //       "name",
// //       "categoryName",
// //       "subcategoryName",
// //       "basePrice",
// //       "todayDiff",
// //       "lastFinalPrice",
// //       "currentFinalPrice",
// //       "status",
// //       "validTill",
// //       "description",
// //       "imageUrl",
// //     ];

// //     const rows = selectedData.map((p) => [
// //       p._id,
// //       p.name || "",
// //       p.category?.name || "",
// //       p.subcategory?.name || "",
// //       p.basePrice ?? "",
// //       p.todayDiff ?? "",
// //       p.lastFinalPrice ?? "",
// //       p.currentFinalPrice ?? "",
// //       p.status || "",
// //       p.validTill ? new Date(p.validTill).toISOString().split("T")[0] : "",
// //       p.description || "",
// //       p.image || "",
// //     ]);

// //     const csvArray = [header, ...rows];
// //     const csvContent =
// //       "data:text/csv;charset=utf-8," +
// //       csvArray.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.href = encodedUri;
// //     link.download = `selected_prices_${Date.now()}.csv`;
// //     link.click();
// //   };

// //   // ------------------ Filtering/Pagination ------------------
// //   const filteredItems = items.filter((item) => {
// //     const t = search.toLowerCase();

// //     const matchText =
// //       (item.name || "").toLowerCase().includes(t) ||
// //       (item.category?.name || "").toLowerCase().includes(t) ||
// //       (item.subcategory?.name || "").toLowerCase().includes(t);

// //     const matchCategory = !filterCategory || item.category?._id === filterCategory;
// //     const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

// //     return matchText && matchCategory && matchSub;
// //   });

// //   const indexOfLast = currentPage * itemsPerPage;
// //   const currentItems = filteredItems.slice(indexOfLast - itemsPerPage, indexOfLast);
// //   const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

// //   // ------------------ Final price helper ------------------
// //   const getFinalPrice = (item) => {
// //     // trust backend: currentFinalPrice computed server-side
// //     return item.currentFinalPrice ?? (Number(item.lastFinalPrice ?? item.basePrice ?? 0) + Number(item.todayDiff ?? 0));
// //   };

// //   // ------------------ QUICK DIFF (per-row) ------------------
// //   const handleQuickDiffChange = (id, value) => {
// //     setQuickDiffs((p) => ({ ...p, [id]: value }));
// //   };

// //   const applyQuickDiff = async (id) => {
// //     const diff = Number(quickDiffs[id] ?? 0);
// //     try {
// //       setLoading(true);
// //       const res = await axios.put(`${API_URL}/updateDiff/${id}`, { diff });
// //       if (res.data && res.data.success) {
// //         await fetchItems();
// //         setQuickDiffs((p) => ({ ...p, [id]: undefined }));
// //       } else {
// //         alert("Diff update failed");
// //       }
// //     } catch (err) {
// //       console.error("update-diff error", err);
// //       alert("Diff update failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ------------------ ROUTINE UI ------------------
// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.header}>
// //         <h1 style={styles.title}>Product Management</h1>
// //       </div>

// //       <div className="mobile-topbar" style={{ marginBottom: 12 }}>
// //         <input
// //           type="text"
// //           placeholder="Search product, category or subcategory..."
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //           style={styles.searchInput}
// //         />

// //         <button
// //           style={styles.addButton}
// //           onClick={() => {
// //             setShowForm(!showForm);
// //             setEditId(null);
// //             setIsCopyMode(false);
// //           }}
// //         >
// //           {showForm ? "✖ Close" : "➕ Add Product"}
// //         </button>
// //       </div>

// //       <div className="filter-bar" style={{ display: "flex", gap: 10, marginBottom: 12 }}>
// //         <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select" style={styles.select}>
// //           <option value="">Filter by Category</option>
// //           {categories.map((c) => (
// //             <option key={c._id} value={c._id}>
// //               {c.name}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           value={filterSubcategory}
// //           onChange={(e) => setFilterSubcategory(e.target.value)}
// //           className="filter-select"
// //           disabled={!filterSubs.length}
// //           style={styles.select}
// //         >
// //           <option value="">Filter by Subcategory</option>
// //           {filterSubs.map((s) => (
// //             <option key={s._id} value={s._id}>
// //               {s.name}
// //             </option>
// //           ))}
// //         </select>

// //         <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
         
// //           <button style={styles.btnPrimary} onClick={handleExportCsv}>
// //             Export All
// //           </button>
// //         </div>
// //       </div>

// //       {selectedItems.length > 0 && (
// //         <div className="bulk-bar" style={styles.bulkBar}>
// //           {!bulkMode ? (
// //             <div className="bulk-actions" style={{ display: "flex", gap: 8 }}>
// //               <button style={styles.btnDelete} onClick={handleBulkDelete}>
// //                 🗑 Bulk Delete
// //               </button>

// //               <button style={styles.btnPrimary} onClick={() => setBulkMode(true)}>
// //                 ✏ Bulk Edit
// //               </button>
// //             </div>
// //           ) : (
// //             <div style={styles.bulkPanel}>
// //               <h3 style={styles.bulkPanelTitle}>✏ Bulk Edit Selected Items</h3>

// //               {items
// //                 .filter((item) => selectedItems.includes(item._id))
// //                 .map((item) => (
// //                   <div key={item._id} style={styles.bulkItemBox}>
// //                     <h4 style={styles.bulkItemTitle}>{item.name}</h4>

// //                     <div style={styles.formGrid}>
// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Name</label>
// //                         <input
// //                           type="text"
// //                           value={item.name}
// //                           onChange={(e) => updateLocalItemField(item._id, "name", e.target.value)}
// //                           style={styles.input}
// //                         />
// //                       </div>

// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Base Price</label>
// //                         <input
// //                           type="number"
// //                           value={item.basePrice}
// //                           onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
// //                           style={styles.input}
// //                         />
// //                       </div>

// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Today's Difference</label>
// //                         <input
// //                           type="number"
// //                           value={item.todayDiff || 0}
// //                           onChange={(e) => updateLocalItemField(item._id, "todayDiff", Number(e.target.value))}
// //                           style={styles.input}
// //                         />
// //                       </div>

// //                       <div style={styles.formGroup}>
// //                         <label style={styles.label}>Status</label>
// //                         <select
// //                           value={item.status}
// //                           onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
// //                           style={styles.select}
// //                         >
// //                           <option value="active">active</option>
// //                           <option value="inactive">inactive</option>
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}

// //               <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
// //                 <button style={styles.btnPrimary} onClick={handleBulkSave}>
// //                   ✔ Save All
// //                 </button>
// //                 <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
// //                   ✖ Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {showForm && (
// //         <div style={styles.formCard}>
// //           <h2 style={styles.formTitle}>➕ Add / Edit Product</h2>

// //           <form onSubmit={handleSubmit}>
// //             <div style={styles.formGrid}>
// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Product Name *</label>
// //                 <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Category *</label>
// //                 <div style={styles.categoryRow}>
// //                   <select
// //                     required
// //                     name="category"
// //                     value={form.category}
// //                     onChange={(e) => {
// //                       handleChange(e);
// //                       setForm((p) => ({ ...p, subcategory: "" }));
// //                     }}
// //                     style={styles.select}
// //                   >
// //                     <option value="">Select Category</option>
// //                     {categories.map((c) => (
// //                       <option value={c._id} key={c._id}>
// //                         {c.name}
// //                       </option>
// //                     ))}
// //                   </select>

// //                   <button type="button" style={styles.btnSmall} onClick={() => setAddingCategory((v) => !v)}>
// //                     {addingCategory ? "Close" : "Add"}
// //                   </button>
// //                 </div>
// //               </div>

// //               {addingCategory && (
// //                 <div style={styles.addCategoryBox}>
// //                   <label style={styles.label}>Add New Category</label>
// //                   <div style={styles.categoryRow}>
// //                     <input
// //                       value={newCategoryName}
// //                       onChange={(e) => setNewCategoryName(e.target.value)}
// //                       placeholder="Category name"
// //                       style={styles.input}
// //                     />
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={(e) => {
// //                         setNewCategoryImage(e.target.files[0]);
// //                         setNewCategoryPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
// //                       }}
// //                       style={styles.fileInput}
// //                     />
// //                     <button style={styles.btnPrimary} type="button" onClick={handleCreateCategory}>
// //                       Create
// //                     </button>
// //                   </div>
// //                   {newCategoryPreview && <img src={newCategoryPreview} style={styles.preview} alt="preview" />}
// //                 </div>
// //               )}

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Subcategory</label>
// //                 <div style={styles.categoryRow}>
// //                   <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length} style={styles.select}>
// //                     <option value="">Select Subcategory</option>
// //                     {subcategories.map((s) => (
// //                       <option value={s._id} key={s._id}>
// //                         {s.name}
// //                       </option>
// //                     ))}
// //                   </select>

// //                   {form.category && (
// //                     <button type="button" style={styles.btnSmall} onClick={() => setAddingSub((v) => !v)}>
// //                       {addingSub ? "Close" : "Add"}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>

// //               {addingSub && (
// //                 <div style={styles.addCategoryBox}>
// //                   <label style={styles.label}>Add New Subcategory</label>
// //                   <div style={styles.categoryRow}>
// //                     <input value={newSubName} onChange={(e) => setNewSubName(e.target.value)} placeholder="Subcategory name" style={styles.input} />
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={(e) => {
// //                         setNewSubImage(e.target.files[0]);
// //                         setNewSubPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
// //                       }}
// //                       style={styles.fileInput}
// //                     />
// //                     <button style={styles.btnPrimary} type="button" onClick={handleCreateSub}>
// //                       Create
// //                     </button>
// //                   </div>
// //                   {newSubPreview && <img src={newSubPreview} style={styles.preview} alt="preview" />}
// //                 </div>
// //               )}

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Base Price *</label>
// //                 <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} style={styles.input} />
// //                 <small style={{ color: "#666" }}>
// //                   Base is considered fixed logic-wise. Changing it here will update the stored basePrice.
// //                 </small>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Today's Difference (optional)</label>
// //                 <input type="number" name="difference" value={form.difference} onChange={handleChange} style={styles.input} />
// //                 <small style={{ color: "#666" }}>
                  
// //                 </small>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Valid Till</label>
// //                 <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Image</label>
// //                 <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
// //               </div>
// //             </div>

// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Description</label>
// //               <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
// //             </div>

// //             <div style={styles.formActions}>
// //               <button style={styles.btnPrimary} disabled={loading}>
// //                 {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
// //               </button>

// //               <button
// //                 type="button"
// //                 style={styles.btnCancel}
// //                 onClick={() => {
// //                   setShowForm(false);
// //                   setEditId(null);
// //                   setIsCopyMode(false);
// //                   setForm({
// //                     name: "",
// //                     category: "",
// //                     subcategory: "",
// //                     description: "",
// //                     basePrice: "",
// //                     difference: "",
// //                     validTill: "",
// //                     file: null,
// //                     status: "inactive",
// //                   });
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}

// //       {/* <div className="csv-topbar" style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
     
// //     <input type="file" accept=".csv" ref={csvInputRef} onChange={handleCsvSelect} style={styles.fileInput} />
// //         <button style={styles.btnSmall} onClick={handleImportCsv}>Import</button>
// //         <button style={styles.btnSmall} onClick={handleExportSelectedCsv}>Export Selected</button>
// //       </div> */}
// //       <div style={styles.csvBar}>
// //   <div style={styles.csvLeft}>
// //     <input
// //       type="file"
// //       accept=".csv"
// //       ref={csvInputRef}
// //       onChange={handleCsvSelect}
// //       style={styles.csvInput}
// //     />
// //   </div>

// //   <div style={styles.csvButtons}>
// //     <button style={styles.csvBtn} onClick={handleImportCsv}>Import</button>
// //     <button style={styles.csvBtn} onClick={handleExportSelectedCsv}>Selected</button>
// //     <button style={styles.csvBtnPrimary} onClick={handleExportCsv}>Export All</button>
// //   </div>
// // </div>


// //       <div style={styles.tableCard}>
// //         <div style={styles.tableHeader}>
// //           <h2 style={styles.tableTitle}>Items</h2>
// //           <span style={styles.totalCount}>Total: {filteredItems.length}</span>
// //         </div>

// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
// //                     onChange={() => {
// //                       if (selectedItems.length === filteredItems.length) setSelectedItems([]);
// //                       else setSelectedItems(filteredItems.map((x) => x._id));
// //                     }}
// //                   />
// //                 </th>
// //                 <th style={styles.th}>Sr</th>
// //                 <th style={styles.th}>Image</th>
// //                 <th style={styles.th}>Name</th>
// //                 <th style={styles.th}>Category</th>
// //                 <th style={styles.th}>Subcategory</th>

// //                 <th style={styles.th}>Base</th>
// //                 <th style={styles.th}>YTD</th>
// //                 <th style={styles.th}>PnL</th>
// //                 <th style={styles.th}>Current Final</th>

// //                 <th style={styles.th}>Quick PnL</th>
// //                 <th style={styles.th}>Status</th>
// //                 <th style={styles.th}>Valid Till</th>
// //                 <th style={styles.th}>Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {currentItems.map((item, i) => (
// //                 <tr key={item._id} style={styles.tr}>
// //                   <td style={styles.td}>
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedItems.includes(item._id)}
// //                       onChange={() =>
// //                         setSelectedItems((prev) => (prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]))
// //                       }
// //                     />
// //                   </td>

// //                   <td style={styles.td}>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

// //                   <td style={styles.td}>
// //                     {item.image ? <img src={item.image} style={styles.tableImg} alt="" /> : "No Img"}
// //                   </td>

// //                   <td style={styles.td}>{item.name}</td>
// //                   <td style={styles.td}>{item.category?.name || "-"}</td>
// //                   <td style={styles.td}>{item.subcategory?.name || "-"}</td>

// //                   {/* <td style={styles.td}>₹{item.basePrice}</td>
// //                    */}
// //                    <td style={styles.td}>
// //   <>
// //     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //       <input
// //         type="number"
// //         placeholder="base"
// //         value={
// //           quickBasePrices[item._id] !== undefined
// //             ? quickBasePrices[item._id]
// //             : item.basePrice
// //         }
// //         onChange={(e) =>
// //           setQuickBasePrices((p) => ({
// //             ...p,
// //             [item._id]: e.target.value,
// //           }))
// //         }
// //         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
// //       />

// //       <button
// //         style={styles.btnSmall}
// //         onClick={async () => {
// //           const newBase = Number(
// //             quickBasePrices[item._id] ?? item.basePrice
// //           );

// //           if (isNaN(newBase)) return alert("Invalid Base Price");

// //           try {
// //             setLoading(true);
// //             const fd = new FormData();
// //             fd.append("name", item.name);
// //             fd.append("category", item.category?._id);
// //             fd.append("subcategory", item.subcategory?._id || "");
// //             fd.append("description", item.description || "");
// //             fd.append("basePrice", newBase);
// //             fd.append("validTill", item.validTill || "");
// //             fd.append("status", item.status);

// //             const res = await axios.put(`${API_URL}/${item._id}`, fd);

// //             if (res.data.success) {
// //   const newCurrent = newBase + Number(item.todayDiff || 0);

// //   // Update UI instantly without refresh
// //   setItems((prev) =>
// //     prev.map((x) =>
// //       x._id === item._id
// //         ? {
// //             ...x,
// //             basePrice: newBase,
// //             currentFinalPrice: newCurrent,
// //             lastFinalPrice: newBase, // OPTIONAL (if you want it)
// //           }
// //         : x
// //     )
// //   );

// //   setQuickBasePrices((p) => ({
// //     ...p,
// //     [item._id]: newBase,
// //   }));
// // }
// //  else {
// //               alert("Base update failed");
// //             }
// //           } catch (err) {
// //             console.error(err);
// //             alert("Base update error");
// //           } finally {
// //             setLoading(false);
// //           }
// //         }}
// //       >
// //         ✔
// //       </button>
// //     </div>

// //     <small style={{ display: "block", color: "#2b8d28ff", marginTop: 4 }}>
// //       Saved: ₹{item.basePrice}
// //     </small>
// //   </>
// // </td>

// //                   <td style={styles.td}>₹{item.lastFinalPrice ?? item.basePrice}</td>
// //                   <td style={styles.td}>{item.todayDiff ?? 0}</td>
// //                   <td style={styles.td}>₹{getFinalPrice(item)}</td>

// //                   <td style={styles.td}>
// //                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //                       <input
// //                         type="number"
// //                         placeholder="diff"
// //                         value={quickDiffs[item._id] ?? ""}
// //                         onChange={(e) => handleQuickDiffChange(item._id, e.target.value)}
// //                         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
// //                       />
// //                       <button style={styles.btnSmall} onClick={() => applyQuickDiff(item._id)}>
// //                         ✔
// //                       </button>
// //                     </div>
// //                     <small style={{ display: "block", color: "#666" }}>
                      
// //                     </small>
// //                   </td>

// //                   <td style={styles.td}>
// //                     <button
// //                       style={item.status === "active" ? styles.statusActive : styles.statusInactive}
// //                       onClick={() => handleStatusToggle(item)}
// //                     >
// //                       {item.status === "active" ? "Active" : "Inactive"}
// //                     </button>
// //                   </td>

// //                   <td style={styles.td}>{item.validTill ? new Date(item.validTill).toLocaleDateString() : "-"}</td>

// //                   <td style={styles.td}>
// //                     <div style={{ position: "relative" }}>
// //                       <button
// //                         style={styles.menuButton}
// //                         onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
// //                       >
// //                         ⋮
// //                       </button>

// //                       {activeMenu === item._id && (
// //                         <div style={styles.dropdown}>
// //                           <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
// //                             ✏ Edit
// //                           </button>
// //                           <button style={styles.dropdownItem} onClick={() => handleCopyToEdit(item)}>
// //                             📄 Copy
// //                           </button>
// //                           <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
// //                             🗑 Delete
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div style={styles.pagination}>
// //           <button style={styles.paginationBtn} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
// //             Previous
// //           </button>

// //           {Array.from({ length: totalPages }, (_, i) => (
// //             <button
// //               key={i}
// //               style={i + 1 === currentPage ? styles.paginationBtnActive : styles.paginationBtn}
// //               onClick={() => setCurrentPage(i + 1)}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}

// //           <button style={styles.paginationBtn} disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
// //           <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
// //             <h2 style={styles.modalTitle}>{isCopyMode ? "📄 Copy Product" : "✏ Edit Product"}</h2>

// //             <form onSubmit={handleSubmit}>
// //               <div style={styles.formGrid}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Product Name *</label>
// //                   <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Category *</label>
// //                   <select
// //                     required
// //                     name="category"
// //                     value={form.category}
// //                     onChange={(e) => {
// //                       handleChange(e);
// //                       setForm((p) => ({ ...p, subcategory: "" }));
// //                     }}
// //                     style={styles.select}
// //                   >
// //                     <option value="">Select Category</option>
// //                     {categories.map((c) => (
// //                       <option value={c._id} key={c._id}>
// //                         {c.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Subcategory</label>
// //                   <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcategories.length} style={styles.select}>
// //                     <option value="">Select Subcategory</option>
// //                     {subcategories.map((s) => (
// //                       <option value={s._id} key={s._id}>
// //                         {s.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Base Price *</label>
// //                   <input type="number" required name="basePrice" value={form.basePrice} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Today's Difference</label>
// //                   <input type="number" name="difference" value={form.difference} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Valid Till</label>
// //                   <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Image</label>
// //                   <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
// //                 </div>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Description</label>
// //                 <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
// //               </div>

// //               <div style={styles.formActions}>
// //                 <button style={styles.btnPrimary} disabled={loading}>
// //                   {loading ? "Saving..." : isCopyMode ? "Save Copy" : "Update"}
// //                 </button>

// //                 <button
// //                   type="button"
// //                   style={styles.btnCancel}
// //                   onClick={() => {
// //                     setShowModal(false);
// //                     setEditId(null);
// //                     setIsCopyMode(false);
// //                     setForm({
// //                       name: "",
// //                       category: "",
// //                       subcategory: "",
// //                       description: "",
// //                       basePrice: "",
// //                       difference: "",
// //                       validTill: "",
// //                       file: null,
// //                       status: "inactive",
// //                     });
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /* ---------------------- Styles ---------------------- */
// // /* Reused and tweaked from your original file to match look & feel */
// // const styles = {
// //   container: { padding: 16 },
// //   header: { marginBottom: 8 },
// //   title: {
// //     fontSize: "21px",
// //     fontWeight: "700",
// //     color: "#0d3b66",
// //     marginBottom: "6px",
// //   },

// // csvBar: {
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "space-between",
// //   gap: 10,
// //   padding: "8px",
// //   background: "#f1f5fb",
// //   borderRadius: 10,
// //   border: "1px solid #d0d7e2",
// //   flexWrap: "wrap",
// // },

// // csvLeft: {
// //   display: "flex",
// //   alignItems: "center",
// // },

// // csvInput: {
// //   padding: "6px",
// //   fontSize: "12px",
// // },

// // csvButtons: {
// //   display: "flex",
// //   gap: 6,
// //   flexWrap: "wrap",
// // },

// // csvBtn: {
// //   background: "#6c8ffc",
// //   color: "#fff",
// //   padding: "6px 10px",
// //   borderRadius: 6,
// //   border: "none",
// //   fontSize: "12px",
// //   cursor: "pointer",
// // },

// // csvBtnPrimary: {
// //   background: "#3b6ef6",
// //   color: "#fff",
// //   padding: "6px 10px",
// //   borderRadius: 6,
// //   border: "none",
// //   fontSize: "12px",
// //   cursor: "pointer",
// // },



// //   searchInput: {
// //     width: "320px",
// //     padding: "10px 12px",
// //     borderRadius: "10px",
// //     border: "1px solid #ced4da",
// //     background: "#f9fbfc",
// //     fontSize: "14px",
// //     outline: "none",
// //   },
// //   addButton: {
// //     marginLeft: 12,
// //     background: "#007bff",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "10px",
// //     padding: "10px 14px",
// //     fontSize: "14px",
// //     cursor: "pointer",
// //   },
// //   bulkBar: {
// //     background: "#e9f2ff",
// //     border: "1px solid #c4d9ff",
// //     borderRadius: "10px",
// //     padding: "12px",
// //     marginBottom: "12px",
// //   },
// //   bulkPanel: {
// //     width: "100%",
// //     background: "#f7faff",
// //     border: "1px solid #cfe2ff",
// //     padding: "12px",
// //     borderRadius: "10px",
// //   },
// //   bulkPanelTitle: {
// //     textAlign: "center",
// //     fontSize: "16px",
// //     fontWeight: "700",
// //     marginBottom: "10px",
// //   },
// //   bulkItemBox: {
// //     background: "#fff",
// //     border: "1px solid #dbe5f5",
// //     padding: "12px",
// //     borderRadius: "8px",
// //     marginBottom: "10px",
// //   },
// //   bulkItemTitle: {
// //     fontSize: "14px",
// //     fontWeight: "600",
// //     marginBottom: "8px",
// //   },
// //   formCard: {
// //     borderRadius: "12px",
// //     padding: "16px",
// //     marginBottom: "18px",
// //     background: "#ffffff",
// //     border: "1px solid #eef2f7",
// //   },
// //   formTitle: { fontSize: "18px", fontWeight: "700", marginBottom: 10 },
// //   formGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// //     gap: "12px",
// //   },
// //   formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
// //   label: { fontWeight: "600", fontSize: "13px", color: "#233142" },
// //   input: {
// //     padding: "8px",
// //     borderRadius: "8px",
// //     border: "1px solid #cfd6e0",
// //     background: "#f8fafc",
// //     fontSize: "13px",
// //   },
// //   select: {
// //     padding: "8px",
// //     borderRadius: "8px",
// //     border: "1px solid #cfd6e0",
// //     background: "#f8fafc",
// //     fontSize: "13px",
// //   },
// //   textarea: {
// //     padding: "8px",
// //     borderRadius: "8px",
// //     border: "1px solid #cfd6e0",
// //     background: "#f8fafc",
// //     minHeight: 80,
// //   },
// //   fileInput: { padding: "6px" },
// //   categoryRow: { display: "flex", gap: "8px", alignItems: "center" },
// //   addCategoryBox: { gridColumn: "1 / -1", padding: 10, background: "#f1f7ff", borderRadius: 8 },
// //   preview: { width: 90, height: 90, objectFit: "cover", borderRadius: 8 },
// //   formActions: { marginTop: 10, display: "flex", gap: 8 },
// //   btnPrimary: {
// //     background: "#007bff",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "8px 12px",
// //     cursor: "pointer",
// //   },
// //   btnSmall: {
// //     background: "#43a047",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "6px 10px",
// //     cursor: "pointer",
// //   },
// //   btnDelete: {
// //     background: "#e63946",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "8px 12px",
// //     cursor: "pointer",
// //   },
// //   btnCancel: {
// //     background: "#adb5bd",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     padding: "8px 12px",
// //     cursor: "pointer",
// //   },
// //   tableCard: { marginTop: 12 },
// //   tableHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
// //   tableTitle: { fontSize: "18px", fontWeight: "700" },
// //   totalCount: { fontSize: "13px", color: "#6c757d", fontWeight: "600" },
// //   tableWrapper: { overflowX: "auto" },
// //   table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
// //   th: { background: "#e9f2ff", padding: "10px", fontWeight: "700", color: "#0d3b66", textAlign: "left" },
// //   tr: { borderBottom: "1px solid #edf2f7" },
// //   td: { padding: "10px", whiteSpace: "nowrap", verticalAlign: "middle" },
// //   tableImg: { width: "55px", height: "55px", borderRadius: "6px", objectFit: "cover" },
// //   statusActive: { background: "#93d8ba", padding: "6px 10px", borderRadius: "8px", color: "black", fontWeight: "600", border: "none", cursor: "pointer" },
// //   statusInactive: { background: "#d9b1b1", padding: "6px 10px", borderRadius: "8px", color: "black", fontWeight: "600", border: "none", cursor: "pointer" },
// //   menuButton: { background: "#f0f0f0", border: "none", borderRadius: "6px", padding: "6px 10px", fontSize: "16px", cursor: "pointer" },
// //   dropdown: { position: "absolute", right: 0, top: 32, background: "#fff", border: "1px solid #ddd", borderRadius: 8, zIndex: 100, minWidth: 140 },
// //   dropdownItem: { display: "block", width: "100%", padding: "8px 12px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 500 },
// //   dropdownItemDelete: { display: "block", width: "100%", padding: "8px 12px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#e63946" },
// //   pagination: { marginTop: 12, display: "flex", justifyContent: "center", gap: 8 },
// //   paginationBtn: { padding: "8px 10px", borderRadius: 8, background: "#fff", border: "1px solid #ddd", cursor: "pointer" },
// //   paginationBtnActive: { padding: "8px 10px", borderRadius: 8, background: "#007bff", color: "white", border: "1px solid #0062cc", cursor: "pointer" },
// //   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 },
// //   modal: { background: "#fff", borderRadius: 12, padding: 20, maxWidth: 700, width: "100%", maxHeight: "90vh", overflowY: "auto" },
// //   modalTitle: { fontSize: 18, fontWeight: "700", color: "#0d3b66", marginBottom: 12, textAlign: "center" },
// // };

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const API_URL = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

// export default function PriceList() {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     basePrice: "",
//     profitLoss: "",
//     validTill: "",
//     file: null,
//     status: "inactive",
//   });

//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 30;

//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSubcategory, setFilterSubcategory] = useState("");
//   const [filterSubs, setFilterSubs] = useState([]);

//   // Quick edit states for inline editing
//   const [quickBasePrices, setQuickBasePrices] = useState({});
//   const [quickProfitLoss, setQuickProfitLoss] = useState({});

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0) fetchItems();
//   }, [categories]);

//   useEffect(() => {
//     if (!filterCategory) {
//       setFilterSubs([]);
//       setFilterSubcategory("");
//       return;
//     }
//     const cat = categories.find((c) => c._id === filterCategory);
//     setFilterSubs(cat?.subcategories || []);
//     setFilterSubcategory("");
//   }, [filterCategory, categories]);

//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }
//     const cat = categories.find((c) => c._id === form.category);
//     setSubcategories(cat?.subcategories || []);
//   }, [form.category, categories]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data?.success) setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Fetch categories error", err);
//       alert("Could not fetch categories");
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       if (res.data?.success) {
//         const raw = res.data.data || [];
//         const enriched = raw.map((item) => {
//           const catObj = categories.find((c) => c._id === (item.category?._id || item.category));
//           const subObj = catObj?.subcategories?.find((s) => s._id === (item.subcategory?.id || item.subcategory?._id));

//           return {
//             ...item,
//             basePrice: item.basePrice || 0,
//             profitLoss: item.profitLoss || 0,
//             salePrice: item.salePrice || 0,
//             lockedPrice: item.lockedPrice || 0,
//             yesterdayLock: item.yesterdayLock || 0,
//             brokerDisplay: item.brokerDisplay || 0,
//             category: catObj ? { _id: catObj._id, name: catObj.name } : item.category,
//             subcategory: subObj ? { _id: subObj._id, name: subObj.name } : item.subcategory,
//           };
//         });
//         setItems(enriched);
//       }
//     } catch (err) {
//       console.error("Fetch items error", err);
//       alert("Could not fetch items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files?.length) {
//       setForm((p) => ({ ...p, file: files[0] }));
//     } else {
//       setForm((p) => ({ ...p, [name]: value }));
//     }
//   };

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
//       fd.append("name", form.name);
//       fd.append("category", form.category);
//       if (form.subcategory) fd.append("subcategory", form.subcategory);
//       fd.append("basePrice", form.basePrice);
//       fd.append("profitLoss", form.profitLoss || 0);
//       if (form.description) fd.append("description", form.description);
//       if (form.validTill) fd.append("validTill", form.validTill);
//       fd.append("status", form.status);
//       if (form.file) fd.append("file", form.file);

//       if (editId) {
//         await axios.put(`${API_URL}/${editId}`, fd);
//         alert("Updated successfully");
//       } else {
//         await axios.post(API_URL, fd);
//         alert("Added successfully");
//       }

//       await fetchItems();
//       resetForm();
//     } catch (err) {
//       console.error("Save error", err);
//       alert("Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       category: "",
//       subcategory: "",
//       description: "",
//       basePrice: "",
//       profitLoss: "",
//       validTill: "",
//       file: null,
//       status: "inactive",
//     });
//     setEditId(null);
//     setShowModal(false);
//     setShowForm(false);
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?.id?.toString() || "",
//       description: item.description || "",
//       basePrice: item.basePrice || "",
//       profitLoss: item.profitLoss || 0,
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//       status: item.status || "inactive",
//     });

//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(item._id);
//     setShowModal(true);
//     setActiveMenu(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setItems((prev) => prev.filter((x) => x._id !== id));
//       setSelectedItems((prev) => prev.filter((x) => x !== id));
//       setActiveMenu(null);
//     } catch (err) {
//       console.error("Delete error", err);
//       alert("Delete failed");
//     }
//   };

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

//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
//   };

//   const handleBulkSave = async () => {
//     if (!selectedItems.length) return alert("No items selected");

//     const updates = items
//       .filter((x) => selectedItems.includes(x._id))
//       .map((x) => ({
//         id: x._id,
//         basePrice: Number(x.basePrice),
//         profitLoss: Number(x.profitLoss),
//         status: x.status,
//       }));

//     try {
//       await axios.post(`${API_URL}/bulk-update`, { products: updates });
//       alert("Bulk save successful");
//       setBulkMode(false);
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk save error", err);
//       alert("Bulk save failed");
//     }
//   };

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

//   // Update Base Price inline
//   const updateBasePrice = async (item) => {
//     const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
//     if (isNaN(newBase)) return alert("Invalid Base Price");

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("name", item.name);
//       fd.append("category", item.category?._id);
//       if (item.subcategory?.id) fd.append("subcategory", item.subcategory.id);
//       fd.append("description", item.description || "");
//       fd.append("basePrice", newBase);
//       fd.append("profitLoss", item.profitLoss);
//       fd.append("status", item.status);

//       const res = await axios.put(`${API_URL}/${item._id}`, fd);
//       if (res.data.success) {
//         await fetchItems();
//         setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
//         alert("Base price updated");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update Profit/Loss inline using updateDiff
//   const updateProfitLoss = async (item) => {
//     const diff = Number(quickProfitLoss[item._id] ?? 0);
//     if (isNaN(diff)) return alert("Invalid Profit/Loss");

//     try {
//       setLoading(true);
//       const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
//       if (res.data.success) {
//         await fetchItems();
//         setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
//         alert("Profit/Loss updated");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };



  
//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     const matchText =
//       (item.name || "").toLowerCase().includes(t) ||
//       (item.category?.name || "").toLowerCase().includes(t) ||
//       (item.subcategory?.name || "").toLowerCase().includes(t);

//     const matchCategory = !filterCategory || item.category?._id === filterCategory;
//     const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

//     return matchText && matchCategory && matchSub;
//   });

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfLast - itemsPerPage, indexOfLast);
//   const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

//   return (
//     <div className="container" style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Product Management</h1>
//       </div>

//       <div style={{ marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
//         <input
//           type="text"
//           placeholder="Search product, category or subcategory..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           style={styles.searchInput}
//         />

//         <button
//           style={styles.addButton}
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditId(null);
//           }}
//         >
//           {showForm ? "✖ Close" : "➕ Add Product"}
//         </button>
//       </div>
// <button
//   style={styles.addButton}
//   onClick={() => window.open(`${API_URL}/export`, "_blank")}
// >
//   ⬇ Export CSV
// </button>

// <label style={{ cursor: "pointer" }}>
//   <input
//     type="file"
//     accept=".csv"
//     style={{ display: "none" }}
//     onChange={async (e) => {
//       try {
//         const fd = new FormData();
//         fd.append("file", e.target.files[0]);
//         await axios.post(`${API_URL}/import`, fd);
//         alert("Imported successfully");
//         fetchItems();
//       } catch (err) {
//         alert("Import failed");
//       }
//     }}
//   />
//   <span style={styles.addButton}>📤 Import CSV</span>
// </label>

//       <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">Filter by Category</option>
//           {categories.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={filterSubcategory}
//           onChange={(e) => setFilterSubcategory(e.target.value)}
//           disabled={!filterSubs.length}
//           style={styles.select}
//         >
//           <option value="">Filter by Subcategory</option>
//           {filterSubs.map((s) => (
//             <option key={s._id} value={s._id}>
//               {s.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedItems.length > 0 && (
//         <div style={styles.bulkBar}>
//           {!bulkMode ? (
//             <div style={{ display: "flex", gap: 8 }}>
//               <button style={styles.btnDelete} onClick={handleBulkDelete}>
//                 🗑 Bulk Delete
//               </button>
//               <button style={styles.btnPrimary} onClick={() => setBulkMode(true)}>
//                 ✏ Bulk Edit
//               </button>
//             </div>
//           ) : (
//             <div style={styles.bulkPanel}>
//               <h3 style={styles.bulkPanelTitle}>✏ Bulk Edit Selected Items</h3>

//               {items
//                 .filter((item) => selectedItems.includes(item._id))
//                 .map((item) => (
//                   <div key={item._id} style={styles.bulkItemBox}>
//                     <h4 style={styles.bulkItemTitle}>{item.name}</h4>

//                     <div style={styles.formGrid}>
//                       <div style={styles.formGroup}>
//                         <label style={styles.label}>Base Price</label>
//                         <input
//                           type="number"
//                           value={item.basePrice}
//                           onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
//                           style={styles.input}
//                         />
//                       </div>

//                       <div style={styles.formGroup}>
//                         <label style={styles.label}>Profit/Loss</label>
//                         <input
//                           type="number"
//                           value={item.profitLoss}
//                           onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
//                           style={styles.input}
//                         />
//                       </div>

//                       <div style={styles.formGroup}>
//                         <label style={styles.label}>Status</label>
//                         <select
//                           value={item.status}
//                           onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
//                           style={styles.select}
//                         >
//                           <option value="active">active</option>
//                           <option value="inactive">inactive</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               {/* <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
//                 <button style={styles.btnPrimary} onClick={handleBulkSave}>
//                   ✔ Save All
//                 </button>
//                 <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
//                   ✖ Cancel
//                 </button>
//               </div> */}
//               <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: 'wrap' }}>

//   <button style={styles.btnPrimary} onClick={handleBulkSave}>
//     ✔ Save All
//   </button>

//   <button
//     style={styles.btnPrimary}
//     onClick={async () => {
//       if (!selectedItems.length) return alert("No items selected");

//       for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);

//       alert("Selected copied");
//       fetchItems();
//     }}
//   >
//     📄 Copy Selected
//   </button>

//   <button
//     style={styles.btnPrimary}
//     onClick={async () => {
//       if (!selectedItems.length) return alert("No items selected");

//       const res = await axios.post(
//         `${API_URL}/export-selected`,
//         { ids: selectedItems },
//         { responseType: "blob" }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "selected.csv";
//       a.click();
//     }}
//   >
//     ⬇ Export Selected
//   </button>

//   <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
//     ✖ Cancel
//   </button>
// </div>

//             </div>
//           )}
//         </div>
//       )}

//       {showForm && (
//         <div style={styles.formCard}>
//           <h2 style={styles.formTitle}>➕ Add / Edit Product</h2>

//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGrid}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Product Name *</label>
//                 <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Category *</label>
//                 <select required name="category" value={form.category} onChange={handleChange} style={styles.select}>
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option value={c._id} key={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Subcategory</label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   disabled={!subcategories.length}
//                   style={styles.select}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option value={s._id} key={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Base Price *</label>
//                 <input
//                   type="number"
//                   required
//                   name="basePrice"
//                   value={form.basePrice}
//                   onChange={handleChange}
//                   style={styles.input}
//                 />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Profit/Loss</label>
//                 <input
//                   type="number"
//                   name="profitLoss"
//                   value={form.profitLoss}
//                   onChange={handleChange}
//                   style={styles.input}
//                 />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Valid Till</label>
//                 <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Image</label>
//                 <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Status</label>
//                 <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
//             </div>

//             <div style={styles.formActions}>
//               <button style={styles.btnPrimary} disabled={loading}>
//                 {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
//               </button>

//               <button type="button" style={styles.btnCancel} onClick={resetForm}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div style={styles.tableCard}>
//         <div style={styles.tableHeader}>
//           <h2 style={styles.tableTitle}>Items</h2>
//           <span style={styles.totalCount}>Total: {filteredItems.length}</span>
//         </div>

//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                     onChange={() => {
//                       if (selectedItems.length === filteredItems.length) setSelectedItems([]);
//                       else setSelectedItems(filteredItems.map((x) => x._id));
//                     }}
//                   />
//                 </th>
//                 <th style={styles.th}>Sr</th>
//                 <th style={styles.th}>Image</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Category</th>
//                 <th style={styles.th}>Subcategory</th>
//                 <th style={styles.th}>Base Price</th>
//                 <th style={styles.th}>Profit/Loss</th>
//                 <th style={styles.th}>Sale Price</th>
//                 <th style={styles.th}>Price Lock</th>
//                 <th style={styles.th}>Teji/Maddi</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentItems.map((item, i) => (
//                 <tr key={item._id} style={styles.tr}>
//                   <td style={styles.td}>
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(item._id)}
//                       onChange={() =>
//                         setSelectedItems((prev) =>
//                           prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]
//                         )
//                       }
//                     />
//                   </td>

//                   <td style={styles.td}>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

//                   <td style={styles.td}>
//                     {item.image ? <img src={item.image} style={styles.tableImg} alt="" /> : "No Img"}
//                   </td>

//                   <td style={styles.td}>{item.name}</td>
//                   <td style={styles.td}>{item.category?.name || "-"}</td>
//                   <td style={styles.td}>{item.subcategory?.name || "-"}</td>

//                   {/* BASE PRICE - Editable */}
//                   <td style={styles.td}>
//                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                       <input
//                         type="number"
//                         value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
//                         onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
//                         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
//                       />
//                       <button style={styles.btnSmall} onClick={() => updateBasePrice(item)}>
//                         ✔
//                       </button>
//                     </div>
//                     <small style={{ color: "#28a745", display: "block", marginTop: 4 }}>Saved: ₹{item.basePrice}</small>
//                   </td>

//                   {/* PROFIT/LOSS - Editable */}
//                   <td style={styles.td}>
//                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                       <input
//                         type="number"
//                         placeholder="change"
//                         value={quickProfitLoss[item._id] ?? ""}
//                         onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
//                         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
//                       />
//                       <button style={styles.btnSmall} onClick={() => updateProfitLoss(item)}>
//                         ✔
//                       </button>
//                     </div>
//                     <small style={{ color: "#666", display: "block", marginTop: 4 }}>Current: {item.profitLoss}</small>
//                   </td>

//                   {/* SALE PRICE */}
//                   <td style={styles.td}>₹{item.salePrice}</td>

//                   {/* PRICE LOCK */}
//                   <td style={styles.td}>₹{item.lockedPrice}</td>

//                   {/* TEJI/MADDI */}
//                   <td style={styles.td}>
//                     <span style={{ color: item.brokerDisplay >= 0 ? "#28a745" : "#dc3545", fontWeight: "600" }}>
//                       {item.brokerDisplay >= 0 ? "▲" : "▼"} {Math.abs(item.brokerDisplay)}
//                     </span>
//                   </td>

//                   {/* STATUS */}
//                   <td style={styles.td}>
//                     <button
//                       style={item.status === "active" ? styles.statusActive : styles.statusInactive}
//                       onClick={() => handleStatusToggle(item)}
//                     >
//                       {item.status === "active" ? "Active" : "Inactive"}
//                     </button>
//                   </td>

//                   {/* ACTIONS */}
//                   <td style={styles.td}>
//                     <div style={{ position: "relative" }}>
//                       <button
//                         style={styles.menuButton}
//                         onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
//                       >
//                         ⋮
//                       </button>

//                       {activeMenu === item._id && (
//                         <div style={styles.dropdown}>
//                           {/* <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
//                             ✏ Edit
//                           </button>
//                           <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
//                             🗑 Delete
//                           </button> */}
//                           <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
//   ✏ Edit
// </button>

// <button
//   style={styles.dropdownItem}
//   onClick={async () => {
//     await axios.post(`${API_URL}/copy/${item._id}`);
//     alert("Copied successfully");
//     fetchItems();
//   }}
// >
//   📄 Copy
// </button>

// <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
//   🗑 Delete
// </button>

//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div style={styles.pagination}>
//           <button style={styles.paginationBtn} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
//             Previous
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               style={i + 1 === currentPage ? styles.paginationBtnActive : styles.paginationBtn}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             style={styles.paginationBtn}
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {showModal && (
//         <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
//           <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h2 style={styles.modalTitle}>✏ Edit Product</h2>

//             <form onSubmit={handleSubmit}>
//               <div style={styles.formGrid}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Product Name *</label>
//                   <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Category *</label>
//                   <select required name="category" value={form.category} onChange={handleChange} style={styles.select}>
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option value={c._id} key={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Subcategory</label>
//                   <select
//                     name="subcategory"
//                     value={form.subcategory}
//                     onChange={handleChange}
//                     disabled={!subcategories.length}
//                     style={styles.select}
//                   >
//                     <option value="">Select Subcategory</option>
//                     {subcategories.map((s) => (
//                       <option value={s._id} key={s._id}>
//                         {s.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Base Price *</label>
//                   <input
//                     type="number"
//                     required
//                     name="basePrice"
//                     value={form.basePrice}
//                     onChange={handleChange}
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Profit/Loss</label>
//                   <input
//                     type="number"
//                     name="profitLoss"
//                     value={form.profitLoss}
//                     onChange={handleChange}
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Valid Till</label>
//                   <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Image</label>
//                   <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Status</label>
//                   <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Description</label>
//                 <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
//               </div>

//               <div style={styles.formActions}>
//                 <button style={styles.btnPrimary} disabled={loading}>
//                   {loading ? "Saving..." : "Update"}
//                 </button>

//                 <button type="button" style={styles.btnCancel} onClick={resetForm}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { padding: 16, fontFamily: "Arial, sans-serif" },
//   header: { marginBottom: 8 },
//   title: {
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "#0d3b66",
//     marginBottom: "8px",
//   },
//   searchInput: {
//     flex: "1",
//     minWidth: "250px",
//     padding: "10px 12px",
//     borderRadius: "10px",
//     border: "1px solid #ced4da",
//     background: "#f9fbfc",
//     fontSize: "14px",
//     outline: "none",
//   },
//   addButton: {
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     padding: "10px 16px",
//     fontSize: "14px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   select: {
//     padding: "8px 12px",
//     borderRadius: "8px",
//     border: "1px solid #cfd6e0",
//     background: "#f8fafc",
//     fontSize: "13px",
//     minWidth: "150px",
//   },
//   bulkBar: {
//     background: "#e9f2ff",
//     border: "1px solid #c4d9ff",
//     borderRadius: "10px",
//     padding: "12px",
//     marginBottom: "12px",
//   },
//   bulkPanel: {
//     width: "100%",
//     background: "#f7faff",
//     border: "1px solid #cfe2ff",
//     padding: "12px",
//     borderRadius: "10px",
//   },
//   bulkPanelTitle: {
//     textAlign: "center",
//     fontSize: "16px",
//     fontWeight: "700",
//     marginBottom: "10px",
//     color: "#0d3b66",
//   },
//   bulkItemBox: {
//     background: "#fff",
//     border: "1px solid #dbe5f5",
//     padding: "12px",
//     borderRadius: "8px",
//     marginBottom: "10px",
//   },
//   bulkItemTitle: {
//     fontSize: "14px",
//     fontWeight: "600",
//     marginBottom: "8px",
//     color: "#233142",
//   },
//   formCard: {
//     borderRadius: "12px",
//     padding: "20px",
//     marginBottom: "18px",
//     background: "#ffffff",
//     border: "1px solid #eef2f7",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//   },
//   formTitle: { 
//     fontSize: "18px", 
//     fontWeight: "700", 
//     marginBottom: 16,
//     color: "#0d3b66",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "12px",
//   },
//   formGroup: { 
//     display: "flex", 
//     flexDirection: "column", 
//     gap: "6px" 
//   },
//   label: { 
//     fontWeight: "600", 
//     fontSize: "13px", 
//     color: "#233142" 
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #cfd6e0",
//     background: "#f8fafc",
//     fontSize: "13px",
//     outline: "none",
//   },
//   textarea: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #cfd6e0",
//     background: "#f8fafc",
//     minHeight: 80,
//     fontSize: "13px",
//     outline: "none",
//     resize: "vertical",
//   },
//   fileInput: { 
//     padding: "6px",
//     fontSize: "13px",
//   },
//   formActions: { 
//     marginTop: 16, 
//     display: "flex", 
//     gap: 10 
//   },
//   btnPrimary: {
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px",
//   },
//   btnSmall: {
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     padding: "6px 12px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: "600",
//   },
//   btnDelete: {
//     background: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "8px 14px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px",
//   },
//   btnCancel: {
//     background: "#6c757d",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px",
//   },
//   tableCard: { 
//     marginTop: 16,
//     background: "#fff",
//     borderRadius: "12px",
//     padding: "16px",
//     border: "1px solid #eef2f7",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//   },
//   tableHeader: { 
//     display: "flex", 
//     justifyContent: "space-between", 
//     marginBottom: 12,
//     alignItems: "center",
//   },
//   tableTitle: { 
//     fontSize: "18px", 
//     fontWeight: "700",
//     color: "#0d3b66",
//   },
//   totalCount: { 
//     fontSize: "14px", 
//     color: "#6c757d", 
//     fontWeight: "600" 
//   },
//   tableWrapper: { 
//     overflowX: "auto",
//     border: "1px solid #e9ecef",
//     borderRadius: "8px",
//   },
//   table: { 
//     width: "100%", 
//     borderCollapse: "collapse", 
//     fontSize: "13px" 
//   },
//   th: { 
//     background: "#f8f9fa", 
//     padding: "12px 10px", 
//     fontWeight: "700", 
//     color: "#0d3b66", 
//     textAlign: "left",
//     borderBottom: "2px solid #dee2e6",
//     whiteSpace: "nowrap",
//   },
//   tr: { 
//     borderBottom: "1px solid #edf2f7",
//     transition: "background 0.2s",
//   },
//   td: { 
//     padding: "12px 10px", 
//     whiteSpace: "nowrap", 
//     verticalAlign: "middle" 
//   },
//   tableImg: { 
//     width: "50px", 
//     height: "50px", 
//     borderRadius: "6px", 
//     objectFit: "cover" 
//   },
//   statusActive: { 
//     background: "#d4edda", 
//     padding: "6px 12px", 
//     borderRadius: "6px", 
//     color: "#155724", 
//     fontWeight: "600", 
//     border: "1px solid #c3e6cb", 
//     cursor: "pointer",
//     fontSize: "12px",
//   },
//   statusInactive: { 
//     background: "#f8d7da", 
//     padding: "6px 12px", 
//     borderRadius: "6px", 
//     color: "#721c24", 
//     fontWeight: "600", 
//     border: "1px solid #f5c6cb", 
//     cursor: "pointer",
//     fontSize: "12px",
//   },
//   menuButton: { 
//     background: "#f0f0f0", 
//     border: "1px solid #ddd", 
//     borderRadius: "6px", 
//     padding: "6px 10px", 
//     fontSize: "16px", 
//     cursor: "pointer",
//     fontWeight: "700",
//   },
//   dropdown: { 
//     position: "absolute", 
//     right: 0, 
//     top: 36, 
//     background: "#fff", 
//     border: "1px solid #ddd", 
//     borderRadius: 8, 
//     zIndex: 100, 
//     minWidth: 140,
//     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//   },
//   dropdownItem: { 
//     display: "block", 
//     width: "100%", 
//     padding: "10px 14px", 
//     background: "transparent", 
//     border: "none", 
//     textAlign: "left", 
//     cursor: "pointer", 
//     fontSize: 13, 
//     fontWeight: 500,
//     transition: "background 0.2s",
//   },
//   dropdownItemDelete: { 
//     display: "block", 
//     width: "100%", 
//     padding: "10px 14px", 
//     background: "transparent", 
//     border: "none", 
//     textAlign: "left", 
//     cursor: "pointer", 
//     fontSize: 13, 
//     fontWeight: 500, 
//     color: "#dc3545",
//     transition: "background 0.2s",
//   },
//   pagination: { 
//     marginTop: 16, 
//     display: "flex", 
//     justifyContent: "center", 
//     gap: 8,
//     flexWrap: "wrap",
//   },
//   paginationBtn: { 
//     padding: "8px 12px", 
//     borderRadius: 6, 
//     background: "#fff", 
//     border: "1px solid #dee2e6", 
//     cursor: "pointer",
//     fontSize: "13px",
//     fontWeight: "500",
//   },
//   paginationBtnActive: { 
//     padding: "8px 12px", 
//     borderRadius: 6, 
//     background: "#007bff", 
//     color: "white", 
//     border: "1px solid #007bff", 
//     cursor: "pointer",
//     fontSize: "13px",
//     fontWeight: "600",
//   },
//   modalOverlay: { 
//     position: "fixed", 
//     top: 0, 
//     left: 0, 
//     right: 0, 
//     bottom: 0, 
//     background: "rgba(0,0,0,0.5)", 
//     display: "flex", 
//     justifyContent: "center", 
//     alignItems: "center", 
//     zIndex: 1000, 
//     padding: 20 
//   },
//   modal: { 
//     background: "#fff", 
//     borderRadius: 12, 
//     padding: 24, 
//     maxWidth: 700, 
//     width: "100%", 
//     maxHeight: "90vh", 
//     overflowY: "auto",
//     boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//   },
//   modalTitle: { 
//     fontSize: 20, 
//     fontWeight: "700", 
//     color: "#0d3b66", 
//     marginBottom: 16, 
//     textAlign: "center" 
//   },
// }





import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_URL = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_URL = "https://grocerrybackend.vercel.app/api/categories";

export default function PriceList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    basePrice: "",
    profitLoss: "",
    validTill: "",
    file: null,
    status: "inactive",
  });

  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [filterSubs, setFilterSubs] = useState([]);

  // Quick edit states for inline editing
  const [quickBasePrices, setQuickBasePrices] = useState({});
  const [quickProfitLoss, setQuickProfitLoss] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) fetchItems();
  }, [categories]);

  useEffect(() => {
    if (!filterCategory) {
      setFilterSubs([]);
      setFilterSubcategory("");
      return;
    }
    const cat = categories.find((c) => c._id === filterCategory);
    setFilterSubs(cat?.subcategories || []);
    setFilterSubcategory("");
  }, [filterCategory, categories]);

  useEffect(() => {
    if (!form.category) {
      setSubcategories([]);
      setForm((prev) => ({ ...prev, subcategory: "" }));
      return;
    }
    const cat = categories.find((c) => c._id === form.category);
    setSubcategories(cat?.subcategories || []);
  }, [form.category, categories]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      if (res.data?.success) setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch categories error", err);
      alert("Could not fetch categories");
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data?.success) {
        const raw = res.data.data || [];
        // const enriched = raw.map((item) => {
        //   const catObj = categories.find((c) => c._id === (item.category?._id || item.category));
        //   const subObj = catObj?.subcategories?.find((s) => s._id === (item.subcategory?.id || item.subcategory?._id));

        //   return {
        //     ...item,
        //     basePrice: item.basePrice || 0,
        //     profitLoss: item.profitLoss || 0,
        //     salePrice: item.salePrice || 0,
        //     lockedPrice: item.lockedPrice || 0,
        //     yesterdayLock: item.yesterdayLock || 0,
        //     brokerDisplay: item.brokerDisplay || 0,
        //     category: catObj ? { _id: catObj._id, name: catObj.name } : item.category,
        //     subcategory: subObj ? { _id: subObj._id, name: subObj.name } : item.subcategory,
        //   };
        // });
        const enriched = raw.map((item) => {
  const catObj = categories.find((c) => c._id === (item.category?._id || item.category));

  const subObj = catObj?.subcategories?.find(
    (s) => s._id === item.subcategory?.id
  );

  return {
    ...item,
    category: catObj ? { _id: catObj._id, name: catObj.name } : null,
    subcategory: subObj
      ? { _id: subObj._id, name: subObj.name }
      : item.subcategory?.id
      ? { _id: item.subcategory.id, name: item.subcategory.name }
      : null,
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
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
      fd.append("name", form.name);
      fd.append("category", form.category);
      // if (form.subcategory) fd.append("subcategory", form.subcategory);
      if (form.subcategory) {
  const sub = subcategories.find((s) => s._id === form.subcategory);
  fd.append("subcategory[id]", sub._id);
  fd.append("subcategory[name]", sub.name);
  fd.append("subcategory[image]", sub.image || "");
}

      fd.append("basePrice", form.basePrice);
      fd.append("profitLoss", form.profitLoss || 0);
      if (form.description) fd.append("description", form.description);
      if (form.validTill) fd.append("validTill", form.validTill);
      fd.append("status", form.status);
      if (form.file) fd.append("file", form.file);

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, fd);
        alert("Updated successfully");
      } else {
        await axios.post(API_URL, fd);
        alert("Added successfully");
      }

      await fetchItems();
      resetForm();
    } catch (err) {
      console.error("Save error", err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      subcategory: "",
      description: "",
      basePrice: "",
      profitLoss: "",
      validTill: "",
      file: null,
      status: "inactive",
    });
    setEditId(null);
    setShowModal(false);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      category: item.category?._id?.toString() || "",
      // subcategory: item.subcategory?.id?.toString() || "",
      subcategory: item.subcategory?._id || "",

      description: item.description || "",
      basePrice: item.basePrice || "",
      profitLoss: item.profitLoss || 0,
      validTill: item.validTill ? item.validTill.split("T")[0] : "",
      file: null,
      status: item.status || "inactive",
    });

    const cat = categories.find((c) => c._id === item.category?._id);
    setSubcategories(cat?.subcategories || []);

    setEditId(item._id);
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
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

  const updateLocalItemField = (id, key, value) => {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
  };

  const handleBulkSave = async () => {
    if (!selectedItems.length) return alert("No items selected");

    const updates = items
      .filter((x) => selectedItems.includes(x._id))
      .map((x) => ({
        id: x._id,
        basePrice: Number(x.basePrice),
        profitLoss: Number(x.profitLoss),
        status: x.status,
      }));

    try {
      await axios.post(`${API_URL}/bulk-update`, { products: updates });
      alert("Bulk save successful");
      setBulkMode(false);
      setSelectedItems([]);
      fetchItems();
    } catch (err) {
      console.error("Bulk save error", err);
      alert("Bulk save failed");
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

  // Update Base Price inline
  const updateBasePrice = async (item) => {
    const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
    if (isNaN(newBase)) return alert("Invalid Base Price");

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", item.name);
      fd.append("category", item.category?._id);
      if (item.subcategory?.id) fd.append("subcategory", item.subcategory.id);
      fd.append("description", item.description || "");
      fd.append("basePrice", newBase);
      fd.append("profitLoss", item.profitLoss);
      fd.append("status", item.status);

      const res = await axios.put(`${API_URL}/${item._id}`, fd);
      if (res.data.success) {
        await fetchItems();
        setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
        alert("Base price updated");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Update Profit/Loss inline using updateDiff
  const updateProfitLoss = async (item) => {
    const diff = Number(quickProfitLoss[item._id] ?? 0);
    if (isNaN(diff)) return alert("Invalid Profit/Loss");

    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
      if (res.data.success) {
        await fetchItems();
        setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
        alert("Profit/Loss updated");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };



  
  const filteredItems = items.filter((item) => {
    const t = search.toLowerCase();
    const matchText =
      (item.name || "").toLowerCase().includes(t) ||
      (item.category?.name || "").toLowerCase().includes(t) ||
      (item.subcategory?.name || "").toLowerCase().includes(t);

    const matchCategory = !filterCategory || item.category?._id === filterCategory;
    const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

    return matchText && matchCategory && matchSub;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  return (
    <div className="container" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Product Management</h1>
      </div>

      <div style={{ marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
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
          }}
        >
          {showForm ? "✖ Close" : "➕ Add Product"}
        </button>
      </div>
<button
  style={styles.addButton}
  onClick={() => window.open(`${API_URL}/export`, "_blank")}
>
  ⬇ Export CSV
</button>

<label style={{ cursor: "pointer" }}>
  <input
    type="file"
    accept=".csv"
    style={{ display: "none" }}
    onChange={async (e) => {
      try {
        const fd = new FormData();
        fd.append("file", e.target.files[0]);
        await axios.post(`${API_URL}/import`, fd);
        alert("Imported successfully");
        fetchItems();
      } catch (err) {
        alert("Import failed");
      }
    }}
  />
  <span style={styles.addButton}>📤 Import CSV</span>
</label>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">Filter by Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={filterSubcategory}
          onChange={(e) => setFilterSubcategory(e.target.value)}
          disabled={!filterSubs.length}
          style={styles.select}
        >
          <option value="">Filter by Subcategory</option>
          {filterSubs.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {selectedItems.length > 0 && (
        <div style={styles.bulkBar}>
          {!bulkMode ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.btnDelete} onClick={handleBulkDelete}>
                🗑 Bulk Delete
              </button>
              <button style={styles.btnPrimary} onClick={() => setBulkMode(true)}>
                ✏ Bulk Edit
              </button>
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
                        <label style={styles.label}>Base Price</label>
                        <input
                          type="number"
                          value={item.basePrice}
                          onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Profit/Loss</label>
                        <input
                          type="number"
                          value={item.profitLoss}
                          onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Status</label>
                        <select
                          value={item.status}
                          onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
                          style={styles.select}
                        >
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

              {/* <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button style={styles.btnPrimary} onClick={handleBulkSave}>
                  ✔ Save All
                </button>
                <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
                  ✖ Cancel
                </button>
              </div> */}
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: 'wrap' }}>

  <button style={styles.btnPrimary} onClick={handleBulkSave}>
    ✔ Save All
  </button>

  <button
    style={styles.btnPrimary}
    onClick={async () => {
      if (!selectedItems.length) return alert("No items selected");

      for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);

      alert("Selected copied");
      fetchItems();
    }}
  >
    📄 Copy Selected
  </button>

  <button
    style={styles.btnPrimary}
    onClick={async () => {
      if (!selectedItems.length) return alert("No items selected");

      const res = await axios.post(
        `${API_URL}/export-selected`,
        { ids: selectedItems },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "selected.csv";
      a.click();
    }}
  >
    ⬇ Export Selected
  </button>

  <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
    ✖ Cancel
  </button>
</div>

            </div>
          )}
        </div>
      )}

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>➕ Add / Edit Product</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name *</label>
                <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Category *</label>
                <select required name="category" value={form.category} onChange={handleChange} style={styles.select}>
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
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  disabled={!subcategories.length}
                  style={styles.select}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((s) => (
                    // <option value={s._id} key={s._id}>
                    //   {s.name}
                    // </option>
                    <option value={s._id}>{s.name}</option>

                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Base Price *</label>
                <input
                  type="number"
                  required
                  name="basePrice"
                  value={form.basePrice}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Profit/Loss</label>
                <input
                  type="number"
                  name="profitLoss"
                  value={form.profitLoss}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Valid Till</label>
                <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Image</label>
                <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
            </div>

            <div style={styles.formActions}>
              <button style={styles.btnPrimary} disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
              </button>

              <button type="button" style={styles.btnCancel} onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>Items</h2>
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
                <th style={styles.th}>Base Price</th>
                <th style={styles.th}>Profit/Loss</th>
                <th style={styles.th}>Sale Price</th>
                <th style={styles.th}>Price Lock</th>
                <th style={styles.th}>Teji/Maddi</th>
                <th style={styles.th}>Status</th>
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
                        setSelectedItems((prev) =>
                          prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]
                        )
                      }
                    />
                  </td>

                  <td style={styles.td}>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

                  <td style={styles.td}>
                    {item.image ? <img src={item.image} style={styles.tableImg} alt="" /> : "No Img"}
                  </td>

                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.category?.name || "-"}</td>
                  {/* <td style={styles.td}>{item.subcategory?.name || "-"}</td> */}
                  <td>{item.subcategory?.name || "-"}</td>


                  {/* BASE PRICE - Editable */}
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="number"
                        value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
                        onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
                        style={{ ...styles.input, padding: "6px 8px", width: 80 }}
                      />
                      <button style={styles.btnSmall} onClick={() => updateBasePrice(item)}>
                        ✔
                      </button>
                    </div>
                    <small style={{ color: "#28a745", display: "block", marginTop: 4 }}>Saved: ₹{item.basePrice}</small>
                  </td>

                  {/* PROFIT/LOSS - Editable */}
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="number"
                        placeholder="change"
                        value={quickProfitLoss[item._id] ?? ""}
                        onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
                        style={{ ...styles.input, padding: "6px 8px", width: 80 }}
                      />
                      <button style={styles.btnSmall} onClick={() => updateProfitLoss(item)}>
                        ✔
                      </button>
                    </div>
                    <small style={{ color: "#666", display: "block", marginTop: 4 }}>Current: {item.profitLoss}</small>
                  </td>

                  {/* SALE PRICE */}
                  <td style={styles.td}>₹{item.salePrice}</td>

                  {/* PRICE LOCK */}
                  <td style={styles.td}>₹{item.lockedPrice}</td>

                  {/* TEJI/MADDI */}
                  <td style={styles.td}>
                    <span style={{ color: item.brokerDisplay >= 0 ? "#28a745" : "#dc3545", fontWeight: "600" }}>
                      {item.brokerDisplay >= 0 ? "▲" : "▼"} {Math.abs(item.brokerDisplay)}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td style={styles.td}>
                    <button
                      style={item.status === "active" ? styles.statusActive : styles.statusInactive}
                      onClick={() => handleStatusToggle(item)}
                    >
                      {item.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* ACTIONS */}
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
                          {/* <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
                            ✏ Edit
                          </button>
                          <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
                            🗑 Delete
                          </button> */}
                          <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
  ✏ Edit
</button>

<button
  style={styles.dropdownItem}
  onClick={async () => {
    await axios.post(`${API_URL}/copy/${item._id}`);
    alert("Copied successfully");
    fetchItems();
  }}
>
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

          <button
            style={styles.paginationBtn}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>✏ Edit Product</h2>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category *</label>
                  <select required name="category" value={form.category} onChange={handleChange} style={styles.select}>
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
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    disabled={!subcategories.length}
                    style={styles.select}
                  >
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
                  <input
                    type="number"
                    required
                    name="basePrice"
                    value={form.basePrice}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Profit/Loss</label>
                  <input
                    type="number"
                    name="profitLoss"
                    value={form.profitLoss}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Valid Till</label>
                  <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Image</label>
                  <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
              </div>

              <div style={styles.formActions}>
                <button style={styles.btnPrimary} disabled={loading}>
                  {loading ? "Saving..." : "Update"}
                </button>

                <button type="button" style={styles.btnCancel} onClick={resetForm}>
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
  container: { padding: 16, fontFamily: "Arial, sans-serif" },
  header: { marginBottom: 8 },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0d3b66",
    marginBottom: "8px",
  },
  searchInput: {
    flex: "1",
    minWidth: "250px",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #ced4da",
    background: "#f9fbfc",
    fontSize: "14px",
    outline: "none",
  },
  addButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #cfd6e0",
    background: "#f8fafc",
    fontSize: "13px",
    minWidth: "150px",
  },
  bulkBar: {
    background: "#e9f2ff",
    border: "1px solid #c4d9ff",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "12px",
  },
  bulkPanel: {
    width: "100%",
    background: "#f7faff",
    border: "1px solid #cfe2ff",
    padding: "12px",
    borderRadius: "10px",
  },
  bulkPanelTitle: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#0d3b66",
  },
  bulkItemBox: {
    background: "#fff",
    border: "1px solid #dbe5f5",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  bulkItemTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#233142",
  },
  formCard: {
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "18px",
    background: "#ffffff",
    border: "1px solid #eef2f7",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  formTitle: { 
    fontSize: "18px", 
    fontWeight: "700", 
    marginBottom: 16,
    color: "#0d3b66",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },
  formGroup: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "6px" 
  },
  label: { 
    fontWeight: "600", 
    fontSize: "13px", 
    color: "#233142" 
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cfd6e0",
    background: "#f8fafc",
    fontSize: "13px",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cfd6e0",
    background: "#f8fafc",
    minHeight: 80,
    fontSize: "13px",
    outline: "none",
    resize: "vertical",
  },
  fileInput: { 
    padding: "6px",
    fontSize: "13px",
  },
  formActions: { 
    marginTop: 16, 
    display: "flex", 
    gap: 10 
  },
  btnPrimary: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  btnSmall: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
  btnDelete: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  btnCancel: {
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  tableCard: { 
    marginTop: 16,
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid #eef2f7",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  tableHeader: { 
    display: "flex", 
    justifyContent: "space-between", 
    marginBottom: 12,
    alignItems: "center",
  },
  tableTitle: { 
    fontSize: "18px", 
    fontWeight: "700",
    color: "#0d3b66",
  },
  totalCount: { 
    fontSize: "14px", 
    color: "#6c757d", 
    fontWeight: "600" 
  },
  tableWrapper: { 
    overflowX: "auto",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
  },
  table: { 
    width: "100%", 
    borderCollapse: "collapse", 
    fontSize: "13px" 
  },
  th: { 
    background: "#f8f9fa", 
    padding: "12px 10px", 
    fontWeight: "700", 
    color: "#0d3b66", 
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    whiteSpace: "nowrap",
  },
  tr: { 
    borderBottom: "1px solid #edf2f7",
    transition: "background 0.2s",
  },
  td: { 
    padding: "12px 10px", 
    whiteSpace: "nowrap", 
    verticalAlign: "middle" 
  },
  tableImg: { 
    width: "50px", 
    height: "50px", 
    borderRadius: "6px", 
    objectFit: "cover" 
  },
  statusActive: { 
    background: "#d4edda", 
    padding: "6px 12px", 
    borderRadius: "6px", 
    color: "#155724", 
    fontWeight: "600", 
    border: "1px solid #c3e6cb", 
    cursor: "pointer",
    fontSize: "12px",
  },
  statusInactive: { 
    background: "#f8d7da", 
    padding: "6px 12px", 
    borderRadius: "6px", 
    color: "#721c24", 
    fontWeight: "600", 
    border: "1px solid #f5c6cb", 
    cursor: "pointer",
    fontSize: "12px",
  },
  menuButton: { 
    background: "#f0f0f0", 
    border: "1px solid #ddd", 
    borderRadius: "6px", 
    padding: "6px 10px", 
    fontSize: "16px", 
    cursor: "pointer",
    fontWeight: "700",
  },
  dropdown: { 
    position: "absolute", 
    right: 0, 
    top: 36, 
    background: "#fff", 
    border: "1px solid #ddd", 
    borderRadius: 8, 
    zIndex: 100, 
    minWidth: 140,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  dropdownItem: { 
    display: "block", 
    width: "100%", 
    padding: "10px 14px", 
    background: "transparent", 
    border: "none", 
    textAlign: "left", 
    cursor: "pointer", 
    fontSize: 13, 
    fontWeight: 500,
    transition: "background 0.2s",
  },
  dropdownItemDelete: { 
    display: "block", 
    width: "100%", 
    padding: "10px 14px", 
    background: "transparent", 
    border: "none", 
    textAlign: "left", 
    cursor: "pointer", 
    fontSize: 13, 
    fontWeight: 500, 
    color: "#dc3545",
    transition: "background 0.2s",
  },
  pagination: { 
    marginTop: 16, 
    display: "flex", 
    justifyContent: "center", 
    gap: 8,
    flexWrap: "wrap",
  },
  paginationBtn: { 
    padding: "8px 12px", 
    borderRadius: 6, 
    background: "#fff", 
    border: "1px solid #dee2e6", 
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
  paginationBtnActive: { 
    padding: "8px 12px", 
    borderRadius: 6, 
    background: "#007bff", 
    color: "white", 
    border: "1px solid #007bff", 
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
  modalOverlay: { 
    position: "fixed", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: "rgba(0,0,0,0.5)", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    zIndex: 1000, 
    padding: 20 
  },
  modal: { 
    background: "#fff", 
    borderRadius: 12, 
    padding: 24, 
    maxWidth: 700, 
    width: "100%", 
    maxHeight: "90vh", 
    overflowY: "auto",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#0d3b66", 
    marginBottom: 16, 
    textAlign: "center" 
  },
}
