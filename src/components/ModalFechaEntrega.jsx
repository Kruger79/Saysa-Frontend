import React from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FechaEntregaModal({
  show,
  onHide,
  onDateSelect,
  fechaSeleccionada,
  setFechaSeleccionada,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar fecha de entrega</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <DatePicker
          selected={fechaSeleccionada}
          onChange={(date) => {
            setFechaSeleccionada(date);
            const fechaFormateada = date.toISOString().split("T")[0];
            onDateSelect(fechaFormateada);
          }}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          inline
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
