import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Generated
} from "typeorm";
import { Organization } from "./Organization";
import { Skill } from "./Skill";
import { User } from "./User";
import { JobApplication } from "./JobApplication";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @ManyToOne(type => Organization, organization => organization.jobs, {
    eager: true,
  })
  organization: Organization;

  @Column("float")
  salary: number;

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

  @ManyToMany(type => Skill)
  @JoinTable({name:"jobs_skills"})
  skills: Skill[];

  @ManyToMany(type => User, user => user.bookmarkedJobs)
  usersBookmarked: Promise<User[]>;

  @OneToMany(type => JobApplication, application => application.job)
  applications: Promise<JobApplication[]>;
}
