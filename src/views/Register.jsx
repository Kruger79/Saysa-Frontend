import React, {useState} from 'react';
import { registrarUsuario } from '../api/usuarios';
import {useNavigate} from 'react-router-dom';
import '../../public/css/Register.css';
import logo from '../../public/logo-saysa.png';

export default function Register() {
  const navigate = useNavigate();

  // Estado para los datos
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    contrasena: ''
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await registrarUsuario(formData);
      setMensaje('¡Registro exitoso!');
      navigate('/login'); // 👈 Después del registro, mandar al login
    } catch (err) {
      setError(err);
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
          <button type="submit" className="register-button">Registrarse</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        </form>

        <p className="register-footer">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}