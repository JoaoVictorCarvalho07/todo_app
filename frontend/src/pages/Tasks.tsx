import { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { LogOut } from "react-feather";

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  data_criacao: string;
}
export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">Tarefas</h1>
            <p className="text-neutral-500">Organize seu dia de forma simples</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
        
        <TaskForm onTaskCreated={loadTasks} />
        <TaskList tasks={tasks} onUpdate={loadTasks} />
      </div>
    </div>
  );
}