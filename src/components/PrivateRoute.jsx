// src/components/PrivateRoute.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRoute({ children, requireAdmin = false }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const location = useLocation();

  // Evitar múltiples toasts en cada render
  useEffect(() => {
    if (!usuario) {
      toast.warning("Debes iniciar sesión para acceder", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (requireAdmin && usuario.Rol !== "admin") {
      toast.error("Acceso denegado: se requiere rol administrador", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }, []);

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && usuario.Rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}