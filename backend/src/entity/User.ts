import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { Job } from "./Job";
import { JobApplication } from "./JobApplication";
import { Organization } from "./Organization";
import { type } from "os";
import { Role } from "./Role";

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
  siteAdmin: boolean;

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

  @ManyToMany(type => Organization, organisation => organisation.employee)
  employer: Promise<Organization[]>;

  @ManyToMany(type => Role, role => role.matchingStudents)
  @JoinTable({ name: "user_roles" })
  roles: Promise<Role[]>;
}
