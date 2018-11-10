import { Connection, Repository } from "typeorm";
import { JobApplication } from "../entity/JobApplication";
import Utils from "./Utils";
import { Job } from "../entity/Job";
import { User } from "../entity/User";
import JobApplicationState from "../entity/JobApplicationState";
import enforceAuth from "./Utils";

export class JobApplicationRepository {
  private connection: Connection;
  private applications: Repository<JobApplication>;
  private jobs: Repository<Job>;
  private users: Repository<User>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.applications = connection.getRepository(JobApplication);
    this.jobs = connection.getRepository(Job);
    this.users = connection.getRepository(User);
  }

  getApplications(
    args: any,
    session: Express.Session
  ): Promise<JobApplication[]> {
    enforceAuth(session);

    return this.applications
      .createQueryBuilder("applications")
      .leftJoinAndSelect("applications.job", "jobs")
      .leftJoinAndSelect("applications.user", "users")
      .getMany();
  }

  async applyForJob(jobId: string, session: Express.Session): Promise<any> {
    enforceAuth(session);

    const application = new JobApplication();
    application.job = await this.jobs.findOneOrFail(jobId);
    application.user = await this.users.findOneOrFail(session.user.id);
    await this.applications.insert(application);
    console.log(application);
    return true;
  }

  async approveJobApplication(
    applicationId: string,
    session: Express.Session
  ): Promise<any> {
    enforceAuth(session);

    await this.applications.update(
      { id: applicationId },
      { state: JobApplicationState.APPROVED }
    );

    return true;
  }

  async rejectJobApplication(
    applicationId: string,
    session: Express.Session
  ): Promise<any> {
    enforceAuth(session);

    await this.applications.update(
      { id: applicationId },
      { state: JobApplicationState.REJECTED }
    );

    return true;
  }
}
