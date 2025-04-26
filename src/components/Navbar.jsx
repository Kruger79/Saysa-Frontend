import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../public/logo-saysa.png';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rol = usuario?.Rol;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100 shadow-sm">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        
        {/* IZQUIERDA */}
        <div className="d-flex align-items-center gap-4">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Logo" height="40" className="rounded-circle" />
            <span>Soluciones SaYSa</span>
          </Link>
          <div className="d-flex gap-3">
            {rol === 'admin' && (
              <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active text-info' : 'text-white'}`}>
                Dashboard
              </Link>
            )}
            <Link to="/pedidos" className={`nav-link ${isActive('/pedidos') ? 'active text-info' : 'text-white'}`}>
              Pedidos
            </Link>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active text-info' : 'text-white'}`}>
              Catálogo
            </Link>
          </div>
        </div>

        {/* DERECHA - Icono de Usuario */}
        <div className="position-relative">
          <FaUserCircle
            size={26}
            color="white"
            onClick={() => setShowMenu(!showMenu)}
            style={{ cursor: 'pointer' }}
          />
          {showMenu && (
            <div className="position-absolute end-0 mt-2 bg-white shadow rounded p-2 z-3" style={{ minWidth: '160px' }}>
              {!usuario ? (
                <button
                  className="dropdown-item btn w-100 text-start"
                  onClick={() => navigate('/login')}
                >
                  Iniciar sesión
                </button>
              ) : (
                <>
                  <button
                    className="dropdown-item btn w-100 text-start"
                    onClick={() => navigate('/perfil')}
                  >
                    Mi Perfil
                  </button>
                  <hr className="my-1" />
                  <button
                    className="dropdown-item btn w-100 text-start text-danger"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
