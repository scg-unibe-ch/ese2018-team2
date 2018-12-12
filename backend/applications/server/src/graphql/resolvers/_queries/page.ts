import { QueryResolvers } from "src/graphql/__generated__/graphqlgen";

const page: QueryResolvers.PageResolver = (
  _,
  { pageSlug },
  { organizationRepository }
) => organizationRepository.getJobsForPage(pageSlug);

export default page;
