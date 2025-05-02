import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      toast.warning("El carrito está vacío.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      toast.warning("Debe iniciar sesión para confirmar el pedido.");
      return;
    }

    // Armamos el mensaje para WhatsApp
    const mensajeProductos = carrito
      .map((item, index) => `🔹 ${item.Nombre} - $${item.Precio}`)
      .join("%0A");
    const mensajeFinal = `¡Hola!%0AQuiero realizar un pedido con los siguientes productos:%0A${mensajeProductos}`;
    const numeroWhatsapp = "50689864016";

    // Creamos cotización en el backend
    const cotizacion = {
      cedula: usuario.Cedula,
      productos: carrito.map((p) => ({
        idProducto: p.IdProducto,
        cantidad: 1,
      })),
    };

    try {
      await fetch("http://localhost:3000/api/v1/cotizaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cotizacion),
      });

      toast.success("¡Cotización enviada y guardada con éxito!");
      vaciarCarrito();

      // Abrir WhatsApp
      window.open(`https://wa.me/${numeroWhatsapp}?text=${mensajeFinal}`, "_blank");
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      toast.error("Hubo un error al guardar la cotización.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h1 className="text-center mb-4">Mi Carrito</h1>

        {carrito.length === 0 ? (
          <p className="text-center">No hay productos en el carrito.</p>
        ) : (
          <>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.ImagenUrl}
                        alt={item.Nombre}
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.Nombre}</td>
                    <td>${item.Precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button onClick={vaciarCarrito} className="btn btn-danger">
                Vaciar carrito
              </button>
              <button onClick={confirmarPedido} className="btn btn-success">
                Confirmar pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
