import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/home";
import OrganPages from "./pages/organ";
import BloodPages from "./pages/blood";
import NotFound from "./pages/NotFoundPage";
import UserTypeSelectionPage from "./pages/auth/UserTypeSelectionPage";
import AboutPage from "./pages/about/AboutPage";
import UrgentRequestsPage from "./pages/urgent-requests/UrgentRequestsPage";
import EmergencyRequestPage from "./pages/emergency-request/EmergencyRequestPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/setting/SettingsPage";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import Notifications from "./notifications/NotificationsModal";
import PatientMatches from "./pages/PatientMatches/PatientMatches";
import Chat from "./pages/chat/chat";
import Hospital from "./pages/hospital";
import PatientDashboard from "./pages/patient-dashboard/PatientDashboard";
import DonorDashboard from "./pages/blood/components/DonorDashboard";
import DonorRequestPage from "./pages/DonorRequestPage/DonorRequestPage";

// Authentication Modals (for modals on UserTypeSelectionPage)
// import BloodDonorAuthModal from "./components/auth/BloodDonorAuthModal";
// import OrganDonorAuthModal from "./components/auth/OrganDonorAuthModal";
// import PatientAuthModal from "./components/auth/PatientAuthModal";
// import UserAuthModal from "./components/auth/UserAuthModal";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blood" element={<BloodPages />} />
        <Route path="/organ" element={<OrganPages />} />
        <Route path="/auth" element={<UserTypeSelectionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/urgent-requests" element={<UrgentRequestsPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/hospitals" element={<Hospital />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/donor-request" element={<DonorRequestPage />} />
        {/* Protected Routes - Require Login */}
        <Route
          path="/emergency-request"
          element={
            <ProtectedRoute>
              <EmergencyRequestPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-matches/:patientId"
          element={
            <ProtectedRoute>
              <PatientMatches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
