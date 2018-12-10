import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity("studentProfiles", { name: "studentProfiles" })
export class StudentProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "studyProgram" })
  studyProgram: string;

  @Column("text", { name: "university" })
  university: string;

  @OneToOne(type => User, user => user.studentProfile)
  @JoinColumn({ name: "user" })
  student: User;
}
