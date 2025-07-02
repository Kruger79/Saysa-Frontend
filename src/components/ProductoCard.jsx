import "../../public/css/ProductoCard.css";
import { toast } from "react-toastify";

export default function ProductoCard({ producto, reverse }) {
  const agregarAlCarrito = () => {
    let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    const indexExistente = carritoActual.findIndex(
      (item) => item.IdProducto === producto.IdProducto
    );

    if (indexExistente !== -1) {
      // Si ya está, incrementamos la cantidad
      carritoActual[indexExistente].cantidad += 1;
    } else {
      // Si no está, lo agregamos con cantidad 1
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    // 🔔 Notifica al Navbar que el carrito fue actualizado
    window.dispatchEvent(new Event("carritoActualizado"));

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
        <h5 className="nombre">
          {producto.NombreResaltado ?? producto.Nombre}
        </h5>
        <p className="descripcion">
          {producto.DescripcionResaltada ?? producto.Descripcion}
        </p>
        <p className="precio">
          <strong>Precio:</strong> ₡{producto.Precio}
        </p>

        {/* Botón para agregar al carrito */}
        <button className="btn-agregar" onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
