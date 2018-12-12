import { MutationResolvers } from "src/graphql/__generated__/graphqlgen";

const createPage: MutationResolvers.CreatePageResolver = (
  parent,
  { organizationSlug, studyProgramSlugs },
  { session, organizationRepository }
) =>
  organizationRepository.createPage(
    organizationSlug,
    studyProgramSlugs,
    session
  );

export default createPage;
