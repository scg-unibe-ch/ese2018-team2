import { Connection, Repository } from "typeorm";
import { StudentProfile } from "@unijobs/backend-modules-models";

export class StudentProfileRepository {
  private connection: Connection;
  private studentProfile: Repository<StudentProfile>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.studentProfile = connection.getRepository(StudentProfile);
  }
}
