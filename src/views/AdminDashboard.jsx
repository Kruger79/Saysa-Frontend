import React, { useEffect, useState } from "react";
import "../../public/css/AdminDashboard.css";
import {
  FaSearch,
  FaEdit,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import NavbarAdmin from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "../../public/css/ReactPaginate.css";
import { Table } from "react-bootstrap";
import PinaLoader from "../components/PinaLoader";

export default function AdminDashboard() {
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);
  const [editandoPedidoId, setEditandoPedidoId] = useState(null);
  const [estadosTemporales, setEstadosTemporales] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("pendiente"); // Cambia "todos" por "pendiente"
  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 10;
  const [cargandoPagina, setCargandoPagina] = useState(false);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`);
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
      await fetch(`${import.meta.env.VITE_API_URL}/cotizaciones/${idCotizacion}`, {
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

  const formatearFecha = (fecha) => {
    const f = new Date(fecha);
    return isNaN(f)
      ? "Fecha inválida"
      : `${f.getDate().toString().padStart(2, "0")}/${(f.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${f.getFullYear()}`;
  };

  function resaltarCoincidencia(texto, busqueda) {
    if (!busqueda) return texto;
    if (texto === undefined || texto === null) return "";
    const regex = new RegExp(`(${busqueda})`, "gi");
    return texto.toString().split(regex).map((parte, i) =>
      regex.test(parte) ? <mark key={i}>{parte}</mark> : parte
    );
  }

  // Filtrar por búsqueda y estado
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideBusqueda =
      !busqueda ||
      pedido.NombreCliente?.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.Cedula?.toString().includes(busqueda);

    const coincideEstado =
      filtroEstado === "todos" || pedido.Estado?.toLowerCase() === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  const offset = paginaActual * itemsPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(
    offset,
    offset + itemsPorPagina
  );
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itemsPorPagina);

  const handlePageClick = ({ selected }) => {
    setCargandoPagina(true);

    setTimeout(() => {
      setPaginaActual(selected); // ✅ se actualiza después de la animación
      setCargandoPagina(false);
    }, 1500); // puedes ajustar el tiempo según lo que dure tu piña
  };

  if (cargandoPagina) {
    return <PinaLoader />;
  }

  return (
    <div className="admin-dashboard">
      <NavbarAdmin />
      <div className="admin-body">
        <main className={`admin-container`}>
          <h1 className="admin-title">Vista de administrador</h1>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Pedidos pendientes</h3>
              <p className="stat-number">
                {
                  pedidos.filter((p) =>
                    ["Pendiente", "pendiente", "Enviada", "enviada"].includes(
                      p.Estado
                    )
                  ).length
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Cotizaciones del mes</h3>
              <p className="stat-number">
                {
                  pedidos.filter((p) =>
                    ["Aceptada", "aceptada"].includes(p.Estado)
                  ).length
                }
              </p>
            </div>
          </div>

          <div
            className="filtros-superiores"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div className="filtro-estado" style={{ margin: 0 }}>
              <label
                htmlFor="filtroEstado"
                style={{ marginRight: 8, fontWeight: 500 }}
              >
                Estado:
              </label>
              <select
                id="filtroEstado"
                value={filtroEstado}
                onChange={(e) => {
                  const nuevoEstado = e.target.value;
                  setCargandoPagina(true);
                  setTimeout(() => {
                    setFiltroEstado(nuevoEstado);
                    setPaginaActual(0);
                    setCargandoPagina(false);
                  }, 1500);
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  background: "#fff",
                }}
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="enviada">Enviada</option>
                <option value="aceptada">Aceptada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </div>
            <div className="busqueda" style={{ flex: 1 }}>
              <form
                className="search-bar"
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "flex", alignItems: "center", gap: 0 }}
              >
                <input
                  type="text"
                  placeholder="Buscar por nombre o cédula"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "6px 12px",
                    borderRadius: "6px 0 0 6px",
                    border: "1px solid #ccc",
                    borderRight: "none",
                    background: "#fff",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "6px 12px",
                    borderRadius: "0 6px 6px 0",
                    border: "1px solid #007bff",
                    background: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>

          <h2 className="section-title">Pedidos recientes</h2>

          <Table bordered hover className="admin-table mb-0">
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
              {pedidosPaginados.map((pedido) => (
                <tr key={pedido.IdPedido}>
                  <td>{pedido.IdPedido}</td>
                  <td>{formatearFecha(pedido.FechaPedido)}</td>
                  <td>{resaltarCoincidencia(pedido.NombreCliente, busqueda)}</td>
                  <td>{resaltarCoincidencia(pedido.Cedula, busqueda)}</td>
                  <td>
                    {pedido.IdCotizacion ? (
                      ["Aceptada", "Rechazada"].includes(pedido.Estado) ? (
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
                  <td>
                    {pedido.IdCotizacion ? (
                      ["Aceptada", "Rechazada"].includes(pedido.Estado) ? (
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
          </Table>

          {/* Tarjetas de pedidos en móviles */}
          <div className="pedido-card-list">
            {pedidosPaginados.map((pedido) => (
              <div className="pedido-card" key={pedido.IdPedido}>
                <p>
                  <strong>Pedido:</strong> {pedido.IdPedido}
                </p>
                <p>
                  <strong>Fecha:</strong> {formatearFecha(pedido.FechaPedido)}
                </p>
                <p>
                  <strong>Cliente:</strong> {resaltarCoincidencia(pedido.NombreCliente, busqueda)}
                </p>
                <p>
                  <strong>Cédula:</strong> {resaltarCoincidencia(pedido.Cedula, busqueda)}
                </p>
                <p>
                  <strong>Estado:</strong>
                  {editandoPedidoId === pedido.IdPedido ? (
                    <select
                      value={
                        estadosTemporales[pedido.IdPedido] || pedido.Estado
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
                      className={`rol-badge ${pedido.Estado?.toLowerCase()}`}
                    >
                      {pedido.Estado || "Pendiente"}
                    </span>
                  )}
                </p>
                <div className="pedido-acciones">
                  {["Aceptada", "Rechazada"].includes(pedido.Estado) ? (
                    <span className="text-muted">—</span>
                  ) : editandoPedidoId === pedido.IdPedido ? (
                    <button
                      className="btn btn-success"
                      onClick={async () => {
                        const nuevoEstado =
                          estadosTemporales[pedido.IdPedido] || pedido.Estado;
                        await actualizarEstadoCotizacion(
                          pedido.IdCotizacion,
                          nuevoEstado
                        );
                        setEditandoPedidoId(null);
                      }}
                    >
                      <FaCheck /> Guardar
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
                      <FaEdit /> Editar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 📄 Paginación */}
          <ReactPaginate
            previousLabel={
              <span className="d-flex align-items-center gap-2 text-success">
                <FaArrowLeft />
                <span className="texto-paginacion">Anterior</span>
              </span>
            }
            nextLabel={
              <span className="d-flex align-items-center gap-2 text-success">
                <span className="texto-paginacion">Siguiente</span>
                <FaArrowRight />
              </span>
            }
            breakLabel={"..."}
            pageCount={totalPaginas}
            onPageChange={handlePageClick}
            forcePage={paginaActual}
            containerClassName={"paginacion"}
            pageClassName={"pagina"}
            pageLinkClassName={"pagina-link"}
            activeClassName={"activa"}
            previousClassName={"pagina"}
            nextClassName={"pagina"}
            disabledClassName={"deshabilitada"}
          />
        </main>
      </div>
    </div>
  );
}
