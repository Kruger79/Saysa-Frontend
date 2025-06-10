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
import PrivateRoute from "../components/PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/products" element={<Products />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedidos" element={<Cotizaciones />} />
         <Route
          path="/admin"
          element={
            <PrivateRoute requireAdmin>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute requireAdmin>
              <Usuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <PrivateRoute requireAdmin>
              <AdminProductoCRUD />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
