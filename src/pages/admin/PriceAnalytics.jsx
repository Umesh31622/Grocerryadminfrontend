// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import "./PriceAnalytics.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const API_BASE = "https://grocerrybackend.vercel.app/api";

// const PriceAnalytics = () => {
//   const [loading, setLoading] = useState(true);
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [chartData, setChartData] = useState(null);

//   // Fetch data for dropdowns
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [products, categories] = await Promise.all([
//           axios.get(`${API_BASE}/prices`),
//           axios.get(`${API_BASE}/categories`),
//         ]);
//         setProductList(products.data.data || []);
//         setCategoryList(categories.data.categories || []);
//       } catch (err) {
//         console.error("Dropdown fetch error:", err);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   // Fetch chart data
//   useEffect(() => {
//     const fetchChart = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/prices`);
//         const allPrices = res.data.data || [];

//         // Product data
//         let productFiltered = allPrices;
//         if (selectedProduct) {
//           productFiltered = allPrices.filter(
//             (p) => p.name === selectedProduct
//           );
//         }

//         // Category data
//         let categoryFiltered = allPrices;
//         if (selectedCategory) {
//           categoryFiltered = allPrices.filter(
//             (p) => p.category?.name === selectedCategory
//           );
//         }

//         // Prepare data for chart
//         const labels = productFiltered.map((p) => p.name);
//         const basePrices = productFiltered.map((p) => p.basePrice);
//         const differences = productFiltered.map((p) => p.difference || 0);

//         const categoryBase = categoryFiltered.map((p) => p.basePrice);
//         const categoryDiff = categoryFiltered.map((p) => p.difference || 0);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Base Price (₹)",
//               data: basePrices,
//               backgroundColor: "rgba(0, 123, 255, 0.6)",
//               borderRadius: 8,
//             },
//             {
//               label: "Difference (₹)",
//               data: differences,
//               backgroundColor: "rgba(255, 193, 7, 0.6)",
//               borderRadius: 8,
//             },
//             {
//               label: "Category Avg Price (₹)",
//               data: categoryBase,
//               backgroundColor: "rgba(40, 167, 69, 0.6)",
//               borderRadius: 8,
//             },
//             {
//               label: "Category Difference (₹)",
//               data: categoryDiff,
//               backgroundColor: "rgba(220, 53, 69, 0.6)",
//               borderRadius: 8,
//             },
//           ],
//         });
//       } catch (err) {
//         console.error("Chart data fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChart();
//   }, [selectedProduct, selectedCategory]);

//   return (
//     <div className="analytics-container">
//       <h2 className="analytics-title">📊 Product & Category Analytics</h2>
//       <p className="analytics-subtitle">
//         View price trends and category performance in real-time
//       </p>

//       {/* Filters */}
//       <div className="filter-section">
//         <div className="filter-group">
//           <label>🧃 Product:</label>
//           <select
//             value={selectedProduct}
//             onChange={(e) => setSelectedProduct(e.target.value)}
//           >
//             <option value="">All Products</option>
//             {productList.map((p) => (
//               <option key={p._id} value={p.name}>
//                 {p.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="filter-group">
//           <label>🗂️ Category:</label>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categoryList.map((c) => (
//               <option key={c._id} value={c.name}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="chart-wrapper">
//         {loading ? (
//           <div className="loading">Loading chart...</div>
//         ) : chartData ? (
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: { position: "bottom" },
//                 tooltip: {
//                   callbacks: {
//                     label: (context) =>
//                       `${context.dataset.label}: ₹${context.parsed.y}`,
//                   },
//                 },
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: "Price (₹)",
//                     color: "#333",
//                     font: { size: 14, weight: "bold" },
//                   },
//                 },
//                 x: {
//                   ticks: { color: "#333" },
//                 },
//               },
//             }}
//           />
//         ) : (
//           <div className="no-data">No data available for selection</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PriceAnalytics;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./PriceAnalytics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

      // ✅ Filter by Date Range (using validTill or createdAt)
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        filtered = filtered.filter((item) => {
          const date = new Date(item.validTill || item.createdAt);
          return date >= start && date <= end;
        });
      }

      // ✅ Group data by Date
      const groupedByDate = {};
      filtered.forEach((item) => {
        const dateKey = new Date(
          item.validTill || item.createdAt
        ).toLocaleDateString("en-IN");
        if (!groupedByDate[dateKey]) {
          groupedByDate[dateKey] = [];
        }
        groupedByDate[dateKey].push(item);
      });

      // ✅ Prepare chart arrays
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

      // ✅ Build chart dataset
      setChartData({
        labels,
        datasets: [
          {
            label: "Average Base Price (₹)",
            data: avgBasePrice,
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderRadius: 6,
          },
          {
            label: "Average Difference (₹)",
            data: avgDiff,
            backgroundColor: "rgba(255, 193, 7, 0.6)",
            borderRadius: 6,
          },
          {
            label: "Total Products Count",
            data: totalCount,
            backgroundColor: "rgba(40, 167, 69, 0.6)",
            borderRadius: 6,
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

      {/* 🔹 Filters */}
      <div className="filter-section">
        <div className="filter-group">
          <label>🧃 Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">All Products</option>
            {productList.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>🗂️ Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categoryList.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>📆 From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>➡️ To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button className="btn refresh" onClick={fetchChart}>
          🔄 Apply
        </button>
      </div>

      {/* 🔹 Chart */}
      <div className="chart-wrapper">
        {loading ? (
          <div className="loading">Loading chart...</div>
        ) : chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${context.dataset.label}: ${
                        context.dataset.label.includes("Count")
                          ? context.parsed.y
                          : "₹" + context.parsed.y.toFixed(2)
                      }`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#333" },
                  title: {
                    display: true,
                    text: "Date (by Validity)",
                    color: "#444",
                    font: { weight: "bold" },
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Price / Count",
                    color: "#444",
                    font: { weight: "bold" },
                  },
                },
              },
            }}
          />
        ) : (
          <div className="no-data">No data found for selection.</div>
        )}
      </div>
    </div>
  );
};

export default PriceAnalytics;
