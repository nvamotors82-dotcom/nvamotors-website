import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import ContactPage from "./pages/ContactPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import PromotionsPage from "./pages/PromotionsPage";
import FAQPage from "./pages/FAQPage";
import { Toaster } from "./components/ui/toaster";
import WhatsAppChat from "./components/WhatsAppChat";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;