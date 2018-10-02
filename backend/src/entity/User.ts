import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  Address: string;

  @Column("text")
  phone: string;

  @Column("text")
  email: string;
}
