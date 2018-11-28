import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.JobResolver = (_, { id }, { jobRepository }) =>
  jobRepository.getJobById(id);

export default resolver;
