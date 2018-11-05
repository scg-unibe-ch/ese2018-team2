import { MutationResolvers } from "../../__generated__/graphqlgen";

const bookmarkJob: MutationResolvers.BookmarkJobResolver = (_, args, ctx) => {
  return ctx.userRepository.bookmarkJob(args.jobId, ctx.session);
};

export default bookmarkJob;
