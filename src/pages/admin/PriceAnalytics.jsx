
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./PriceAnalytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE = "https://grocerrybackend.vercel.app/api";

const PriceAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);

  // 🔹 Fetch dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [products, categories] = await Promise.all([
          axios.get(`${API_BASE}/prices`),
          axios.get(`${API_BASE}/categories`),
        ]);
        setProductList(products.data.data || []);
        setCategoryList(categories.data.categories || []);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };
    fetchDropdowns();
  }, []);

  // 🔹 Fetch chart data with date filter
  const fetchChart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/prices`);
      const allPrices = res.data.data || [];

      // ✅ Filter by Product / Category
      let filtered = allPrices;
      if (selectedProduct)
        filtered = filtered.filter((p) => p.name === selectedProduct);
      if (selectedCategory)
        filtered = filtered.filter(
          (p) => p.category?.name === selectedCategory
        );

      // ✅ Filter by Date Range
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        filtered = filtered.filter((item) => {
          const date = new Date(item.validTill || item.createdAt);
          return date >= start && date <= end;
        });
      }

      // ✅ Group by Date
      const groupedByDate = {};
      filtered.forEach((item) => {
        const dateKey = new Date(
          item.validTill || item.createdAt
        ).toLocaleDateString("en-IN");

        if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
        groupedByDate[dateKey].push(item);
      });

      const labels = Object.keys(groupedByDate);

      const avgBasePrice = labels.map((d) => {
        const dayData = groupedByDate[d];
        return (
          dayData.reduce((sum, i) => sum + Number(i.basePrice || 0), 0) /
          dayData.length
        );
      });

      const avgDiff = labels.map((d) => {
        const dayData = groupedByDate[d];
        return (
          dayData.reduce((sum, i) => sum + Number(i.difference || 0), 0) /
          dayData.length
        );
      });

      const totalCount = labels.map((d) => groupedByDate[d].length);

      // 🔹 Multiple Line Datasets
      setChartData({
        labels,
        datasets: [
          {
            label: "Average Base Price (₹)",
            data: avgBasePrice,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255,0.3)",
            tension: 0.3,
            fill: false,
          },
          {
            label: "Average Difference (₹)",
            data: avgDiff,
            borderColor: "#ffc107",
            backgroundColor: "rgba(255,193,7,0.3)",
            tension: 0.3,
            fill: false,
          },
          {
            label: "Total Products Count",
            data: totalCount,
            borderColor: "#28a745",
            backgroundColor: "rgba(40,167,69,0.3)",
            tension: 0.3,
            fill: false,
          },
        ],
      });
    } catch (err) {
      console.error("Chart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [selectedProduct, selectedCategory, startDate, endDate]);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📅 Price History & Analytics</h2>
      <p className="analytics-subtitle">
        Track your product & category price trends over time
      </p>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-group">
          <label>🧃 Product:</label>
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">All Products</option>
            {productList.map((p) => (
              <option key={p._id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>🗂️ Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categoryList.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>📆 From:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="filter-group">
          <label>➡ To:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <button className="btn refresh" onClick={fetchChart}>🔄 Apply</button>
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        {loading ? (
          <div className="loading">Loading chart...</div>
        ) : chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        ) : (
          <div className="no-data">No data found.</div>
        )}
      </div>
    </div>
  );
};

export default PriceAnalytics;
