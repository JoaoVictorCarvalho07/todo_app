import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";

export class TaskController {
  static async list(req: Request, res: Response) {
    const userId = (req as any).userId;
    const tasks = await TaskService.list(userId);
    res.json(tasks);
  }

  static async create(req: Request, res: Response) {
    const userId = (req as any).userId;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });
    const { titulo, descricao } = req.body;
    const task = await TaskService.create(user!, titulo, descricao);
    res.status(201).json(task);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const task = await TaskService.update(Number(id), req.body);
    res.json(task);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await TaskService.delete(Number(id));
    res.status(204).send();
  }
}
