import { MutationResolvers } from "../../__generated__/graphqlgen";

const likeJob: MutationResolvers.LikeJobResolver = (_, args, ctx) => {
  return ctx.userRepository.likeJob(args.userId, args.jobId, ctx.session);
};

export default likeJob;
