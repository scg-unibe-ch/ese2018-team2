import { QueryResolvers } from "../../__generated__/graphqlgen";
import jobs from "./jobs";
import me from "./me";
import organizations from "./organizations";
import applications from "./applications";
import roles from "./roles";
import users from "./users";
import search from "./search";
import searchAutocompletions from "./searchAutocompletions";

export const Query: QueryResolvers.Type = {
  jobs,
  roles,
  organizations,
  me,
  applications,
  users,
  search,
  searchAutocompletions
};

export default Query;
