import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { actualizarProducto } from "../api/productos";
import { toast } from "react-toastify";

const ModalEditarProducto = ({
  show,
  handleClose,
  producto,
  onProductoActualizado,
}) => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    ImagenUrl: "",
    Precio: "",
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        Nombre: producto.Nombre,
        Descripcion: producto.Descripcion,
        ImagenUrl: producto.ImagenUrl,
        Precio: producto.Precio,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleActualizar = async () => {
    try {
      await actualizarProducto(producto.IdProducto, formData);
      toast.success("Producto actualizado correctamente");
      handleClose();
      onProductoActualizado();
    } catch (error) {
      toast.error("Error al actualizar producto");
    }
  };

  if (!producto) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="text"
              name="ImagenUrl"
              value={formData.ImagenUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="Precio"
              value={formData.Precio}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleActualizar}>
          Confirmar Actualización
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarProducto;
