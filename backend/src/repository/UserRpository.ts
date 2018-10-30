import { Connection, Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";

export class UserRepository {
  private users: Repository<User>;

  constructor(connection: Connection) {
    this.users = connection.getRepository(User);
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
    if (!session.user) {
      throw new Error("Please log in");
    }
    return this.users.findOneOrFail(session.user.id);
  }
}
