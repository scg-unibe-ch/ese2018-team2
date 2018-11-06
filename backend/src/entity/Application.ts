import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job";
import ApplicationStatus from "./ApplicationStatus";
import { User } from "./User";

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING
  })
  state: ApplicationStatus;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Job)
  job: Job;
}
