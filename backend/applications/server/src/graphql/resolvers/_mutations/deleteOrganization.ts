import { MutationResolvers } from "../../__generated__/graphqlgen";

const deleteOrganization: MutationResolvers.DeleteOrganizationResolver = (_, args, ctx) => {
    return ctx.organizationRepository.deleteOrganization(args.organizationId);
};

export default deleteOrganization;
