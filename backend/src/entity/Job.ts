import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  description: string;
}
