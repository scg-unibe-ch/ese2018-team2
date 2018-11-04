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

  @ManyToMany(type => Job, job => job.usersLiked, { eager: true })
  @JoinTable({
    name: "like",
    joinColumn: {
      name: "userId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "jobId",
      referencedColumnName: "id"
    }
  })
  likedJobs: Promise<Job[]>;
}
