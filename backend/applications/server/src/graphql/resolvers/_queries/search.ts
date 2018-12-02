import { Resolvers, QueryResolvers } from "src/graphql/__generated__/graphqlgen";
import { SearchConnection } from "src/types";

const search: QueryResolvers.SearchResolver = (_, { search, maxSalary, minSalary }, ctx) => (
  ctx.jobRepository.search(search, minSalary, maxSalary)
)

export default search;
