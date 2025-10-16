import { useState } from "react";
import api from "../api/api";
import { Plus, X } from "phosphor-react";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/tasks", { titulo, descricao, status: "pendente" });
      setTitulo("");
      setDescricao("");
      setIsOpen(false);
      onTaskCreated();
    } catch (err) {
      setError("Erro ao criar tarefa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 transition-all duration-300">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl 
                     hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90" />
          <span className="font-medium tracking-wide">Nova Tarefa</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 animate-fadeIn">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Criar nova tarefa</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent 
                           transition-all placeholder:text-neutral-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva sua tarefa (opcional)"
                rows={3}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent 
                           transition-all resize-none placeholder:text-neutral-400"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200
                  ${loading
                    ? "bg-neutral-500 cursor-not-allowed"
                    : "bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98]"}`}
              >
                {loading ? "Criando..." : "Criar"}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 
                           active:scale-[0.98] transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
