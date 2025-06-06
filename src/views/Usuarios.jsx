import React, { useEffect, useState } from "react";
import NavbarAdmin from "../components/Navbar";
import "../../public/css/Usuarios.css";
import { FaUserPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { obtenerUsuarios, actualizarRolUsuario } from "../api/usuarios";
import SidebarAdmin from "../components/SidebarAdmin";
import ReactPaginate from "react-paginate";
import "../../public/css/ReactPaginate.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoPedidoId, seteditandoPedidoId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 6;

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
  const usuariosPaginados = usuarios.slice(offset, offset + itemsPorPagina);
  const totalPaginas = Math.ceil(usuarios.length / itemsPorPagina);

  const handlePageClick = ({ selected }) => {
    setPaginaActual(selected);
  };

  return (
    <div className="usuarios-page">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Usuarios Registrados</h1>
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
                <td>{usuario.Nombre}</td>
                <td>{usuario.Correo}</td>
                <td>{usuario.Cedula}</td>
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

        {/* ✅ Paginación */}
        <ReactPaginate
          previousLabel={
            <span className="d-flex align-items-center gap-2 text-success">
              <FaArrowLeft /> Anterior
            </span>
          }
          nextLabel={
            <span className="d-flex align-items-center gap-2 text-success">
              Siguiente <FaArrowRight />
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
