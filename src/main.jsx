import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/home.page.jsx"
import LoginPage from "./pages/login.page.jsx"
import RegisterPage from "./pages/register.page.jsx"
import DashboardPage from "./pages/dashboard.page.jsx"
import ProfilePage from "./pages/profile.page.jsx"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
       
      </Routes>
    </Router>
  </StrictMode>
);