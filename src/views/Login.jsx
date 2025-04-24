import React from 'react';
import '../../public/css/Login.css';
import logo from '../../public/logo-saysa.png';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo Soluciones SaYSa" className="login-logo" />
        <h2>Bienvenido a Soluciones SaYSa</h2>
        <p className="login-subtitle">Por favor, inicia sesión para continuar</p>
        <form className="login-form">
          <input type="text" placeholder="Cédula o correo" className="login-input" />
          <input type="password" placeholder="Contraseña" className="login-input" />
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}