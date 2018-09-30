import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

}