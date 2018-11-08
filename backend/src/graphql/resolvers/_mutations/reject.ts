import { MutationResolvers } from "../../__generated__/graphqlgen";

const reject: MutationResolvers.RejectResolver = (_, args, ctx) =>
  ctx.applicationRepository.reject(args.applicationId, ctx.session);

export default reject;
