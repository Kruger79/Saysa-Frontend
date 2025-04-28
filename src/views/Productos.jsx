import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { crearPedido } from "../api/pedidos"; // Este lo creamos antes

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
      alert("El carrito está vacío.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      alert("Debe iniciar sesión para confirmar el pedido.");
      return;
    }

    const pedidoData = {
      cedula: usuario.Cedula, // Cambia si tu backend pide otro campo
      productos: carrito.map((item) => ({
        idProducto: item.IdProducto,
        cantidad: 1, // Podrías mejorar luego con cantidades dinámicas
      })),
    };

    try {
      await crearPedido(pedidoData);
      alert("¡Pedido enviado con éxito!");
      vaciarCarrito();
    } catch (error) {
      alert("Error al enviar el pedido. Intente nuevamente.");
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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
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
                Confirmar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
