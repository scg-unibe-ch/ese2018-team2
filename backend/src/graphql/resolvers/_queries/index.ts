import { QueryResolvers } from "../../__generated__/graphqlgen";

import jobs from "./jobs"
import organizations from "./organizations"

export const Query: QueryResolvers.Type = {
  jobs,
  organizations
};

export default Query;