import { MutationResolvers } from "../../__generated__/graphqlgen";

const addBookmark: MutationResolvers.AddBookmarkResolver = (_, args, ctx) => {
  return ctx.userRepository.addBookmark(args.jobId, ctx.session);
};

export default addBookmark;
