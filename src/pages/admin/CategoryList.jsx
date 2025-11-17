import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryList.css";

const API = "https://grocerrybackend.vercel.app/api/categories";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.log("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter logic
  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catlist-container">

      {/* 🔍 Search Bar */}
      <div className="catlist-search-wrapper">
        <div className="catlist-search-box">
          <span className="catlist-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search category..."
            className="catlist-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category List */}
      <div className="catlist-grid">
        {filtered.length === 0 ? (
          <p className="no-data">No categories found</p>
        ) : (
          filtered.map((cat) => (
            <div key={cat._id} className="cat-item">
              <img
                src={cat.image || "https://via.placeholder.com/100"}
                alt=""
                className="cat-thumb"
              />
              <p className="cat-name">{cat.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
