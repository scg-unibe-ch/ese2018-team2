import { QueryResolvers } from "../../__generated__/graphqlgen";
import applications from "./applications";
import applicationsForJob from "./applicationsForJob";
import availableStudyPrograms from "./availableStudyPrograms";
import getOrganizationJobs from "./getOrganizationJobs";
import job from "./job";
import jobs from "./jobs";
import me from "./me";
import organizations from "./organizations";
import search from "./search";
import searchAutocompletions from "./searchAutocompletions";
import skills from "./skills";
import users from "./users";
import page from "./page";

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
  job,
  availableStudyPrograms,
  page
};

export default Query;
