import { AppDataSource } from "../config/db";
import { Task } from "../models/Task";
import { User } from "../models/User";

const taskRepo = AppDataSource.getRepository(Task);

export class TaskService {
  static async list(userId: number) {
    return taskRepo.find({ where: { user: { id: userId } } });
  }

  static async create(user: User, titulo: string, descricao: string) {
    const task = taskRepo.create({ titulo, descricao, user });
    return await taskRepo.save(task);
  }

  static async update(id: number, data: Partial<Task>) {
    await taskRepo.update(id, data);
    return await taskRepo.findOne({ where: { id } });
  }

  static async delete(id: number) {
    return await taskRepo.delete(id);
  }
}
