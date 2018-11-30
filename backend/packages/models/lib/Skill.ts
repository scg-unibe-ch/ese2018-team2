import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany
} from "typeorm";
import { User } from "./User";

@Entity("skills")
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bigint")
  @Generated("increment")
  sequenceNumber: number;

  @Column("text", {name: "title"})
  title: string;

  @Column("text", {name:"description"})
  description: string;

  @ManyToMany(type => User, user => user.skills)
  users: Promise<User[]>;
}
