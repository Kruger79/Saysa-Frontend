import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Perfil from "../views/Perfil";
import Products from "../views/Products";
import AdminDashboard from "../views/AdminDashboard";
import Usuarios from "../views/Usuarios";
import Carrito from "../views/Carrito";
import Cotizaciones from "../views/Cotizaciones";
import AdminProductoCRUD from "../views/AdminProductoCRUD";

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
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedidos" element={<Cotizaciones />} />
        <Route path="/admin/productos" element={<AdminProductoCRUD />} />
      </Routes>
    </BrowserRouter>
  );
}
