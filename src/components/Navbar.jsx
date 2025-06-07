import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../../public/logo-saysa.png";
import "../../public/css/Navbar.css";
import LoadingOverlay from "./LoadingOverlay";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cargando, setCargando] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const rol = usuario?.Rol;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setCargando(true); // Mostrar pantalla de carga

    toast.success("Sesión cerrada correctamente ✅, Gracias por visitarnos", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 2500);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* IZQUIERDA */}
        <div className="d-flex align-items-center gap-3">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Logo" height="40" className="rounded-circle" />
            <span>Soluciones SaYSa</span>
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (visible en móviles) */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FaBars className="icon-white" />
        </button>

        {/* MENÚ RESPONSIVO */}
        <div
          className={`collapse navbar-collapse justify-content-between ${
            showMobileMenu
              ? "show d-flex flex-column flex-lg-row mt-3 mt-lg-0"
              : ""
          }`}
        >
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 ms-lg-4">
            {rol === "admin" && (
              <Link
                to="/admin"
                className={`nav-link ${
                  isActive("/admin") ? "active text-info" : "text-white"
                }`}
              >
                Dashboard
              </Link>
            )}
            {rol !== "admin" && (
              <Link
                to="/pedidos"
                className={`nav-link ${
                  isActive("/pedidos") ? "active text-info" : "text-white"
                }`}
              >
                Pedidos
              </Link>
            )}
            <Link
              to="/Products"
              className={`nav-link ${
                isActive("/Products") ? "active text-info" : "text-white"
              }`}
            >
              Catálogo
            </Link>
          </div>

          {/* Íconos (carrito + usuario) */}
          <div className="d-flex gap-3 mt-3 mt-lg-0 align-items-center justify-content-end">
            {rol !== "admin" && (
              <FaShoppingCart
                size={24}
                className="icon-hover icon-white"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/carrito")}
              />
            )}

            <div className="position-relative">
              <FaUserCircle
                size={26}
                className="icon-hover icon-white"
                onClick={() => setShowMenu(!showMenu)}
                style={{ cursor: "pointer" }}
              />
              {showMenu && (
                <div
                  className="position-absolute end-0 mt-2 bg-white shadow rounded p-2 z-3"
                  style={{ minWidth: "160px" }}
                >
                  {!usuario ? (
                    <button
                      className="dropdown-item btn w-100 text-start"
                      onClick={() => navigate("/login")}
                    >
                      Iniciar sesión
                    </button>
                  ) : (
                    <>
                      <button
                        className="dropdown-item btn w-100 text-start"
                        onClick={() => navigate("/perfil")}
                      >
                        Mi Perfil
                      </button>
                      <hr className="my-1" />
                      <button
                        className="dropdown-item btn w-100 text-start text-danger"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Animación de carga al cerrar sesión */}
      {cargando && <LoadingOverlay />}
    </nav>
  );
}
