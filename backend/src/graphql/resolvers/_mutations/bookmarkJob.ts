import { MutationResolvers } from "../../__generated__/graphqlgen";

const bookmarkJob: MutationResolvers.BookmarkJobResolver = (_, args, ctx) => {
  return ctx.userRepository.bookmarkJob(args.jobId, args.add, ctx.session);
};

export default bookmarkJob;
