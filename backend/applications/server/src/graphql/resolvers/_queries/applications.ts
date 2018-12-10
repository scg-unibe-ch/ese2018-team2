import { QueryResolvers } from "../../__generated__/graphqlgen";

const applications: QueryResolvers.ApplicationsResolver = (_, args, ctx) => {
  return ctx.jobApplicationRepository.getApplications(args, ctx.session);
};

export default applications;
