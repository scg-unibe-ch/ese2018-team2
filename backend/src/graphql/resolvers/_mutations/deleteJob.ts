import { MutationResolvers } from "../../__generated__/graphqlgen";

const deleteJob: MutationResolvers.DeleteJobResolver = (_, args, ctx) => {
  return ctx.jobRepository.deleteJob(args.job);
};

export default deleteJob;
