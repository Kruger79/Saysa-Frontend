import { useState, useEffect } from "react";
import { obtenerPrecioEnvio } from "../api/configuracion";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "../../public/css/Carrito.css"; 

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
      setPrecioEnvio(data.precioEnvio || data.valor || 0);
    } catch (error) {
      toast.error("Error al obtener costo de envío");
    }
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  const actualizarCantidad = (index, nuevaCantidad) => {
    const nuevoCarrito = [...carrito];
    nuevaCantidad = Math.max(1, Math.min(100, nuevaCantidad));
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.Precio * item.cantidad,
      0
    );
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
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
        headers: { "Content-Type": "application/json" },
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

      let mensaje = `Hola!, quisiera realizar un pedido con los siguientes productos:\n\n`;
      carrito.forEach((item) => {
        mensaje += `${item.cantidad} x ${item.Nombre} - ₡${(
          item.Precio * item.cantidad
        ).toLocaleString()}\n`;
      });
      mensaje += `Cliente: ${usuario.Nombre}\n\n`;
      mensaje += `Costo de envío: ₡${precioEnvio.toLocaleString()}\n`;
      mensaje += `Total final: ₡${(
        calcularTotal() + precioEnvio
      ).toLocaleString()}`;

      const numero = "50689864016";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
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
            {/* Vista de tabla para escritorio */}
            <div className="table-responsive d-none d-md-block carrito-table-container">
              <table className="table table-bordered text-center align-middle carrito-table">
                <thead className="table-light">
                  <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={item.ImagenUrl}
                          alt={item.Nombre}
                          className="carrito-img img-fluid"
                        />
                      </td>
                      <td>{item.Nombre}</td>
                      <td>₡{item.Precio}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                            title="Disminuir"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={item.cantidad}
                            onChange={(e) =>
                              actualizarCantidad(index, parseInt(e.target.value) || 1)
                            }
                            className="form-control"
                            style={{ width: "70px", textAlign: "center", fontWeight: "bold" }}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                            title="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₡{(item.Precio * item.cantidad).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarDelCarrito(index)}
                          title="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista tipo tarjeta para móviles */}
            <div className="d-block d-md-none">
              {carrito.map((item, index) => (
                <div key={index} className="card mb-3 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-4 text-center">
                      <img
                        src={item.ImagenUrl}
                        alt={item.Nombre}
                        className="img-fluid carrito-img rounded-start p-2"
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body py-2">
                        <h6 className="card-title">{item.Nombre}</h6>
                        <p className="mb-1">₡{item.Precio}</p>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Cantidad:</small>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={item.cantidad}
                              onChange={(e) =>
                                actualizarCantidad(index, parseInt(e.target.value) || 1)
                              }
                              className="form-control text-center fw-bold"
                              style={{ width: "60px" }}
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">Subtotal:</small>
                          <span className="fw-bold">
                            ₡{(item.Precio * item.cantidad).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-end mt-2">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarDelCarrito(index)}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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

            <h5 className="text-end">
              Costo de envío: ₡{precioEnvio.toLocaleString()}
            </h5>
            <h4 className="text-end mt-2">
              Total: ₡
              {(calcularTotal() + (carrito.length > 0 ? precioEnvio : 0)).toLocaleString()}
            </h4>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                onClick={vaciarCarrito}
                className="btn btn-outline-danger"
              >
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
