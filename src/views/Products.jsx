import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import ProductoCard from "../components/ProductoCard";
import Navbar from "../components/Navbar";
import "../../public/css/Products.css";

// Función para resaltar coincidencias
function resaltarCoincidencia(texto, busqueda) {
  if (!busqueda) return texto;
  if (texto === undefined || texto === null) return "";
  const regex = new RegExp(`(${busqueda})`, "gi");
  return texto.toString().split(regex).map((parte, i) =>
    regex.test(parte) ? <mark key={i}>{parte}</mark> : parte
  );
}

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroPopularidad, setFiltroPopularidad] = useState("todos"); // Nuevo estado

  useEffect(() => {
    async function cargarProductos() {
      const data = await obtenerProductos();
      setProductos(data);
    }
    cargarProductos();
  }, []);

  // Filtrar productos según la búsqueda
  let productosFiltrados = productos.filter((producto) =>
    `${producto.Nombre} ${producto.Descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // Filtrar por popularidad si corresponde
  if (filtroPopularidad === "populares") {
    productosFiltrados = [...productosFiltrados].sort(
      (a, b) => (b.CantidadPedidos || 0) - (a.CantidadPedidos || 0)
    );
  }

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

      {/* Barra de búsqueda y filtro */}
      <div className="container my-4 d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto por nombre o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: 350 }}
        />
        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={filtroPopularidad}
          onChange={(e) => setFiltroPopularidad(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="populares">Más populares</option>
        </select>
      </div>

      {/* Contenedor de productos */}
      <div className="productos-container">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.IdProducto}
              producto={{
                ...producto,
                NombreResaltado: resaltarCoincidencia(producto.Nombre, busqueda),
                DescripcionResaltada: resaltarCoincidencia(
                  producto.Descripcion,
                  busqueda
                ),
              }}
            />
          ))
        ) : (
          <p className="text-center">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
