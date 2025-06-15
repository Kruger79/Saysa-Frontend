import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import { toast } from "react-toastify";
import NavbarAdmin from "../components/Navbar";
import { Button, Table } from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import ModalAgregarProducto from "../components/ModalAgregarProducto";
import ModalEditarProducto from "../components/ModalEditarProducto";
import ModalEliminarProducto from "../components/ModalEliminarProducto";
import "../../public/css/AdminProductos.css";
import {
  obtenerPrecioEnvio,
  actualizarPrecioEnvio,
} from "../api/configuracion";
import ReactPaginate from "react-paginate";
import "../../public/css/ReactPaginate.css";

const AdminProductoCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [precioEnvio, setPrecioEnvio] = useState(0);
  const [nuevoPrecioEnvio, setNuevoPrecioEnvio] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 10;

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      toast.error("Error al cargar productos");
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarPrecioEnvio();
  }, []);

  const cargarPrecioEnvio = async () => {
    try {
      const data = await obtenerPrecioEnvio();
      setPrecioEnvio(data.precioEnvio);
      setNuevoPrecioEnvio(data.precioEnvio);
    } catch (error) {
      toast.error("Error al obtener precio de envío");
    }
  };

  const manejarActualizarPrecioEnvio = async () => {
    try {
      await actualizarPrecioEnvio(nuevoPrecioEnvio);
      toast.success("✅ Costo de envío actualizado correctamente");
      setPrecioEnvio(nuevoPrecioEnvio);
    } catch (error) {
      toast.error("Error al actualizar el costo de envío");
    }
  };

  const abrirModalAgregar = () => setMostrarAgregar(true);
  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarEditar(true);
  };
  const abrirModalEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarEliminar(true);
  };

  // 🔍 Filtro + paginación
  const productosFiltrados = productos.filter((producto) =>
    `${producto.Nombre} ${producto.Descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const offset = paginaActual * itemsPorPagina;
  const productosPaginados = productosFiltrados.slice(
    offset,
    offset + itemsPorPagina
  );
  const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina);

  const handlePageClick = ({ selected }) => {
    setPaginaActual(selected);
  };

  function resaltarCoincidencia(texto, busqueda) {
    if (!busqueda) return texto;
    const regex = new RegExp(`(${busqueda})`, "gi");
    return texto.split(regex).map((parte, i) =>
      regex.test(parte) ? <mark key={i}>{parte}</mark> : parte
    );
  }

  return (
    <div className="admin-productos-page">
      <NavbarAdmin />
      <div className="admin-productos-container">
        <div className="admin-productos-header mt-5">
          <h2>Gestión de Productos</h2>
          <Button variant="success" onClick={abrirModalAgregar}>
            <FaPlus className="me-2" />
            Agregar Producto
          </Button>
        </div>

        <div className="mt-4 mb-3">
          <h5>Precio actual de envío: ₡{precioEnvio}</h5>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              min={0}
              step={1}
              value={nuevoPrecioEnvio}
              onChange={(e) => setNuevoPrecioEnvio(Number(e.target.value))}
            />
            <Button variant="warning" onClick={manejarActualizarPrecioEnvio}>
              Guardar envío
            </Button>
          </div>
        </div>

        {/* 🔍 Barra de búsqueda */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto por nombre o descripción..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(0);
            }}
          />
        </div>

        {/* Tabla para pantallas grandes */}
        <div className="d-none d-md-block">
          <Table
            striped
            bordered
            hover
            responsive
            className="admin-productos-table"
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosPaginados.map((producto) => (
                <tr key={producto.IdProducto}>
                  <td>{resaltarCoincidencia(producto.Nombre, busqueda)}</td>
                  <td>{resaltarCoincidencia(producto.Descripcion, busqueda)}</td>
                  <td>₡{producto.Precio}</td>
                  <td>
                    <img
                      src={producto.ImagenUrl}
                      alt={producto.Nombre}
                      style={{ width: "80px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="primary"
                        onClick={() => abrirModalEditar(producto)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => abrirModalEliminar(producto)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* 🪪 Tarjetas para pantallas móviles */}
        <div className="producto-card-list d-md-none mt-3">
          {productosPaginados.map((producto) => (
            <div key={producto.IdProducto} className="producto-card">
              <div className="producto-card-header">
                <img src={producto.ImagenUrl} alt={producto.Nombre} />
                <div className="producto-card-info">
                  <h5 className="nombre">{resaltarCoincidencia(producto.Nombre, busqueda)}</h5>
                  <p className="descripcion">{resaltarCoincidencia(producto.Descripcion, busqueda)}</p>
                  <p className="precio">₡{producto.Precio}</p>
                </div>
              </div>
              <div className="producto-card-acciones">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => abrirModalEditar(producto)}
                >
                  <FaEdit className="me-1" /> Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => abrirModalEliminar(producto)}
                >
                  <FaTrash className="me-1" /> Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>

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
          containerClassName={"paginacion"}
          pageClassName={"pagina"}
          pageLinkClassName={"pagina-link"}
          activeClassName={"activa"}
          previousClassName={"pagina"}
          nextClassName={"pagina"}
          disabledClassName={"deshabilitada"}
        />
      </div>

      {/* Modales */}
      <ModalAgregarProducto
        show={mostrarAgregar}
        handleClose={() => setMostrarAgregar(false)}
        onProductoGuardado={cargarProductos}
      />
      <ModalEditarProducto
        show={mostrarEditar}
        handleClose={() => setMostrarEditar(false)}
        producto={productoSeleccionado}
        onProductoActualizado={cargarProductos}
      />
      <ModalEliminarProducto
        show={mostrarEliminar}
        handleClose={() => setMostrarEliminar(false)}
        producto={productoSeleccionado}
        onProductoEliminado={cargarProductos}
      />
    </div>
  );
};

export default AdminProductoCRUD;
