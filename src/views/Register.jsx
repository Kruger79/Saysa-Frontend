import React, { useState } from "react";
import { registrarUsuario } from "../api/usuarios";
import { useNavigate } from "react-router-dom";
import "../../public/css/Register.css";
import { toast } from "react-toastify";
import logo from "../../public/logo-saysa.png";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estado para los datos
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registrarUsuario(formData);
      toast.success("✅ ¡Usuario registrado exitosamente!");
      setFormData({
        nombre: "",
        cedula: "",
        correo: "",
        telefono: "",
        contrasena: "",
      });

      // Redirige al login después de 1.5 segundos
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 1200); // 1.5 segundos
    } catch (error) {
      const mensaje =
        error.response?.data?.error || "Error al registrar usuario";
      toast.error(mensaje);
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img src={logo} alt="Logo SaYSa" className="register-logo" />
        <h2>Crear una cuenta</h2>
        <p className="register-subtitle">Llena los datos para registrarte</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            className="register-input"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            className="register-input"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            className="register-input"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            className="register-input"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            className="register-input"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`login-button ${loading ? "disabled-button" : ""}`}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Registrarse"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        </form>

        <p className="register-footer">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
