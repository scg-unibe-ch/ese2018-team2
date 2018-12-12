import { Page } from "./Page";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import { Job } from "./Job";
import { University } from "./University";

@Entity("studyPrograms", { name: "studyPrograms" })
export class StudyProgram {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  title: string;

  @ManyToMany(type => University)
  @JoinTable({ name: "studyPrograms_universities" })
  universities: University[];

  @ManyToMany(type => Page)
  pages: Page[];

  @ManyToMany(type => Job)
  jobs: Job[];
}
