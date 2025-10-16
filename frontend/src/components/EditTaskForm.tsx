import { useState, useEffect } from "react";
import api from "../api/api";

interface EditTaskFormProps {
  taskId: number;
  initialTitle: string;
  initialDescription?: string;
  onCancel: () => void;
  onUpdated: () => void;
}

export default function EditTaskForm({
  taskId,
  initialTitle,
  initialDescription = "",
  onCancel,
  onUpdated,
}: EditTaskFormProps) {
  const [titulo, setTitulo] = useState(initialTitle);
  const [descricao, setDescricao] = useState(initialDescription);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // garante que se mudar a task sendo editada, o form atualiza
    setTitulo(initialTitle);
    setDescricao(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await api.put(`/tasks/${taskId}`, {
        titulo,
        descricao,
      });
      onUpdated();
    } catch (err) {
      alert("Erro ao atualizar tarefa");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título da tarefa"
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            required
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
            type="submit"
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 font-medium disabled:opacity-70"
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-all duration-200 font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
