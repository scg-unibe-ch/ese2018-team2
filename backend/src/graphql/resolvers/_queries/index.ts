import { QueryResolvers } from "../../__generated__/graphqlgen";
import jobs from "./jobs";
import me from "./me";
import organizations from "./organizations";

export const Query: QueryResolvers.Type = {
  jobs,
  organizations,
  me
};

export default Query;
