import { useState, useEffect } from "react";
import { obtenerPrecioEnvio } from "../api/configuracion";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [nombreFinca, setNombreFinca] = useState("");
  const [tiempoEntrega, setTiempoEntrega] = useState("5 días");
  const [precioEnvio, setPrecioEnvio] = useState(0);


  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
    cargarPrecioEnvio();
  }, []);

  const cargarPrecioEnvio = async () => {
    try {
      const data = await obtenerPrecioEnvio();
      console.log("👉 Precio recibido:", data); // TEMPORAL PARA VER
      setPrecioEnvio(data.precioEnvio || data.valor || 0); // cobertura para cualquier nombre
    } catch (error) {
      toast.error("Error al obtener costo de envío");
    }
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.Precio * item.cantidad,
      0
    );
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
  
    const productos = carrito.map((item) => ({
      idProducto: item.IdProducto,
      cantidad: item.cantidad,
      precioUnitario: item.Precio,
    }));
  
    try {
      await fetch("http://localhost:3000/api/v1/cotizaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cedula: usuario.Cedula,
          productos,
          nombreFinca,
          tiempoEntrega,
          precioEnvio,
        }),
      });
  
      toast.success("¡Cotización enviada y guardada con éxito!");
      vaciarCarrito();
  
      // ✅ Mensaje con nombres
      const mensaje = carrito
        .map((item) => `🔹 ${item.cantidad} x ${item.Nombre}`)
        .join("%0A");
  
      const numero = "50689864016";
      window.open(`https://wa.me/${numero}?text=Hola!, quisiera realizar un pedido con los siguientes productos:%0A${mensaje}`, "_blank");
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("Error al guardar el pedido.");
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
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.ImagenUrl}
                        alt={item.Nombre}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item.Nombre}</td>
                    <td>₡{item.Precio}</td>
                    <td>{item.cantidad}</td>
                    <td>₡{item.Precio * item.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mb-4">
              <label htmlFor="finca" className="form-label">
                Nombre de la finca (opcional):
              </label>
              <input
                type="text"
                id="finca"
                className="form-control"
                value={nombreFinca}
                onChange={(e) => setNombreFinca(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tiempoEntrega" className="form-label">
                Tiempo estimado de entrega:
              </label>
              <select
                id="tiempoEntrega"
                className="form-select"
                value={tiempoEntrega}
                onChange={(e) => setTiempoEntrega(e.target.value)}
              >
                <option value="5 días">5 días</option>
                <option value="1 semana">1 semana</option>
                <option value="2 semanas">2 semanas</option>
                <option value="3 semanas">3 semanas</option>
              </select>
            </div>

            <h5 className="text-end">Costo de envío: ₡{precioEnvio}</h5>
            <h4 className="text-end mt-2">
              Total: ₡{calcularTotal() + (carrito.length > 0 ? precioEnvio : 0)}
            </h4>

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
