import Navbar from "../components/Navbar";
import ProductoCard from "../components/ProductoCard";
import "../../public/css/Products.css";

import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const data = await obtenerProductos();
      setProductos(data);
    }
    cargarProductos();
  }, []);

  return (
    <div className="productos-page">
      <Navbar />

      <div className="productos-banner">
        <div className="banner-content">
          <h1 className="banner-title">Productos para entrega inmediata</h1>
          <p className="banner-subtitle">
            Estos productos se encuentran en nuestro almacén con cantidades
            limitadas.
          </p>
        </div>
      </div>

      {/* Contenedor de productos */}
      <div className="productos-container">
        {productos.length > 0 ? (
          productos.map((producto, index) => (
            <ProductoCard
              key={producto.IdProducto}
              producto={producto}
              reverse={index % 2 !== 0}
            />
          ))
        ) : (
          <p className="text-center">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
