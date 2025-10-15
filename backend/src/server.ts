import "reflect-metadata";
import { AppDataSource } from "./config/db";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco SQLite iniciado!");
    app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));
  })
  .catch((err) => console.error("Erro ao iniciar o banco:", err));
