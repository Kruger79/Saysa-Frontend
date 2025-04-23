import api from './axios';

export async function obtenerProductos() {
  const response = await api.get('/productos');
  return response.data;
}