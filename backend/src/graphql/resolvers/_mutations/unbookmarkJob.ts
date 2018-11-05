import { MutationResolvers } from "../../__generated__/graphqlgen";

const unbookmarkJob: MutationResolvers.UnbookmarkJobResolver = (
  _,
  args,
  ctx
) => {
  return ctx.userRepository.unbookmarkJob(args.jobId, ctx.session);
};

export default unbookmarkJob;
