import React, { useEffect, useState } from "react";
import NavbarAdmin from "../components/Navbar";
import "../../public/css/Usuarios.css";
import { FaUserPlus, FaEdit, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { obtenerUsuarios, actualizarRolUsuario } from "../api/usuarios";
import ReactPaginate from "react-paginate";
import "../../public/css/ReactPaginate.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function resaltarCoincidencia(texto, termino) {
  if (!termino) return texto;

  const regex = new RegExp(`(${termino})`, "gi");
  const partes = texto.split(regex);

  return partes.map((parte, i) =>
    parte.toLowerCase() === termino.toLowerCase() ? (
      <span key={i} style={{ backgroundColor: "#ffff00" }}>
        {parte}
      </span>
    ) : (
      parte
    )
  );
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoPedidoId, seteditandoPedidoId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 10;
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        toast.error("Error al cargar usuarios");
      }
    }

    cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    [usuario.Nombre, usuario.Correo, usuario.Cedula]
      .join(" ")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const manejarCambioRol = async (IdUsuario, nuevoRol) => {
    try {
      const usuarioEditado = usuarios.find((u) => u.IdUsuario === IdUsuario);

      if (!usuarioEditado) {
        toast.error("Usuario no encontrado");
        return;
      }

      await actualizarRolUsuario(usuarioEditado.Cedula, nuevoRol);

      const nuevosUsuarios = usuarios.map((usuario) =>
        usuario.IdUsuario === IdUsuario
          ? { ...usuario, Rol: nuevoRol }
          : usuario
      );
      setUsuarios(nuevosUsuarios);
      seteditandoPedidoId(null);
      toast.success("Rol actualizado exitosamente ✅");
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      toast.error("Error al actualizar rol");
    }
  };

  const offset = paginaActual * itemsPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(
    offset,
    offset + itemsPorPagina
  );
  const totalPaginas = Math.ceil(usuariosFiltrados.length / itemsPorPagina);

  const handlePageClick = ({ selected }) => {
    setPaginaActual(selected);
  };

  return (
    <div className="usuarios-page">
      <NavbarAdmin />
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Usuarios Registrados</h1>
        </div>

        <div className="usuarios-busqueda">
          <div className="usuarios-busqueda-container">
            <FaSearch className="usuarios-busqueda-icono" />
            <input
              type="text"
              placeholder="por nombre, correo o cédula"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(0);
              }}
            />
          </div>
        </div>

        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((usuario) => (
              <tr key={usuario.IdUsuario}>
                <td>{resaltarCoincidencia(usuario.Nombre, busqueda)}</td>
                <td>{resaltarCoincidencia(usuario.Correo, busqueda)}</td>
                <td>{resaltarCoincidencia(usuario.Cedula, busqueda)}</td>
                <td>{usuario.Telefono}</td>
                <td>
                  {editandoPedidoId === usuario.IdUsuario ? (
                    <select
                      value={usuario.Rol}
                      onChange={(e) =>
                        manejarCambioRol(usuario.IdUsuario, e.target.value)
                      }
                      className="rol-select"
                    >
                      <option value="cliente">Cliente</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`rol-badge ${usuario.Rol}`}>
                      {usuario.Rol}
                    </span>
                  )}
                </td>
                <td>
                  {editandoPedidoId !== usuario.IdUsuario && (
                    <button
                      className="editar-boton"
                      onClick={() => seteditandoPedidoId(usuario.IdUsuario)}
                    >
                      <FaEdit /> Editar Rol
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tarjetas móviles */}
<div className="usuarios-card-list d-md-none">
  {usuariosPaginados.map((usuario) => (
    <div className="usuario-card" key={usuario.IdUsuario}>
      <h5>{resaltarCoincidencia(usuario.Nombre, busqueda)}</h5>
      <p><strong>Correo:</strong> {resaltarCoincidencia(usuario.Correo, busqueda)}</p>
      <p><strong>Cédula:</strong> {resaltarCoincidencia(usuario.Cedula, busqueda)}</p>
      <p><strong>Teléfono:</strong> {usuario.Telefono}</p>
      {editandoPedidoId === usuario.IdUsuario ? (
        <select
          value={usuario.Rol}
          onChange={(e) => manejarCambioRol(usuario.IdUsuario, e.target.value)}
          className="rol-select"
        >
          <option value="cliente">Cliente</option>
          <option value="admin">Admin</option>
        </select>
      ) : (
        <span className={`rol-badge ${usuario.Rol}`}>{usuario.Rol}</span>
      )}
      {editandoPedidoId !== usuario.IdUsuario && (
        <button
          className="editar-boton"
          onClick={() => seteditandoPedidoId(usuario.IdUsuario)}
        >
          <FaEdit /> Editar Rol
        </button>
      )}
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
          containerClassName={"paginacion"}
          pageClassName={"pagina"}
          pageLinkClassName={"pagina-link"}
          activeClassName={"activa"}
          previousClassName={"pagina"}
          nextClassName={"pagina"}
          disabledClassName={"deshabilitada"}
        />
      </div>
    </div>
  );
}
