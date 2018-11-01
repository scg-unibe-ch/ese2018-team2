import { Connection, Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { Job } from "../entity/Job";

export class UserRepository {
  private users: Repository<User>;
  private jobs: Repository<Job>;

  private checkAuth(session: Express.Session) {
    if (!session.user) {
      throw new Error("Please log in");
    }
  }

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
    this.checkAuth(session);
    return this.users.findOneOrFail(session.user.id);
  }

  async likeJob(jobId: string, session: Express.Session) {
    this.checkAuth(session);

    const user = await this.users.findOneOrFail(session.user.id);
    const job = await this.jobs.findOneOrFail(jobId);

    if (typeof user.likedJobs == "undefined") {
      user.likedJobs = [job];
    } else {
      user.likedJobs.push(job);
    }

    if (typeof job.userLikes == "undefined") {
      job.userLikes = [user];
    } else {
      job.userLikes.push(user);
    }

    await this.users.manager.save(user);
    await this.jobs.manager.save(job);

    return true;
  }

  async getMyLikes(session: Express.Session) {
    this.checkAuth(session);

    const likes = await this.users
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.likedJobs", "job")
      .getMany();

    return likes;
  }
}
