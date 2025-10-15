import api from "../api/api";
import type { Task } from "../pages/Tasks";
import { Circle, Trash2, CheckCircle2 } from "lucide-react";

export default function TaskList({ tasks, onUpdate }: { tasks: Task[]; onUpdate: () => void }) {
  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "pendente" ? "concluida" : "pendente";
    try {
      await api.put(`/tasks/${task.id}`, { ...task, status: newStatus });
      onUpdate();
    } catch (err) {
      alert("Erro ao atualizar tarefa");
    }
  };

  const deleteTask = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      try {
        await api.delete(`/tasks/${id}`);
        onUpdate();
      } catch (err) {
        alert("Erro ao excluir tarefa");
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <Circle size={64} className="mx-auto text-neutral-300 mb-4" />
        <p className="text-neutral-500 text-lg">Nenhuma tarefa ainda</p>
        <p className="text-neutral-400 text-sm mt-2">Crie sua primeira tarefa para começar</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl p-5 shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => toggleStatus(task)}
              className="mt-1 flex-shrink-0"
            >
              {task.status === "concluida" ? (
                <CheckCircle2 size={24} className="text-neutral-900" />
              ) : (
                <Circle size={24} className="text-neutral-300 group-hover:text-neutral-400 transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-medium mb-1 ${
                  task.status === "concluida"
                    ? "line-through text-neutral-400"
                    : "text-neutral-900"
                }`}
              >
                {task.titulo}
              </h3>
              {task.descricao && (
                <p
                  className={`text-sm ${
                    task.status === "concluida"
                      ? "text-neutral-400"
                      : "text-neutral-600"
                  }`}
                >
                  {task.descricao}
                </p>
              )}
              <p className="text-xs text-neutral-400 mt-2">
                {new Date(task.data_criacao).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="flex-shrink-0 p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}