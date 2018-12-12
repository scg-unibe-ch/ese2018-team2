import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Organization } from "./Organization";
import { StudyProgram } from "./StudyProgram";

@Entity("pages")
export class Page {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(type => StudyProgram)
  @JoinTable()
  studyPrograms: StudyProgram[];

  @ManyToOne(type => Organization, organization => organization.pages)
  organization: Organization;
}
