import {
  Job,
  JobApplication,
  Organization,
  Skill,
  User
} from "@unijobs/backend-modules-models";
import {
  elasticClient,
  search as elasticJobSearch,
  SearchBucket,
  SearchNode
} from "@unijobs/backend-modules-search";
import { Connection, Repository } from "typeorm";
import { getUserId } from "./Utils";

export interface JobUpdateArgs {
  id: string;
  title: string;
  description: string;
}

interface CursorOpts {
  seq: number;
  count: number;
  edge: string;
}

const encodeCursor = (options: string) =>
  Buffer.from(options).toString("base64");
const decodeCursor = (src: string) => Buffer.from(src, "base64").toString();

export class JobRepository {
  private connection: Connection;
  private jobs: Repository<Job>;
  private organizations: Repository<Organization>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.jobs = connection.getRepository(Job);
    this.organizations = connection.getRepository(Organization);
  }

  async getOrganizationJobs(organizationId: string, session: Express.Session) {
    const jobs = await this.jobs
      .createQueryBuilder("jobs")
      .where('jobs."organizationId" = :organization', {
        organization: organizationId
      })
      .getMany();

    return jobs;
  }

  // TODO create interface for argument type
  async getJobs(
    first?: number,
    last?: number,
    after?: string,
    before?: string
  ): Promise<any> {
    first = first || 10;

    const pageSize = first || last || 10;

    const getJobsAfter = async (job: string, howManyJobs: number) => {
      if (howManyJobs < 0) {
        throw new Error("first has to be positive");
      }

      const sequenceOfAfterEdge = (await this.jobs.findOne(job)).sequenceNumber;

      return this.jobs
        .createQueryBuilder("job")
        .limit(howManyJobs)
        .addOrderBy("job.sequenceNumber")
        .where("job.sequenceNumber > :seq", { seq: sequenceOfAfterEdge })
        .getMany();
    };

    const hasNextPage = async (job: string, howManyJobs: number) => {
      if (howManyJobs < 0) {
        throw new Error("first has to be positive");
      }

      const sequenceOfAfterEdge = (await this.jobs.findOne(job)).sequenceNumber;

      return (
        (await this.jobs
          .createQueryBuilder("job")
          .limit(howManyJobs)
          .addOrderBy("job.sequenceNumber")
          .where("job.sequenceNumber > :seq", { seq: sequenceOfAfterEdge })
          .getCount()) > 0
      );
    };

    const getJobsBefore = async (job: string, howManyJobs: number) => {
      if (howManyJobs < 0) {
        throw new Error("last has to be positive");
      }

      const sequenceOfBeforeEdge = (await this.jobs.findOne(job))
        .sequenceNumber;

      const allEdgesBefore = await this.jobs
        .createQueryBuilder("job")
        .addOrderBy("job.sequenceNumber")
        .where("job.sequenceNumber < :seq", { seq: sequenceOfBeforeEdge })
        .getCount();

      console.log(howManyJobs);

      // calculate the offset, how many rows need to be skipped until amount equals last
      const offset =
        allEdgesBefore - howManyJobs < 0 ? 0 : allEdgesBefore - howManyJobs;

      return this.jobs
        .createQueryBuilder("job")
        .offset(offset)
        .addOrderBy("job.sequenceNumber")
        .where("job.sequenceNumber < :seq", { seq: sequenceOfBeforeEdge })
        .getMany();
    };

    const hasPreviousPage = async (job: string, howManyJobs: number) => {
      if (howManyJobs < 0) {
        throw new Error("last has to be positive");
      }

      const sequenceOfBeforeEdge = (await this.jobs.findOne(job))
        .sequenceNumber;

      const allEdgesBefore = await this.jobs
        .createQueryBuilder("job")
        .addOrderBy("job.sequenceNumber")
        .where("job.sequenceNumber < :seq", { seq: sequenceOfBeforeEdge })
        .getCount();

      return allEdgesBefore - howManyJobs >= 0;
    };

    let result: Array<Job> = [];

    // check if cursor exists
    if (
      (before || after) &&
      (await this.jobs.findByIds([decodeCursor(after || before)])).length === 0
    ) {
      return {
        nodes: result,
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null
        },
        totalCount: await this.jobs.count()
      };
    }

    if (after) {
      result = await getJobsAfter(decodeCursor(after), first);
    }

    if (before) {
      result = await getJobsBefore(decodeCursor(before), last);
    }

    if (!after && !before) {
      result = await this.jobs
        .createQueryBuilder("job")
        .limit(first)
        .addOrderBy("job.sequenceNumber")
        .getMany();
    }

    const next = await hasNextPage(result[result.length - 1].id, pageSize);
    const previous = await hasPreviousPage(result[0].id, pageSize);

    const nodes = await this.jobs.findByIds(result.map(e => e.id));

    return {
      nodes,
      pageInfo: {
        endCursor: next ? encodeCursor(nodes[nodes.length - 1].id) : null,
        hasNextPage: next,
        hasPreviousPage: previous,
        startCursor: previous ? encodeCursor(nodes[0].id) : null
      },
      totalCount: await this.jobs.count()
    };
  }

  async createJob(args: any): Promise<Job> {
    const job = new Job();
    job.title = args.input.title;
    job.description = args.input.description;
    job.salary = args.input.salary;
    job.isSalaryPerHour = args.input.isSalaryPerHour;
    job.start = args.input.start;
    !!args.input.end && (job.end = args.input.end);
    job.workload = args.input.workload;

    const organization = await this.organizations.findOneOrFail(
      args.input.organization
    );
    job.organization = organization;
    // save
    await this.jobs.insert(job);
    return job;
  }

  async getJobById(id: string) {
    const jobs = await this.jobs.findByIds([id]).catch(() => []);

    if (jobs.length === 1) {
      return jobs[0];
    }

    return null;
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

  async getCompletions(value: string) {
    await elasticClient.ping({
      requestTimeout: 30000
    });

    const result = await elasticClient.search({
      index: "jobs",
      body: {
        size: 5,
        query: {
          bool: {
            must: [
              {
                match: {
                  title: {
                    query: value,
                    fuzziness: 6
                  }
                }
              }
            ]
          }
        }
      }
    });

    if (result.hits.hits.length > 0) {
      // @ts-ignore
      return result.hits.hits.map(hit => ({
        id: hit._id,
        // @ts-ignore
        title: hit._source["title"]
      }));
    }

    return new Array<{ id: string; title: string }>();
  }

  async search(
    search: string,
    minSalary: number,
    maxSalary: number,
    session: Express.Session
  ) {
    await elasticClient.ping({
      requestTimeout: 30000
    });

    // Exclude contains ids of already applied jobs
    let exclude: Array<string> = [];

    if (getUserId(session)) {
      // Only select jobId
      const users = await this.connection
        .getRepository(User)
        .find({ where: { id: getUserId(session) } });

      if (users.length !== 1) {
        console.log("More than one user found!!!");
        throw new Error("Unexpected error");
      }

      const applications = await users[0].applications;

      const result = await this.connection
        .getRepository(JobApplication)
        .findByIds(applications.map(application => application.id), {
          relations: ["job"]
        });

      // TODO evil :(
      exclude = result.map(application => application.job.id);
    }

    const searchResult = await elasticJobSearch(
      { search, minSalary, maxSalary },
      exclude
    );

    const ids = searchResult.nodes.map((e: SearchNode) => e.id);
    const nodes = await this.jobs.findByIds(ids);

    const todo = searchResult.buckets.map((e: SearchBucket) => ({
      key: e.key,
      count: e.count
    }));

    // THIS IS EVIL >:D
    const buckets = todo.map(async (bucket: any) => {
      const skill = (await this.connection
        .getRepository(Skill)
        .find({ id: bucket.key }))[0];

      return {
        skill,
        count: bucket.count
      };
    });

    return {
      nodes,
      buckets,
      aggregations: searchResult.aggregations
    };
  }
}

export default JobRepository;
