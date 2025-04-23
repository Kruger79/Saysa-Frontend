import React from 'react';

export default function ProductoCard({ producto }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={producto.ImagenUrl} alt={producto.Nombre} />
      </div>
      <div className="card-body">
        <div>
          <h3 className="card-title">{producto.Nombre}</h3>
          <p className="card-desc">{producto.Descripcion}</p>
          <p className="card-price">₡{producto.Precio.toLocaleString('es-CR')}</p>
        </div>
        
        {producto.Activo ? (
          <button className="card-button">+ Agregar</button>
        ) : (
          <button className="card-button" disabled>No disponible</button>
        )}
      </div>
    </div>
  );
}