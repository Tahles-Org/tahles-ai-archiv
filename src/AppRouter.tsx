import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SupplierRegistrationPage from "@/pages/SupplierRegistrationPage"
import HomePage from "@/pages/HomePage"

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/supplier" element={<SupplierRegistrationPage />} />
      </Routes>
    </Router>
  )
}