import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Generated
} from "typeorm";
import { Job } from "./Job";
import JobApplicationState from "./JobApplicationState";
import { User } from "./User";

@Entity("jobApplications")
export class JobApplication {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: JobApplicationState,
    default: JobApplicationState.PENDING
  })
  state: JobApplicationState;

  @Column("bigint")
  @Generated("increment")
  sequenceNumber: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(type => User, {eager: true})
  @JoinColumn()
  user: User;

  @ManyToOne(type => Job, {eager: true})
  @JoinColumn()
  job: Job;
}
