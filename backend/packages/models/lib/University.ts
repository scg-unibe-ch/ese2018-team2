import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { StudyProgram } from "./StudyProgram";

@Entity("universities", { name: "universities" })
export class University {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(type => StudyProgram)
  studyPrograms: StudyProgram[];
}
