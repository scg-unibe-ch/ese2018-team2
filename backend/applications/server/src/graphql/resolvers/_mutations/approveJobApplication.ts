import { MutationResolvers } from "../../__generated__/graphqlgen";

const approveJobApplication: MutationResolvers.ApproveJobApplicationResolver = (
  _,
  args,
  ctx
) =>
  ctx.jobApplicationRepository.approveJobApplication(
    args.applicationId,
    ctx.session
  );

export default approveJobApplication;
