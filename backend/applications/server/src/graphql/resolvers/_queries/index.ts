import {QueryResolvers} from "../../__generated__/graphqlgen";
import jobs from "./jobs";
import me from "./me";
import organizations from "./organizations";
import applications from "./applications";
import skills from "./skills";
import users from "./users";
import search from "./search";
import searchAutocompletions from "./searchAutocompletions";
import job from "./job"
import applicationsForJob from "./applicationsForJob";
import getOrganizationJobs from "./getOrganizationJobs";

export const Query: QueryResolvers.Type = {
    jobs,
    skills,
    organizations,
    me,
    applications,
    applicationsForJob,
    getOrganizationJobs,
    users,
    search,
    searchAutocompletions,
    job
};

export default Query;
