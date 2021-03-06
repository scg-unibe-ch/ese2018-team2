import { JobResolvers } from "../__generated__/graphqlgen";

export const Job: JobResolvers.Type = {
  ...JobResolvers.defaultResolvers,
  applied: (parent, _, ctx) =>
    ctx.jobApplicationRepository.isApplied(parent.id, ctx.session)
};

export default Job;
