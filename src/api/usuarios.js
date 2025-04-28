import api from "./axios";

export async function loginUsuario(correo, contrasena) {
  const response = await api.post("/usuarios/login", { correo, contrasena });
  return response.data;
}

export const registrarUsuario = async (usuarioData) => {
  const response = await api.post("/usuarios", usuarioData);
  return response.data;
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  const res = await api.get("/usuarios");
  return res.data;
};

// Actualizar rol de un usuario
export const actualizarRolUsuario = async (cedula, rol) => {
  const res = await api.put(`/usuarios/${cedula}/rol`, { rol });
  return res.data;
};

export const actualizarTelefonoUsuario = async (cedula, telefono) => {
  const res = await api.put(`/usuarios/${cedula}`, { telefono });
  return res.data;
};
