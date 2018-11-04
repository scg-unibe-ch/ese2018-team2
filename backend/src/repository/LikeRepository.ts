import { Connection, Repository } from "typeorm";
import { Like } from "../entity/Like";

export class LikeRepository {
  private connection: Connection;
  private likes: Repository<Like>;

  private checkAuth(session: Express.Session) {
    if (!session.user) {
      throw new Error("Please log in");
    }
  }

  constructor(connection: Connection) {
    this.connection = connection;
    this.likes = connection.getRepository(Like);
  }

  // TODO create interface for argument type
  /*getLikes(args: any): Promise<Like[]> {
        console.log(args);

        if (args.userId) {
            return this.likes.findByIds([args.userId]);
        }

        return this.likes.find();
    }*/

  async createLike(jobId: string, session: Express.Session): Promise<Like> {
    this.checkAuth(session);

    const like = new Like();
    like.userId = session.user.id;
    like.jobId = jobId;

    await this.likes.insert(like);
    return like;
  }

  async deleteLike(jobId: string, session: Express.Session) {
    this.checkAuth(session);
    await this.likes.delete({ userId: session.user.id, jobId: jobId });
    return true;
  }
}

export default LikeRepository;
