import { QueryResolvers } from "src/graphql/__generated__/graphqlgen";

const search: QueryResolvers.SearchResolver = (
  _,
  { search, maxSalary, minSalary },
  { jobRepository, session }
) => jobRepository.search(search, minSalary, maxSalary, session);

export default search;
