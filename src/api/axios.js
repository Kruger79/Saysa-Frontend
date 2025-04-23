import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
});
console.log("URL base de la API:", import.meta.env.VITE_API_URL);

export default api;