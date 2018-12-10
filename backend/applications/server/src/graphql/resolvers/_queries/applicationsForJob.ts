import { QueryResolvers } from "../../__generated__/graphqlgen";

const applicationsForJob: QueryResolvers.ApplicationsForJobResolver = (_, args, ctx) => {
    return ctx.jobApplicationRepository.getApplicationsForJob(args.jobId, ctx.session);
};

export default applicationsForJob;
