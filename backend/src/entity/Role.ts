import { Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";

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
}
