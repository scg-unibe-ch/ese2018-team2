import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { Organization } from "./Organization";
import { Role } from "./Role";
import { User } from "./User";
import { Application } from "./Application";

@Entity("jobs")
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

  @Column("date")
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @JoinTable()
  roles: Promise<Role[]>;

  @ManyToMany(type => User, user => user.bookmarkedJobs)
  usersBookmarked: Promise<User[]>;

  @OneToMany(type => Application, application => application.job)
  applications: Promise<Application[]>;
}
