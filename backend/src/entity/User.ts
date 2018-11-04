import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Job } from "./Job";

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

  @ManyToMany(type => Job, job => job.userLikes)
  @JoinTable({ name: "users_liked_jobs_jobs" })
  likedJobs: Job[];
}
