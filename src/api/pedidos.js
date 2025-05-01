import axios from "axios";

const API_URL = "http://localhost:3001/api/v1"; // Cambia si tu backend tiene otro puerto

export async function crearPedido(pedidoData) {
  try {
    const response = await axios.post(`${API_URL}/pedidos`, pedidoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
}
