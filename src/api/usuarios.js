import api from './axios';

export async function loginUsuario(correo, contrasena) {
    const response = await api.post('/usuarios/login', { correo, contrasena });
    return response.data;
}

export const actualizarTelefonoUsuario = async (cedula, telefono) => {
    const res = await api.put(`/usuarios/${cedula}`, { telefono });
    return res.data;
};