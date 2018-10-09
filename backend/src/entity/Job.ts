import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";

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
}
