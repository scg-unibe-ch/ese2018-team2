import { OrganizationResolvers } from "../__generated__/graphqlgen";

const Organization: OrganizationResolvers.Type = {
  ...OrganizationResolvers.defaultResolvers,
  pages: async (parent, args, { organizationRepository }) =>
    organizationRepository.getPages(parent.id) as any
};

export default Organization;
