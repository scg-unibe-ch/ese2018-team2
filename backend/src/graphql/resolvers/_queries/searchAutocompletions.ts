import { QueryResolvers } from "src/graphql/__generated__/graphqlgen";

const resolver: QueryResolvers.SearchAutocompletionsResolver = (_, {value}, { jobRepository }) => (
  jobRepository.getCompletions(value)
)

export default resolver;
