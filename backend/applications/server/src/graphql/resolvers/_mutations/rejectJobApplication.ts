import { MutationResolvers } from "../../__generated__/graphqlgen";

const rejectJobApplication: MutationResolvers.RejectJobApplicationResolver = (
  _,
  args,
  ctx
) =>
  ctx.applicationRepository.rejectJobApplication(
    args.applicationId,
    ctx.session
  );

export default rejectJobApplication;
