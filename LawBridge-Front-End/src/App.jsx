import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


function App() {
  return (
    <Routes>
  {/* Login */}
      <Route path="/login" element={<Login />} />
  {/* Register */}
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<h1>Forgot Password</h1>} />

      {/*If you open the empty link it will take you to the login*/}
      <Route path="/" element={<Navigate to="/login" />} />
      
    </Routes>
  );
}

export default App;