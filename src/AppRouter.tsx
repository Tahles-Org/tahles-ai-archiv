// src/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* future routes can go here */}
        <Route path="*" element={<div>404 - דף לא נמצא</div>} />
      </Routes>
    </Router>
  );
}
