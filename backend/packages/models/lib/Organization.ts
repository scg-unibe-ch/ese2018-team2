import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { Job } from "./Job";
import { User } from "./User";
import { Page } from "./Page";

@Entity("organizations", { name: "organizations" })
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: false })
  email: string;

  @Column("text")
  phone: string;

  @Column({ type: "boolean", default: false })
  approved: boolean;

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
  @JoinTable({ name: "organizations_users" })
  employee: Promise<User[]>;

  @OneToMany(type => Job, job => job.organization, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
    cascade: true
  })
  jobs: Promise<Job[]>;

  @OneToMany(type => Page, page => page.organization)
  pages: Page[];
}
