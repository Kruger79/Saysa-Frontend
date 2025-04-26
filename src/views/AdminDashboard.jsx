import React from 'react';
import '../../public/css/AdminDashboard.css';
import { FaSearch } from 'react-icons/fa';
import NavbarAdmin from '../components/Navbar';

export default function AdminDashboard() {
  const pedidosRecientes = [
    { id: '1001', fecha: '24/04/2024', cliente: 'Finca Los Pinos', estado: 'Pendiente' },
    { id: '1990', fecha: '22/04/2024', cliente: 'Finca El Valle', estado: 'Completo' },
    { id: '0999', fecha: '20/04/2024', cliente: 'Finca La Esperanza', estado: 'Pendiente' },
    { id: '0998', fecha: '18/04/2024', cliente: 'Finca Los Pinos', estado: 'Completo' },
    { id: '0997', fecha: '17/04/2024', cliente: 'Finca Santa Marta', estado: 'Pendiente' },
  ];

  return (
    <div className="admin-dashboard">
      <NavbarAdmin />

      <div className="admin-container">
        <h1 className="admin-title">Vista de administrador</h1>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Pedidos pendientes</h3>
            <p className="stat-number">5</p>
          </div>
          <div className="stat-card">
            <h3>Cotizaciones del mes</h3>
            <p className="stat-number">12</p>
          </div>
        </div>

        <h2 className="section-title">Pedidos recientes</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidosRecientes.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.cliente}</td>
                <td>
                  <span className={`badge ${pedido.estado.toLowerCase()}`}>{pedido.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="busqueda">
          <h3>Buscar cotizaciones</h3>
          <div className="search-bar">
            <input type="text" placeholder="Buscar cotizaciones..." />
            <button><FaSearch /></button>
          </div>
        </div>
      </div>
    </div>
  );
}