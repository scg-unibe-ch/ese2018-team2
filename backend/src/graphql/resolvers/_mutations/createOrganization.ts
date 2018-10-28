import { MutationResolvers } from "../../__generated__/graphqlgen";

const createOrganization: MutationResolvers.CreateOrganizationResolver = (
  _,
  args,
  ctx
) => {
  return ctx.organizationRepository.createOrganization(args.name);
};

export default createOrganization;
