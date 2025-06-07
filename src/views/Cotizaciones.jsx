import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../../public/css/Cotizaciones.css";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    async function cargarCotizaciones() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/cotizaciones/${usuario.Cedula}`
        );
        const data = await response.json();
        setCotizaciones(data);
      } catch (error) {
        console.error("Error al cargar cotizaciones:", error);
      }
    }

    cargarCotizaciones();
  }, []);

  // ✅ Sumar total desde el frontend si viene null
  const calcularTotal = (detalle = []) => {
    if (!detalle || detalle.length === 0) return 0;
    return detalle.reduce(
      (sum, item) => sum + (item.Cantidad * item.Precio || 0),
      0
    );
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 className="mb-4 text-center">Mis Cotizaciones</h2>
        {usuario && (
          <div className="cotizaciones-cliente">
            <p>
              <strong>Cliente:</strong> {usuario.Nombre}
            </p>
            <p>
              <strong>Cédula:</strong> {usuario.Cedula}
            </p>
          </div>
        )}

        {cotizaciones.length === 0 ? (
          <p className="text-center">No hay cotizaciones registradas aún.</p>
        ) : (
          <div className="table-wrapper">
            <table className="cotizaciones-table">
              <thead>
                <tr>
                  <th>ID Cotización</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cotizaciones.map((coti) => (
                  <tr key={coti.IdCotizacion}>
                    <td>{coti.IdCotizacion}</td>
                    <td>
                      {new Date(coti.FechaSolicitud).toLocaleDateString()}
                    </td>
                    <td>{coti.Estado}</td>
                    <td>₡{coti.Total ?? calcularTotal(coti.Detalles)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
