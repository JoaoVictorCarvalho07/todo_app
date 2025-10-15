import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
  static async signup(nome: string, email: string, senha: string) {
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) throw new Error("Email já cadastrado.");

    const hashed = await bcrypt.hash(senha, 10);
    const user = userRepo.create({ nome, email, senha: hashed });
    await userRepo.save(user);
    return user;
  }

  static async signin(email: string, senha: string) {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado.");

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) throw new Error("Senha incorreta.");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
    return { token, user };
  }
}
