import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SupplierRegistrationPage from "@/pages/SupplierRegistrationPage"

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/register/supplier" element={<SupplierRegistrationPage />} />
      </Routes>
    </Router>
  )
}