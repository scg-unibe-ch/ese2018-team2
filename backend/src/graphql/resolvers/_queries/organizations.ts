import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.OrganizationsResolver = (_, args, ctx) => {
  return ctx.organizationRepository.getOrganizations();
};

export default resolver;
