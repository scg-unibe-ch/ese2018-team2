import { MutationResolvers } from "../../__generated__/graphqlgen";

const removeBookmark: MutationResolvers.RemoveBookmarkResolver = (
  _,
  args,
  ctx
) => {
  return ctx.userRepository.removeBookmark(args.jobId, ctx.session);
};

export default removeBookmark;
