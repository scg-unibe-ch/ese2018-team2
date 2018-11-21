import { QueryResolvers } from "../../__generated__/graphqlgen";
import jobs from "./jobs";
import me from "./me";
import organizations from "./organizations";
import applications from "./applications";
import roles from "./roles";

export const Query: QueryResolvers.Type = {
  jobs,
  roles,
  organizations,
  me,
  applications
};

export default Query;
