import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Generated,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Job } from "./Job";
import { User } from "./User";

@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: false })
  name: string;

  @Column("bigint")
  @Generated("increment")
  sequenceNumber: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @ManyToMany(type => User, user => user.employer)
  @JoinTable({ name: "organisation_staff" })
  employee: Promise<User[]>;

  @OneToMany(type => Job, job => job.organization)
  jobs: Promise<Job[]>;
}
