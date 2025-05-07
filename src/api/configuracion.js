// src/api/configuracion.js
import api from "./axios";

// Obtener precio de envío
export async function obtenerPrecioEnvio() {
  const res = await api.get("configuracion/precio-envio");
  return res.data;
}

// Actualizar precio de envío
export async function actualizarPrecioEnvio(nuevoPrecio) {
  const res = await api.put("/configuracion/precio-envio", {
    valor: nuevoPrecio,
  });
  return res.data;
}
