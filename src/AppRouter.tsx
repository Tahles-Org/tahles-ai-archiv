// src/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SupplierRegistrationPage from "./pages/SupplierRegistrationPage";
import NotFound from "./pages/NotFound";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/supplier-registration" element={<SupplierRegistrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
