import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Job } from "./Job";
import { User } from "./User";

@Entity("likes")
export class Like {
  @PrimaryColumn("text")
  userId: string;

  @PrimaryColumn("text")
  jobId: string;
}
