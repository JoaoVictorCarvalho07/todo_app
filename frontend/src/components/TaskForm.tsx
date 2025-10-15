import { useState } from "react";
import api from "../api/api";
import { Plus } from "phosphor-react";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { titulo, descricao, status: "pendente" });
      setTitulo("");
      setDescricao("");
      setIsOpen(false);
      onTaskCreated();
    } catch (err) {
      alert("Erro ao criar tarefa");
    }
  };

 return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all duration-200"
        >
          <Plus size={20} />
          <span className="font-medium">Nova Tarefa</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição (opcional)"
                rows={3}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 font-medium"
              >
                Criar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
