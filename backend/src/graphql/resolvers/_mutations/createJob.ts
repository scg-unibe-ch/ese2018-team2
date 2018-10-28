import { MutationResolvers } from "../../__generated__/graphqlgen";

const resolver: MutationResolvers.CreateJobResolver = (_, args, ctx) => {
  return ctx.jobRepository.createJob(args);
};

export default resolver;
