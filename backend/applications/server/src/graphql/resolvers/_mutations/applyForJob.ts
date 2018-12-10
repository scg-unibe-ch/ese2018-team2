import { MutationResolvers } from "../../__generated__/graphqlgen";

const applyForJob: MutationResolvers.ApplyForJobResolver = (_, args, ctx) =>
  ctx.jobApplicationRepository.applyForJob(args.jobId, ctx.session);

export default applyForJob;
