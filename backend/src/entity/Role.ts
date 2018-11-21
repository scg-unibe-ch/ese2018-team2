import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany
} from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bigint")
  @Generated("increment")
  sequenceNumber: number;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @ManyToMany(type => User, user => user.roles)
  matchingStudents: Promise<User[]>;
}
