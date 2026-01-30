import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/home";
import OrganPages from "./pages/organ";
import BloodPages from "./pages/blood";
import NotFound from "./pages/NotFoundPage";
import AuthenticationPage from "./pages/auth/AuthenticationPage";
import AboutPage from "./pages/about/AboutPage";
import UrgentRequestsPage from "./pages/urgent-requests/UrgentRequestsPage";
import EmergencyRequestPage from "./pages/emergency-request/EmergencyRequestPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/setting/SettingsPage";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* 🔥 MAGIC LINE */}

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blood" element={<BloodPages />} />
        <Route path="/organ" element={<OrganPages />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/urgent-requests" element={<UrgentRequestsPage />} />
        <Route path="/emergency-request" element={<EmergencyRequestPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
