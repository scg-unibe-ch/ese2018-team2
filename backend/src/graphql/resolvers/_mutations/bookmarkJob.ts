import { MutationResolvers } from "../../__generated__/graphqlgen";

const bookmarkJob: MutationResolvers.LikeJobResolver = (_, args, ctx) => {
  return ctx.userRepository.bookmarkJob(args.jobId, ctx.session);
};

export default bookmarkJob;
