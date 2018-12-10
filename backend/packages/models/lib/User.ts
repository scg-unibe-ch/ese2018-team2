import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { Job } from "./Job";
import { JobApplication } from "./JobApplication";
import { Organization } from "./Organization";
import { Skill } from "./Skill";
import { StudentProfile } from "./StudentProfile";

@Entity("users", { name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  firstname: string;

  @Column("text")
  lastname: string;

  @Column("text")
  phone: string;

  @Column({ type: "citext", unique: true })
  email: string;

  @Column({ type: "citext", unique: true, name: "username", nullable: true })
  username: string;

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
  employer: Organization[];

  @ManyToMany(type => Skill, skill => skill.users)
  @JoinTable({ name: "users_skills" })
  skills: Promise<Skill[]>;

  @OneToOne(type => StudentProfile, studentProfile => studentProfile.student)
  studentProfile: StudentProfile;
}
