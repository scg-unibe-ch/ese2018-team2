import { IResolvers } from "graphql-yoga/dist/types";
import { JobRepository } from "./repository/JobRepository";
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
    jobs: (_, args: GQL.ICreateJobInput, ctx: BackendContext) =>
      ctx.jobRepository.getJobs(args),
    organizations: (_, args, ctx: BackendContext) =>
      ctx.organizationRepository.getOrganizations()
  },
  Mutation: {
    createJob: (_, args: GQL.ICreateJobInput, ctx: BackendContext) =>
      ctx.jobRepository.createJob(args),
    deleteJob: (_, { job }: GQL.IDeleteJobOnMutationArguments, ctx) =>
      ctx.jobRepository.deleteJob(job),
    updateJob: (_, args: GQL.IUpdateJobOnMutationArguments, ctx) =>
      ctx.jobRepository.updateJob(args),
    createOrganization: (
      _,
      { name }: GQL.ICreateOrganizationOnMutationArguments,
      ctx
    ) => ctx.organizationRepository.createOrganization(name)
  }
};
