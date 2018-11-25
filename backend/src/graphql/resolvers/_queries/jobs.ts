import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.JobsResolver = (_, { after, before, first, last }, ctx) => {
  return ctx.jobRepository.getJobs(first, last, after, before);
};

export default resolver;
