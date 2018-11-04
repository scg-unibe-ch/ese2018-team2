import { MutationResolvers } from "../../__generated__/graphqlgen";

const deleteLike: MutationResolvers.DeleteLikeResolver = (_, args, ctx) => {
  return ctx.likeRepository.deleteLike(args.jobId, ctx.session);
};

export default deleteLike;
