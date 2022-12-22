import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Character from "./pages/Character";
import Register from "./pages/Register";
import Login from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/character/:realm/:name" element={<Character />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot" element={<ForgotPassword />} />
          <Route exact path="/user/:user" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
