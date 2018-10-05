import { IMutation, IQuery } from "./generated/resolvers";
import ArgsHello = IQuery.ArgsHello;
import { IResolvers } from "graphql-yoga/dist/types";
import { JobRepository } from "./repository/JobRepository";
import ArgsCreateJob = IMutation.ArgsCreateJob;
import ArgsDeleteJob = IMutation.ArgsDeleteJob;
import ArgsUpdateJob = IMutation.ArgsUpdateJob;

interface BackendContext {
  jobRepository: JobRepository;
}

export const resolvers: IResolvers = {
  Query: {
    hello: (_, { name }: ArgsHello) => `Hello ${name || "World"}`,
    jobs: (_, args, ctx: BackendContext) => ctx.jobRepository.getJobs()
  },
  Mutation: {
    createJob: (
      _,
      { title, description }: ArgsCreateJob,
      ctx: BackendContext
    ) => ctx.jobRepository.createJob(title, description),
    deleteJob: (_, { job }: ArgsDeleteJob, ctx) =>
      ctx.jobRepository.deleteJob(job),
    updateJob: (_, args: ArgsUpdateJob, ctx) =>
      ctx.jobRepository.updateJob(args)
  }
};
