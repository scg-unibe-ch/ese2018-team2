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

  async bookmarkJob(jobId: string, session: Express.Session) {
    Utils.enforceAuth(session);

    const user = await this.users.findOneOrFail(session.user.id);
    const job = await this.jobs.findOneOrFail(jobId);

    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarkedJobs")
      .of(user)
      .add(job);

    return true;
  }
}
