import { MutationResolvers } from "../../__generated__/graphqlgen";

const createLike: MutationResolvers.CreateLikeResolver = (_, args, ctx) => {
  return ctx.likeRepository.createLike(args.jobId, ctx.session);
};

export default createLike;
