import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/css/Perfil.css";
import { actualizarTelefonoUsuario } from "../api/usuarios";
import { FaUserCircle, FaEdit, FaArrowLeft } from "react-icons/fa";

export default function Perfil() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoTelefono, setNuevoTelefono] = useState(usuario?.Telefono || "");
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <div className="perfil-container">
        <p>No has iniciado sesión.</p>
      </div>
    );
  }

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const guardarTelefono = async () => {
    try {
      const cedula = usuario.Cedula;
      await actualizarTelefonoUsuario(cedula, nuevoTelefono);

      // Actualizar también en localStorage
      const usuarioActualizado = { ...usuario, Telefono: nuevoTelefono };
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      cerrarModal();
      window.location.reload();
    } catch (error) {
      console.error("❌ Error al actualizar teléfono:", error);
    }
  };

  return (
    <div className="perfil-container">
      <button className="volver-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </button>
      <div className="perfil-card">
        <div className="perfil-header">
          <FaUserCircle size={80} color="#4f46e5" />
          <h2>{usuario.Nombre}</h2>
          <p className="perfil-rol">
            {usuario.Rol === "admin" ? "Administrador" : "Cliente"}
          </p>
        </div>

        <div className="perfil-info">
          <div className="perfil-item">
            <span className="perfil-label">Correo:</span>
            <span> {usuario.Correo}</span>
          </div>
          <div className="perfil-item editable">
            <span className="perfil-label">Teléfono:</span>
            <span>
              {usuario.Telefono || "No registrado"}
              <FaEdit className="edit-icon" onClick={abrirModal} />
            </span>
          </div>
          <div className="perfil-item">
            <span className="perfil-label">Cédula:</span>
            <span>{usuario.Cedula}</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Teléfono</h3>
            <input
              type="text"
              value={nuevoTelefono}
              onChange={(e) => setNuevoTelefono(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-save" onClick={guardarTelefono}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
