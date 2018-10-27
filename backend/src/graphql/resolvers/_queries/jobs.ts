import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.JobsResolver = (_, args, ctx) => {
  return ctx.jobRepository.getJobs(args)
}

export default resolver;
