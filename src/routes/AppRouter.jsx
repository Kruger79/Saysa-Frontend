import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Perfil from "../views/Perfil";
import Products from "../views/Products";
import AdminDashboard from "../views/AdminDashboard";
import Usuarios from "../views/Usuarios";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}
