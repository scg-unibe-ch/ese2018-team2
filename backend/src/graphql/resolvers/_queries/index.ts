import { QueryResolvers } from "../../__generated__/graphqlgen";
import jobs from "./jobs";
import me from "./me";
import organizations from "./organizations";
import applications from "./applications";

export const Query: QueryResolvers.Type = {
  jobs,
  organizations,
  me,
  applications
};

export default Query;
