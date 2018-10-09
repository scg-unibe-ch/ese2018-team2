import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  firstname: string;

  @Column("text")
  lastname: string;

  @Column("text")
  phone: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("text")
  university: string;

  @Column("text")
  studyProgramm: string;

  @Column("text")
  bio: string;
}
