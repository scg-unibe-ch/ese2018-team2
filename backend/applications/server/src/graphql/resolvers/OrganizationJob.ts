import {OrganizationJobResolvers} from "../__generated__/graphqlgen";

const OrganizationJob: OrganizationJobResolvers.Type = {
    ...OrganizationJobResolvers.defaultResolvers,
    applicationCount: ({id}, args, {jobApplicationRepository, session}) =>
        jobApplicationRepository.applicationsCount(id, session),
};

export default OrganizationJob;
