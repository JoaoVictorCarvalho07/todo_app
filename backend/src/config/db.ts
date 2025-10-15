import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Task } from "../models/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "temp.sqlite",
  synchronize: true,
  entities: [User, Task],
});

