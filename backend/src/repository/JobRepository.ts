import { Connection, Repository } from "typeorm";
import { Job } from "../entity/Job";
import { Organization } from "../entity/Organization";
import { JobConnection } from "src/types";

export interface JobUpdateArgs {
  id: string;
  title: string;
  description: string;
}

export class JobRepository {
  private connection: Connection;
  private jobs: Repository<Job>;
  private organizations: Repository<Organization>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.jobs = connection.getRepository(Job);
    this.organizations = connection.getRepository(Organization);
  }

  // TODO create interface for argument type
  getJobs(first: number, last: number, after: string, before: string): JobConnection {
    /*if (args.id) {
      return this.jobs.findByIds([args.id]);
    }*/

    return {
      nodes: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null
      },
      totalCount: 0,
    }
  }

  async createJob(args: any): Promise<Job> {
    const job = new Job();
    job.title = args.input.title;
    job.description = args.input.description;
    job.salary = 1.0;
    job.start = new Date();

    const organization = await this.organizations.findOneOrFail(
      args.input.organization
    );
    job.organization = organization;
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
      .filter(e => e[0] === "userId")
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

export default JobRepository;
