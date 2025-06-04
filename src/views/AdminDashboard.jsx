import React, { useEffect, useState } from "react";
import "../../public/css/AdminDashboard.css";
import {
  FaSearch,
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaEdit,
  FaCheck,
} from "react-icons/fa";
import NavbarAdmin from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { toast } from 'react-toastify';


export default function AdminDashboard() {
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);
  const [editandoPedidoId, setEditandoPedidoId] = useState(null);
  const [estadosTemporales, setEstadosTemporales] = useState({});
  const [busqueda, setBusqueda] = useState(""); // 1. Estado para búsqueda

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

  const actualizarEstadoCotizacion = async (idCotizacion, nuevoEstado) => {
    try {
      await fetch(`http://localhost:3000/api/v1/cotizaciones/${idCotizacion}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      setPedidos((prev) =>
        prev.map((p) =>
          p.IdCotizacion === idCotizacion ? { ...p, Estado: nuevoEstado } : p
        )
      );

      toast.success(`Estado actualizado a "${nuevoEstado}"`);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      toast.error("Error al actualizar el estado");
    }
  };

  const isActive = (path) => location.pathname === path;

  const formatearFecha = (fecha) => {
    const f = new Date(fecha);
    return isNaN(f)
      ? "Fecha inválida"
      : `${f.getDate().toString().padStart(2, "0")}/${(f.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${f.getFullYear()}`;
  };

  // 2. Filtrar pedidos por nombre o cédula si hay búsqueda
  const pedidosFiltrados = busqueda
    ? pedidos.filter((pedido) =>
        (pedido.NombreCliente?.toLowerCase().includes(busqueda.toLowerCase()) ||
         pedido.Cedula?.toString().includes(busqueda))
      )
    : pedidos;

  return (
    <div className="admin-dashboard">
      <NavbarAdmin />
      <div className="admin-body">
        <aside className="admin-sidebar">
          <ul className="sidebar-menu">
            <li>
              <Link
                to="/admin"
                className={`sidebar-link ${
                  isActive("/admin") ? "active-link" : ""
                }`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/usuarios"
                className={`sidebar-link ${
                  isActive("/admin/usuarios") ? "active-link" : ""
                }`}
              >
                <FaUsers /> Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/admin/productos"
                className={`sidebar-link ${
                  isActive("/admin/productos") ? "active-link" : ""
                }`}
              >
                <FaBoxOpen /> Productos
              </Link>
            </li>
          </ul>
        </aside>

        <main className="admin-container">
          <h1 className="admin-title">Vista de administrador</h1>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Pedidos pendientes</h3>
              <p className="stat-number">
                {
                  pedidos.filter(
                    (p) =>
                      p.Estado === "Pendiente" ||
                      p.Estado === "pendiente" ||
                      p.Estado === "Enviada" ||
                      p.Estado === "enviada"
                  ).length
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Cotizaciones del mes</h3>
              <p className="stat-number">
                {
                  pedidos.filter(
                    (p) =>
                      p.Estado === "Aceptada" ||
                      p.Estado === "aceptada"
                  ).length
                }
              </p>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.IdPedido}>
                  <td>{pedido.IdPedido}</td>
                  <td>{formatearFecha(pedido.FechaPedido)}</td>
                  <td>{pedido.NombreCliente}</td>
                  <td>{pedido.Cedula}</td>

                  {/* ✅ Estado */}
                  <td>
                    {pedido.IdCotizacion ? (
                      pedido.Estado === "Aceptada" ||
                      pedido.Estado === "Rechazada" ? (
                        <span
                          className={`rol-badge ${pedido.Estado.toLowerCase()}`}
                        >
                          {pedido.Estado}
                        </span>
                      ) : editandoPedidoId === pedido.IdPedido ? (
                        <select
                          value={
                            estadosTemporales[pedido.IdPedido] ||
                            pedido.Estado ||
                            "Pendiente"
                          }
                          onChange={(e) =>
                            setEstadosTemporales((prev) => ({
                              ...prev,
                              [pedido.IdPedido]: e.target.value,
                            }))
                          }
                          className="rol-select"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Enviada">Enviada</option>
                          <option value="Aceptada">Aceptada</option>
                          <option value="Rechazada">Rechazada</option>
                        </select>
                      ) : (
                        <span
                          className={`rol-badge ${
                            pedido.Estado?.toLowerCase() || "pendiente"
                          }`}
                        >
                          {pedido.Estado || "Pendiente"}
                        </span>
                      )
                    ) : (
                      <span className="rol-badge sin-estado">Sin estado</span>
                    )}
                  </td>

                  {/* ✅ Acciones */}
                  <td>
                    {pedido.IdCotizacion ? (
                      pedido.Estado === "Aceptada" ||
                      pedido.Estado === "Rechazada" ? (
                        <span className="text-muted">—</span>
                      ) : editandoPedidoId === pedido.IdPedido ? (
                        <button
                          className="btn btn-success"
                          onClick={async () => {
                            const nuevoEstado =
                              estadosTemporales[pedido.IdPedido] ||
                              pedido.Estado;
                            await actualizarEstadoCotizacion(
                              pedido.IdCotizacion,
                              nuevoEstado
                            );
                            setEditandoPedidoId(null);
                          }}
                        >
                          <FaCheck />
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setEditandoPedidoId(pedido.IdPedido);
                            setEstadosTemporales((prev) => ({
                              ...prev,
                              [pedido.IdPedido]: pedido.Estado || "Pendiente",
                            }));
                          }}
                        >
                          <FaEdit />
                        </button>
                      )
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="busqueda">
            <h3>Buscar cotizaciones</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar por nombre o cedula"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
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
