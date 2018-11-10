import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Job } from "./Job";
import JobApplicationState from "./JobApplicationState";
import { User } from "./User";

@Entity("applications")
export class JobApplication {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: JobApplicationState,
    default: JobApplicationState.PENDING
  })
  state: JobApplicationState;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Job)
  @JoinColumn()
  job: Job;
}
