import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../../public/css/Cotizaciones.css";
import PinaLoader from "../components/PinaLoader";
import ReactPaginate from "react-paginate";
import "../../public/css/ReactPaginate.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Cotizaciones() {
  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 10;
  const [cargandoPagina, setCargandoPagina] = useState(false);
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    async function cargarCotizaciones() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/cotizaciones/${usuario.Cedula}`
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

  const offset = paginaActual * itemsPorPagina;
  const cotizacionesPaginadas = cotizaciones.slice(
    offset,
    offset + itemsPorPagina
  );
  const totalPaginas = Math.ceil(cotizaciones.length / itemsPorPagina);

  const handlePageClick = ({ selected }) => {
    setCargandoPagina(true);

    setTimeout(() => {
      setPaginaActual(selected); // ✅ se actualiza después de la animación
      setCargandoPagina(false);
    }, 1500); // puedes ajustar el tiempo según lo que dure tu piña
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin definir";
    const [año, mes, dia] = fecha.split("T")[0].split("-");
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
  };

  if (cargandoPagina) {
    return <PinaLoader />;
  }

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
                  <th>Fecha De Solicitud</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Fecha De Entrega</th>
                </tr>
              </thead>
              <tbody>
                {cotizacionesPaginadas.map((coti) => (
                  <tr key={coti.IdCotizacion}>
                    <td>{coti.IdCotizacion}</td>
                    <td>{formatearFecha(coti.FechaSolicitud)}</td>
                    <td>{coti.Estado}</td>
                    <td>₡{coti.Total ?? calcularTotal(coti.Detalles)}</td>
                    <td>
                      {coti.Detalles?.find((d) => d.TiempoEntrega)
                        ?.TiempoEntrega
                        ? new Date(
                            coti.Detalles.find((d) => d.TiempoEntrega)
                              .TiempoEntrega + "T12:00:00"
                          ).toLocaleDateString("es-CR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Sin definir"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 📄 Paginación */}
        <ReactPaginate
          previousLabel={
            <span className="d-flex align-items-center gap-2 text-success">
              <FaArrowLeft />
              <span className="texto-paginacion">Anterior</span>
            </span>
          }
          nextLabel={
            <span className="d-flex align-items-center gap-2 text-success">
              <span className="texto-paginacion">Siguiente</span>
              <FaArrowRight />
            </span>
          }
          breakLabel={"..."}
          pageCount={totalPaginas}
          onPageChange={handlePageClick}
          forcePage={paginaActual}
          containerClassName={"paginacion"}
          pageClassName={"pagina"}
          pageLinkClassName={"pagina-link"}
          activeClassName={"activa"}
          previousClassName={"pagina"}
          nextClassName={"pagina"}
          disabledClassName={"deshabilitada"}
        />
      </div>
    </div>
  );
}
