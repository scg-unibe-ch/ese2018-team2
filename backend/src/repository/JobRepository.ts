import {
  Connection,
  Repository,
  EntityManager,
  getManager,
  getConnection
} from "typeorm";
import { Job } from "../entity/Job";
import { cursorTo } from "readline";

export interface JobUpdateArgs {
  id: string;
  title: string;
  description: string;
}

export class JobRepository {
  private connection: Connection;
  private jobs: Repository<Job>;
  private manager = getManager();

  constructor(connection: Connection) {
    this.connection = connection;
    this.jobs = connection.getRepository(Job);
  }

  getJobs(): Promise<Job[]> {
    return this.jobs.find();
  }

  async createJob(title: string, description: string): Promise<Job> {
    const job = new Job();
    job.title = title;
    job.description = description;

    // save
    await this.jobs.insert(job);
    return job;
  }

  async deleteJob(id: string) {
    await this.jobs.delete(id);
    return true;
  }

  async updateJob(args: JobUpdateArgs): Promise<Job> {
    const id = Object.entries(args)
      .filter(e => e[0] === "id")
      .map(e => e[1])[0];

    const fieldsToUpdate = Object.entries(args)
      .filter(e => e[0] !== "id")
      .reduce(
        (prev, curr) => Object.assign({}, prev, { [curr[0]]: curr[1] }),
        {}
      );

    await this.jobs.update({ id }, fieldsToUpdate);

    return this.jobs.findOneOrFail(id);
  }
}
