import { Connection, Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { Job } from "../entity/Job";
import { Like } from "../entity/Like";

export class UserRepository {
  private users: Repository<User>;
  private jobs: Repository<Job>;
  private likes: Repository<Like>;

  private checkAuth(session: Express.Session) {
    if (!session.user) {
      throw new Error("Please log in");
    }
  }

  constructor(connection: Connection) {
    this.users = connection.getRepository(User);
    this.jobs = connection.getRepository(Job);
    this.likes = connection.getRepository(Like);
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

  async likeJob(userId: string, jobId: string, session: Express.Session) {
    this.checkAuth(session);

    const like = new Like();
    like.userId = jobId.valueOf();
    like.userId = userId.valueOf();

    await this.likes.create(like);

    return true;
  }

  async myLikes(session: Express.Session) {
    this.checkAuth(session);
    return this.likes.find({ userId: session.user.userId });
  }
}
