import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTachometerAlt,
  FaChevronDown,
  FaUserFriends,
  FaBoxOpen,
  FaStore,
} from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../../public/logo-saysa.png";
import "../../public/css/Navbar.css";
import BananoLoader from "./BananoLoader";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const adminMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const rol = usuario?.Rol;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setCargando(true);

    toast.success("Sesión cerrada correctamente ✅, Gracias por visitarnos", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 2500);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
        setShowAdminMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (!e.target.closest(".navbar")) {
        setShowMobileMenu(false);
      }
    };

    const handleScroll = () => {
      setShowAdminMenu(false);
      setShowUserMenu(false);
      setShowMobileMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowAdminMenu(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const actualizarCantidad = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
      setCantidadCarrito(total);
    };
    actualizarCantidad();
    window.addEventListener("storage", actualizarCantidad);
    window.addEventListener("carritoActualizado", actualizarCantidad);
    return () => {
      window.removeEventListener("storage", actualizarCantidad);
      window.removeEventListener("carritoActualizado", actualizarCantidad);
    };
  }, []);

  // Auto logout tras 5 minutos de inactividad
  useEffect(() => {
    const tiempoLimite = 5 * 60 * 1000; // 5 minutos
    const claveUltimoMovimiento = "ultimoMovimiento";
    const ahora = Date.now();

    // Verifica si ya expiró la sesión ANTES de hacer cualquier cosa
    const ultimoMovimiento = parseInt(
      localStorage.getItem(claveUltimoMovimiento),
      10
    );
    if (!isNaN(ultimoMovimiento) && ahora - ultimoMovimiento > tiempoLimite) {
      localStorage.removeItem("usuario");
      localStorage.removeItem(claveUltimoMovimiento);
    }

    let timeout;

    const cerrarSesionPorInactividad = () => {
      localStorage.removeItem("usuario");
      localStorage.removeItem(claveUltimoMovimiento);
      toast.info("Sesión cerrada por inactividad");
      setCargando(true);
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 2000);
    };

    const resetTimer = () => {
      const ahora = Date.now();
      localStorage.setItem(claveUltimoMovimiento, ahora.toString());
      clearTimeout(timeout);
      timeout = setTimeout(cerrarSesionPorInactividad, tiempoLimite);
    };

    // Inicia el temporizador
    timeout = setTimeout(cerrarSesionPorInactividad, tiempoLimite);
    const eventos = ["mousemove", "keydown", "click", "scroll"];
    eventos.forEach((ev) => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      eventos.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, []);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Logo" height="40" className="rounded-circle" />
            <span>Soluciones SaYSa</span>
          </Link>
        </div>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FaBars className="icon-white" />
        </button>

        <div
          className={`collapse navbar-collapse justify-content-between ${
            showMobileMenu
              ? "show d-flex flex-column flex-lg-row mt-3 mt-lg-0"
              : ""
          }`}
        >
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 ms-lg-4">
            {rol === "admin" && (
              <div className="position-relative" ref={adminMenuRef}>
                <button
                  className="nav-link d-flex align-items-center gap-2 text-white border-0 bg-transparent"
                  onClick={() => {
                    setShowAdminMenu(!showAdminMenu);
                    setShowUserMenu(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {location.pathname === "/admin" ? (
                    <FaTachometerAlt />
                  ) : location.pathname === "/admin/usuarios" ? (
                    <FaUserFriends />
                  ) : location.pathname === "/admin/productos" ? (
                    <FaBoxOpen />
                  ) : (
                    <FaTachometerAlt />
                  )}

                  {location.pathname === "/admin" ? (
                    <span className="text-info fw-bold">Gestion</span>
                  ) : location.pathname === "/admin/usuarios" ? (
                    <span className="text-info fw-bold">Usuarios</span>
                  ) : location.pathname === "/admin/productos" ? (
                    <span className="text-info fw-bold">Productos</span>
                  ) : (
                    <span className="text-white">Admin</span>
                  )}

                  <FaChevronDown
                    className={`transition ${
                      showAdminMenu ? "rotate-180" : ""
                    }`}
                    style={{ fontSize: "0.8rem" }}
                  />
                </button>

                {showAdminMenu && (
                  <ul
                    className="menu-admin position-absolute mt-2 z-3 bg-dark"
                    style={{ minWidth: 200 }}
                  >
                    {location.pathname !== "/admin" && (
                      <li>
                        <Link
                          to="/admin"
                          className={`dropdown-item text-white d-flex justify-content-between ${
                            isActive("/admin") ? "active" : ""
                          }`}
                          onClick={() => setShowAdminMenu(false)}
                        >
                          Gestion <FaTachometerAlt />
                        </Link>
                      </li>
                    )}
                    {location.pathname !== "/admin/usuarios" && (
                      <li>
                        <Link
                          to="/admin/usuarios"
                          className={`dropdown-item text-white d-flex justify-content-between ${
                            isActive("/admin/usuarios") ? "active" : ""
                          }`}
                          onClick={() => setShowAdminMenu(false)}
                        >
                          Usuarios <FaUserFriends />
                        </Link>
                      </li>
                    )}
                    {location.pathname !== "/admin/productos" && (
                      <li>
                        <Link
                          to="/admin/productos"
                          className={`dropdown-item text-white d-flex justify-content-between ${
                            isActive("/admin/productos") ? "active" : ""
                          }`}
                          onClick={() => setShowAdminMenu(false)}
                        >
                          Productos <FaBoxOpen />
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </div>
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
              className={`nav-link d-flex align-items-center gap-2 ${
                isActive("/Products") ? "active text-info" : "text-white"
              }`}
            >
              <FaStore /> <span>Catálogo</span>
            </Link>
          </div>

          <div className="d-flex gap-3 mt-3 mt-lg-0 align-items-center justify-content-end">
            {rol !== "admin" && (
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/carrito")}
              >
                <FaShoppingCart size={24} className="icon-hover icon-white" />
                {cantidadCarrito > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cantidadCarrito}
                  </span>
                )}
              </div>
            )}

            <div className="position-relative" ref={userMenuRef}>
              <FaUserCircle
                size={26}
                className="icon-hover icon-white"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowAdminMenu(false);
                }}
                style={{ cursor: "pointer" }}
              />
              {showUserMenu && (
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

      {cargando && <BananoLoader />}
    </nav>
  );
}
