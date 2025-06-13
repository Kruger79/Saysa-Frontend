import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { crearProducto } from "../api/productos";
import { toast } from "react-toastify";

const ModalAgregarProducto = ({ show, handleClose, onProductoGuardado }) => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    ImagenUrl: "",
    Precio: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGuardar = async () => {
    try {
      await crearProducto(formData);
      toast.success("Producto agregado correctamente");
      handleClose();
      onProductoGuardado();
      setFormData({
        Nombre: "",
        Descripcion: "",
        ImagenUrl: "",
        Precio: "",
      });
    } catch (error) {
      toast.error("Error al agregar producto");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">Agregar Producto</Modal.Title>
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
        <Button variant="success" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAgregarProducto;
