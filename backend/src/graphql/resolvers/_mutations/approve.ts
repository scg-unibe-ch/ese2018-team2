import { MutationResolvers } from "../../__generated__/graphqlgen";

const approve: MutationResolvers.ApproveResolver = (_, args, ctx) =>
  ctx.applicationRepository.approve(args.applicationId, ctx.session);

export default approve;
