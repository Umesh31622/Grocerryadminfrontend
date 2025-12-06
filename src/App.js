
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Brokers from "./pages/admin/Brokers";
import Transactions from "./pages/admin/Transactions";
import Settings from "./pages/admin/Settings";
import PriceList from "./pages/PriceList";
import CategoryManager from "./pages/admin/CategoryManager";
import PriceAnalytics from "./pages/admin/PriceAnalytics";
import ProductList from "./pages/admin/ProductList";
import CategoryList from "./pages/admin/CategoryList";
import DescriptionManager from "./pages/admin/DescriptionManager";
import HistoryList from "../src/pages/admin/HistoryList";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="brokers" element={<Brokers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="CategoryManager" element={<CategoryManager />} />
          <Route path="pricelist" element={<PriceList />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="priceanalytics" element={<PriceAnalytics />} />
          <Route path="categorylist" element={<CategoryList />} />
          <Route path="descriptionmanager" element={<DescriptionManager />} />
          <Route path="historylist" element={<HistoryList />} />
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
