import api from "../api/api";
import type { Task } from "../pages/Tasks";

export default function TaskList({ tasks, onUpdate }: { tasks: Task[]; onUpdate: () => void }) {
  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "concluída" ? "pendente" : "concluída";
    await api.put(`/tasks/${task.id}`, { status: newStatus });
    onUpdate();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    onUpdate();
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className={`font-semibold ${task.status === "concluída" ? "line-through text-gray-500" : ""}`}>
              {task.titulo}
            </h3>
            <p className="text-sm text-gray-600">{task.descricao}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => toggleStatus(task)} className="px-3 py-1 bg-green-500 text-white rounded">
              {task.status === "concluída" ? "Reabrir" : "Concluir"}
            </button>
            <button onClick={() => deleteTask(task.id)} className="px-3 py-1 bg-red-500 text-white rounded">
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
