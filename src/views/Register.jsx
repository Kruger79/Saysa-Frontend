import React from 'react';
import '../../public/css/Register.css';
import logo from '../../public/logo-saysa.png';

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-card">
        <img src={logo} alt="Logo SaYSa" className="register-logo" />
        <h2>Crear una cuenta</h2>
        <p className="register-subtitle">Llena los datos para registrarte</p>
        <form className="register-form">
          <input type="text" placeholder="Nombre completo" className="register-input" />
          <input type="text" placeholder="Cédula" className="register-input" />
          <input type="email" placeholder="Correo electrónico" className="register-input" />
          <input type="text" placeholder="Teléfono" className="register-input" />
          <input type="password" placeholder="Contraseña" className="register-input" />
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <p className="register-footer">¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
}