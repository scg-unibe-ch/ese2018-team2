import { Connection, Repository } from "typeorm";
import { Application } from "../entity/Application";
import Utils from "./Utils";
import { Job } from "../entity/Job";
import { User } from "../entity/User";

export class ApplicationRepository {
  private connection: Connection;
  private applications: Repository<Application>;
  private jobs: Repository<Job>;
  private users: Repository<User>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.applications = connection.getRepository(Application);
    this.jobs = connection.getRepository(Job);
    this.users = connection.getRepository(User);
  }

  getApplications(args: any, session: Express.Session): Promise<Application[]> {
    Utils.enforceAuth(session);
    if (args.id) {
      return this.applications.findByIds([args.id]);
    }

    return this.applications.find();
  }

  async apply(jobId: string, session: Express.Session): Promise<any> {
    Utils.enforceAuth(session);
    const newApplication = new Application();
    newApplication.job = await this.jobs.findOneOrFail(jobId);
    newApplication.user = await this.users.findOneOrFail(session.user.id);
    await this.applications.insert(newApplication);
    return true;
  }

  async approve(applicationId: string, session: Express.Session): Promise<any> {
    Utils.enforceAuth(session);
    return true;
  }
}
