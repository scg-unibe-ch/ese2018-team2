import { MutationResolvers } from "../../__generated__/graphqlgen";

const apply: MutationResolvers.ApplyResolver = (_, args, ctx) =>
  ctx.applicationRepository.apply(args.jobId, ctx.session);

export default apply;
