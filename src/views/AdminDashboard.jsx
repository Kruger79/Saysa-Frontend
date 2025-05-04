import React, { useEffect, useState } from "react";
import "../../public/css/AdminDashboard.css";
import { FaSearch, FaTachometerAlt, FaUsers, FaBoxOpen } from "react-icons/fa";
import NavbarAdmin from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";

export default function AdminDashboard() {
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/pedidos");
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    }

    fetchPedidos();
  }, []);

  const isActive = (path) => location.pathname === path;

  const formatearFecha = (fecha) => {
    const f = new Date(fecha);
    return isNaN(f)
      ? "Fecha inválida"
      : `${f.getDate().toString().padStart(2, "0")}/${(f.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${f.getFullYear()}`;
  };

  return (
    <div className="admin-dashboard">
      <NavbarAdmin />

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <ul className="sidebar-menu">
            <li>
              <Link
                to="/admin"
                className={`sidebar-link ${isActive("/admin") ? "active-link" : ""}`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/usuarios"
                className={`sidebar-link ${isActive("/admin/usuarios") ? "active-link" : ""}`}
              >
                <FaUsers /> Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/admin/productos"
                className={`sidebar-link ${isActive("/admin/productos") ? "active-link" : ""}`}
              >
                <FaBoxOpen /> Productos
              </Link>
            </li>
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="admin-container">
          <h1 className="admin-title">Vista de administrador</h1>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Pedidos pendientes</h3>
              <p className="stat-number">{pedidos.length}</p>
            </div>
            <div className="stat-card">
              <h3>Cotizaciones del mes</h3>
              <p className="stat-number">12</p>
            </div>
          </div>

          <h2 className="section-title">Pedidos recientes</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Cédula</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.IdPedido}>
                  <td>{pedido.IdPedido}</td>
                  <td>{formatearFecha(pedido.FechaPedido)}</td>
                  <td>{pedido.NombreCliente}</td>
                  <td>{pedido.Cedula}</td>
                  <td>
                    <span className="badge badge-success">Confirmado</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="busqueda">
            <h3>Buscar cotizaciones</h3>
            <div className="search-bar">
              <input type="text" placeholder="Buscar cotizaciones..." />
              <button>
                <FaSearch />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
