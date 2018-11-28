import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.OrganizationsResolver = (_, { organizationId }, { session, organizationRepository }) => (
  organizationRepository.getOrganizations(session, organizationId)
);

export default resolver;
