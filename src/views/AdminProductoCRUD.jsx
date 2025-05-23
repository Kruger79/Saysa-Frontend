import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import { toast } from "react-toastify";
import NavbarAdmin from "../components/Navbar";
import SidebarAdmin from "../components/SidebarAdmin";
import { Button, Table } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModalAgregarProducto from "../components/ModalAgregarProducto";
import ModalEditarProducto from "../components/ModalEditarProducto";
import ModalEliminarProducto from "../components/ModalEliminarProducto";
import "../../public/css/AdminProductos.css";
import {
  obtenerPrecioEnvio,
  actualizarPrecioEnvio,
} from "../api/configuracion";


const AdminProductoCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [precioEnvio, setPrecioEnvio] = useState(0);
  const [nuevoPrecioEnvio, setNuevoPrecioEnvio] = useState("");


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

  return (
    <div className="admin-productos-page">
      <NavbarAdmin />
      <SidebarAdmin />

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
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* 🧾 Tabla */}
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
            {productos
              .filter((producto) =>
                `${producto.Nombre} ${producto.Descripcion}`
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              )
              .map((producto) => (
                <tr key={producto.IdProducto}>
                  <td>{producto.Nombre}</td>
                  <td>{producto.Descripcion}</td>
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
