import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/usuarios";
import "../../public/css/Login.css";
import logo from "../../public/logo-saysa.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const [correoOCedula, setCorreoOCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correoOCedula || !contrasena) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const data = await loginUsuario(correoOCedula, contrasena);
      console.log("🔐 Usuario logueado:", data);
      localStorage.setItem("usuario", JSON.stringify(data));

      toast.success('Inicio de sesión exitoso');

      // Redirigir según el rol
      setTimeout(() => {
        if (data.Rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setLoading(false);
      }, 1200); // 1.5 segundos
    } catch (err) {
      const mensaje = err.response?.data?.error || "Correo o contraseña incorrectos";
      toast.error(mensaje);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo Soluciones SaYSa" className="login-logo" />
        <h2>Bienvenido a Soluciones SaYSa</h2>
        <p className="login-subtitle">
          Por favor, inicia sesión para continuar
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cédula o correo"
            className="login-input"
            value={correoOCedula}
            onChange={(e) => setCorreoOCedula(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`login-button ${loading ? "disabled-button" : ""}`}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Iniciar Sesión"}
          </button>
          {error && <p className="login-error">{error}</p>}
        </form>

        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
