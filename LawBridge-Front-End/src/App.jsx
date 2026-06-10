import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LawyerProfileSetup from "./pages/LawyerProfile/LawyerProfileSetup";
import Home from "./pages/Home/Home";
import LawyerDetails  from "./pages/LawyerDetails/LawyerDetails";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  return (
    <Routes>
  {/* Login */}
      <Route path="/login" element={<Login />} />
  {/* Register */}
      <Route path="/register" element={<Register />} />

      <Route path="/setup-profile" element={<LawyerProfileSetup />} />

      <Route path="/home" element={<Home />} />

      <Route path="/lawyers/:id" element={<LawyerDetails />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/*If you open the empty link it will take you to the login*/}
      <Route path="/" element={<Navigate to="/login" />} />
      
    </Routes>
  );
}

export default App;