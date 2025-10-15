import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/tasks", { titulo, descricao });
    setTitulo("");
    setDescricao("");
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input className="border p-2 w-full rounded" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <textarea className="border p-2 w-full rounded" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Adicionar</button>
    </form>
  );
}
