import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("skills")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  description: string;
}
