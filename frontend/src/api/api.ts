import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response?.status === 401 ||
      err.response?.status === 403 ||
      err.response?.status === 404
    ) {
      localStorage.removeItem("token");
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
