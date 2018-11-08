import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Job } from "./Job";
import { Application } from "./Application";

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

  @Column({ type: "text", unique: true })
  email: string;

  @Column("text")
  password: string;

  @ManyToMany(type => Job, job => job.usersBookmarked)
  @JoinTable({
    name: "bookmarks"
  })
  bookmarkedJobs: Promise<Job[]>;

  @OneToMany(type => Application, application => application.user)
  applications: Promise<Application[]>;
}
