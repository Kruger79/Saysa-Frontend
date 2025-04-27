import React from 'react';

export default function ProductoCard({ producto, reverse }) {
  return (
    <div className={`producto-card ${reverse ? 'reverse' : ''}`}>
      <div className="producto-card-img">
        <img src={producto.ImagenUrl} alt={producto.Nombre} />
      </div>
      <div className="producto-card-info">
        <h3 className="producto-card-title">{producto.Nombre}</h3>
        <p className="producto-card-desc">{producto.Descripcion}</p>
        <p className="producto-card-price">₡{producto.Precio.toLocaleString('es-CR')}</p>
        {producto.Activo ? (
          <button className="producto-card-button">+ Añadir al carrito</button>
        ) : (
          <button className="producto-card-button" disabled>No disponible</button>
        )}
      </div>
    </div>
  );
}
