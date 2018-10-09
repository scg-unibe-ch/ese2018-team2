import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job";

@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: false })
  name: string;

  @OneToMany(type => Job, job => job.organization)
  jobs: Promise<Job[]>;
}
