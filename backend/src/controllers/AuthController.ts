import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;
      const user = await AuthService.signup(nome, email, senha);
      res.status(201).json({ nome: user.nome, email: user.email});
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await AuthService.signin(email, senha);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
