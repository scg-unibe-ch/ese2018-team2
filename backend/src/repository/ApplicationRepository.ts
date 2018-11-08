import { Connection, Repository } from "typeorm";
import { Application } from "../entity/Application";
import Utils from "./Utils";
import { Job } from "../entity/Job";
import { User } from "../entity/User";
import ApplicationState from "../entity/ApplicationState";

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

    return this.applications
      .createQueryBuilder("applications")
      .leftJoinAndSelect("applications.job", "jobs")
      .leftJoinAndSelect("applications.user", "users")
      .getMany();
  }

  async apply(jobId: string, session: Express.Session): Promise<any> {
    Utils.enforceAuth(session);
    const application = new Application();
    application.job = await this.jobs.findOneOrFail(jobId);
    application.user = await this.users.findOneOrFail(session.user.id);
    await this.applications.insert(application);
    console.log(application);
    return true;
  }

  async approve(applicationId: string, session: Express.Session): Promise<any> {
    Utils.enforceAuth(session);

    await this.applications.update(
      { id: applicationId },
      { state: ApplicationState.APPROVED }
    );

    return true;
  }
}
