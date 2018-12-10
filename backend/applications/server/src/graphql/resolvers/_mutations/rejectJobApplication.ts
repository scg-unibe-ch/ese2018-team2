import { MutationResolvers } from "../../__generated__/graphqlgen";

const rejectJobApplication: MutationResolvers.RejectJobApplicationResolver = (
  _,
  args,
  ctx
) =>
  ctx.jobApplicationRepository.rejectJobApplication(
    args.applicationId,
    ctx.session
  );

export default rejectJobApplication;
