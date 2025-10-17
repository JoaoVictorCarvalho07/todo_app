import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },

  (err) => {
    if (err.code === "ERR_NETWORK" || err.message.includes("Network Error")) {
      alert("O servidor está indisponível. Tente novamente mais tarde.");
    }
    if (
      err.response?.status === 401 ||
      err.response?.status === 403 ||
      err.response?.status === 404
    ) {
      localStorage.removeItem("token");
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "/";
    } else if (err.response?.status === 500) {
      alert("Erro no servidor. Tente novamente mais tarde.");
    } else if (err.response?.status >= 500) {
      alert("Erro interno no servidor. Por favor, tente mais tarde.");
    } else if (err.response?.status >= 400 && err.response?.status < 500) {
      alert("Ocorreu um erro ao processar sua requisição.");
    }
    return Promise.reject(err);
  }
);

export default api;
