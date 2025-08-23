import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import ContactPage from "./pages/ContactPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;