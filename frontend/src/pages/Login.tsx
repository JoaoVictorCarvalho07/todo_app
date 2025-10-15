import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/signin", { email, senha });
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao entrar");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input className="w-full border p-2 rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Entrar</button>
        <p className="text-center text-sm">
          Ainda não tem conta? <Link className="text-blue-500" to="/signup">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
