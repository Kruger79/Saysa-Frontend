import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import ProductoCard from "../components/ProductoCard";
import Navbar from "../components/Navbar";
import "../../public/css/Products.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      const data = await obtenerProductos();
      setProductos(data);
    }
    cargarProductos();
  }, []);

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    `${producto.Nombre} ${producto.Descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-page">
      <Navbar />

      <div className="productos-banner">
        <div className="banner-content">
          <h1 className="banner-title">Productos para entrega inmediata</h1>
          <p className="banner-subtitle">
            Estos productos se encuentran en nuestro almacén con cantidades limitadas.
          </p>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="container my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto por nombre o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Contenedor de productos */}
      <div className="productos-container">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <ProductoCard key={producto.IdProducto} producto={producto} />
          ))
        ) : (
          <p className="text-center">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
