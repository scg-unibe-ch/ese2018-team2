import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("students")
export class Student {
  @Column("text")
  firstname: string;

  @Column("text")
  surname: string;

  @Column("simple-array")
  skills: string[];

  @Column("text")
  schedulability: string;

  @Column("text")
  experiences: string;

  @Column("text")
  portfolio: string;

  @Column("text")
  university: string;

  @Column("text")
  studyProgramm: string;

  @Column("text")
  bio: string;
}
