import { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

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
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
      </div>
      <TaskForm onTaskCreated={loadTasks} />
      <TaskList tasks={tasks} onUpdate={loadTasks} />
    </div>
  );
}
