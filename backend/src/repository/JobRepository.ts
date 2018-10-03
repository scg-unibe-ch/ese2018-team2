import {
  Connection,
  Repository,
  EntityManager,
  getManager,
  getConnection
} from "typeorm";
import { Job } from "../entity/Job";

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

  // TODO

  async deleteJob(id: String) {
    /*
        this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove );
        */
    /*
        JobRepository.remove({  id: 1  })()
            .select()
            .from(Job,  "user")
            .where("user.name = :name", { name: "John" })
            .getMany();
        await repository.remove(user);
            */
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Job) // or JobRepository
      .where("id", { id }) // oder uuid?
      .execute();
  }

  // TODO
  async updateJob(
    title: string,
    description: string,
    id: string
  ): Promise<Job> {
    const job = await this.manager
      .createQueryBuilder()
      .select()
      .from(Job, "jobs")
      .where("job.id = :id", { id })
      .getOne();

    job.title = title;
    job.description = description;

    return job;
  }
}
