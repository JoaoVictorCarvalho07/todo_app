import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Task } from "../models/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [User, Task],
});
