import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ nullable: true })
  descricao!: string;

  @Column({ default: "pendente" })
  status!: "pendente" | "em andamento" | "concluída";

  @CreateDateColumn()
  data_criacao!: Date;

  @Column({ nullable: true })
  data_conclusao!: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User;
}
