import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/home";
import OrganPages from "./pages/organ";
import BloodPages from "./pages/blood";
import NotFound from "./pages/NotFoundPage";
import AuthenticationPage from "./pages/auth/AuthenticationPage";
import AboutPage from "./pages/about/AboutPage"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blood" element={<BloodPages />} />
        <Route path="/organ" element={<OrganPages />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
