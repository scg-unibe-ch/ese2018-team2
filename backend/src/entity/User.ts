import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Generated
} from "typeorm";
import { Job } from "./Job";
import { JobApplication } from "./JobApplication";
import { default_type } from "mime";

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

  @Column("bigint")
  @Generated("increment")
  sequenceNumber: number;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @ManyToMany(type => Job, job => job.usersBookmarked)
  @JoinTable({
    name: "bookmarks"
  })
  bookmarkedJobs: Promise<Job[]>;

  @OneToMany(type => JobApplication, application => application.user)
  applications: Promise<JobApplication[]>;
}
