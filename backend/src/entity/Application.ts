import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Job } from "./Job";
import ApplicationState from "./ApplicationState";
import { User } from "./User";

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ApplicationState,
    default: ApplicationState.PENDING
  })
  state: ApplicationState;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Job)
  @JoinColumn()
  job: Job;
}
