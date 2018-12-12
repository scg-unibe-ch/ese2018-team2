import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { JobApplication } from "./JobApplication";
import { Organization } from "./Organization";
import { Skill } from "./Skill";
import { User } from "./User";
import { StudyProgram } from "./StudyProgram";

@Entity("jobs", { name: "jobs" })
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @ManyToOne(type => Organization, organization => organization.jobs, {
    eager: true
  })
  organization: Organization;

  @Column("float")
  salary: number;

  // else "pauschal"
  @Column({ type: "boolean", default: false })
  isSalaryPerHour: boolean;

  @ManyToMany(type => StudyProgram)
  @JoinTable({ name: "job_studyProgram" })
  preferredStudyPrograms: StudyProgram[];

  /**
   * Aka "Pensum"
   */
  @Column({ type: "float" })
  workload: number;

  @Column("bigint")
  @Generated("increment")
  sequenceNumber: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column("date")
  start: Date;

  @Column({ nullable: true })
  end: Date;

  // TODO not nullable
  @Column({ nullable: true, name: "workingTime" })
  workingTime: number;

  // TODO not nullable
  @Column({ nullable: true, name: "isWorkingTimePerWeek", default: "true" })
  isWorkingTimePerWeek: boolean;

  @ManyToMany(type => Skill)
  @JoinTable({ name: "jobs_skills" })
  skills: Skill[];

  @ManyToMany(type => User, user => user.bookmarkedJobs)
  usersBookmarked: Promise<User[]>;

  @OneToMany(type => JobApplication, application => application.job)
  applications: Promise<JobApplication[]>;
}
