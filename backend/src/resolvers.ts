import { IMutation, IQuery } from "./generated/resolvers";
import ArgsHello = IQuery.ArgsHello;
import { IResolvers } from "graphql-yoga/dist/types";
import { JobRepository } from "./repository/JobRepository";
import ArgsCreateJob = IMutation.ArgsCreateJob;
import ArgsDeleteJob = IMutation.ArgsDeleteJob;
import ArgsUpdateJob = IMutation.ArgsUpdateJob;
import ArgsCreateOrganization = IMutation.ArgsCreateOrganization;
import { OrganizationRepository } from "./repository/OrganizationRepository";

interface BackendContext {
  jobRepository: JobRepository;
  organizationRepository: OrganizationRepository;
}

export const resolvers: IResolvers = {
  Organization: {
    jobs: (org, args, ctx: BackendContext) => {
      console.log(org);
      return org.jobs;
    }
  },
  Query: {
    hello: (_, { name }: ArgsHello) => `Hello ${name || "World"}`,
    jobs: (_, args, ctx: BackendContext) => ctx.jobRepository.getJobs(),
    organizations: (_, args, ctx: BackendContext) =>
      ctx.organizationRepository.getOrganizations()
  },
  Mutation: {
    createJob: (_, args: ArgsCreateJob, ctx: BackendContext) =>
      ctx.jobRepository.createJob(args),
    deleteJob: (_, { job }: ArgsDeleteJob, ctx) =>
      ctx.jobRepository.deleteJob(job),
    updateJob: (_, args: ArgsUpdateJob, ctx) =>
      ctx.jobRepository.updateJob(args),
    createOrganization: (_, { name }: ArgsCreateOrganization, ctx) =>
      ctx.organizationRepository.createOrganization(name)
  }
};
