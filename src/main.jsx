import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/home.page.jsx";
import LoginPage from "./pages/login.page.jsx";
import RegisterPage from "./pages/register.page.jsx";
import DashboardPage from "./pages/dashboard.page.jsx";
import ProfilePage from "./pages/profile.page.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta Home - publică */}
        <Route path="/" element={<HomePage />} />

        {/* Rute de autentificare - publice, dar inaccesibile dacă user-ul e deja logat */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Dashboard - privat */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Profile - public */}
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  </StrictMode>
);
