import api from "./axios";

export async function obtenerProductos() {
  const response = await api.get("/productos");
  return response.data;
}

// Crear un producto nuevo
export async function crearProducto(producto) {
  await api.post("/productos", producto);
}

// Actualizar un producto existente
export async function actualizarProducto(id, producto) {
  await api.put(`/productos/${id}`, producto);
}

// Eliminar (desactivar) un producto
export async function eliminarProducto(id) {
  await api.delete(`/productos/${id}`);
}