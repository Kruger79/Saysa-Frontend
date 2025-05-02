import "../../public/css/ProductoCard.css";
import { toast } from "react-toastify";

export default function ProductoCard({ producto, reverse }) {
  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    toast.success("Producto agregado al carrito");
  };

  return (
    <div className={`producto-card ${reverse ? "reverse" : ""}`}>
      {/* Imagen del producto */}
      <div className="producto-card-img">
        <img src={producto.ImagenUrl} alt={producto.Nombre} />
      </div>
  

      {/* Información del producto */}
      <div className="producto-card-info">
        <h3 className="producto-nombre">{producto.Nombre}</h3>
        <p className="producto-card-desc">{producto.Descripcion}</p>
        <p className="producto-precio">Precio: ${producto.Precio}</p>

        {/* Botón para agregar al carrito */}
        <button className="producto-boton" onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

