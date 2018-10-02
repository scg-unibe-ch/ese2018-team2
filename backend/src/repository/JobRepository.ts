import { Connection, Repository } from "typeorm";
import { Job } from "../entity/Job";

export class JobRepository {

  private connection: Connection;
  private jobs: Repository<Job>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.jobs = connection.getRepository(Job);
  }

  getJobs():Promise<Job[]> {
    return this.jobs.find();
  }

  async createJob(title: string, description: string):Promise<Job> {
    const job = new Job();
    job.title = title;
    job.description = description;

    // save
    await this.jobs.insert(job);
    return job;
  }

  // TODO
  deleteJob(id: String):void {}

  // TODO
  updateJob(title: string, description: string): Promise<Job> {
    return null
  }
}