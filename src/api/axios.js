import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://saysa-backend.onrender.com/api/v1",
});

export default api;
