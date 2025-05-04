import React from "react";
import { Modal, Button } from "react-bootstrap";
import { eliminarProducto } from "../api/productos";
import { toast } from "react-toastify";

const ModalEliminarProducto = ({ show, handleClose, producto, onProductoEliminado }) => {
  const handleEliminar = async () => {
    try {
      await eliminarProducto(producto.IdProducto);
      toast.success("Producto eliminado correctamente");
      handleClose();
      onProductoEliminado();
    } catch (error) {
      toast.error("Error al eliminar producto");
    }
  };

  if (!producto) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro que deseas eliminar el producto <strong>{producto.Nombre}</strong>?</p>
        <p>Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleEliminar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarProducto;
