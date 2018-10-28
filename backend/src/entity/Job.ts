import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Organization } from "./Organization";
import { Skill } from "./Skill";

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

  @ManyToMany(type => Skill)
  @JoinTable()
  skills: Promise<Skill[]>;
}
