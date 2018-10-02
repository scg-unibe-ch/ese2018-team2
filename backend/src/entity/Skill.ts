import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("skills")
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column()
  description: string;
}
