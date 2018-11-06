import { Connection, getConnection, Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { Job } from "../entity/Job";
import Utils from "./Utils";

export class UserRepository {
  private users: Repository<User>;
  private jobs: Repository<Job>;

  constructor(connection: Connection) {
    this.users = connection.getRepository(User);
    this.jobs = connection.getRepository(Job);
  }

  async login(email: string, password: string, session: Express.Session) {
    const foundUsers = await this.users.find({ email });
    if (foundUsers.length === 0) {
      return false;
    }

    const user = foundUsers[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return false;
    }

    session.user = user;

    return true;
  }

  async getMe(session: Express.Session) {
    Utils.enforceAuth(session);
    return this.users.findOneOrFail(session.user.id);
  }

  async addBookmark(jobId: string, session: Express.Session) {
    Utils.enforceAuth(session);

    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarkedJobs")
      .of(session.user.id)
      .add(jobId);

    return true;
  }

  async removeBookmark(jobId: string, session: Express.Session) {
    Utils.enforceAuth(session);

    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarkedJobs")
      .of(session.user.id)
      .remove(jobId);

    return true;
  }
}
