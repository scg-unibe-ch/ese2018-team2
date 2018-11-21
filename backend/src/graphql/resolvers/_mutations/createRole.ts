import { MutationResolvers } from "../../__generated__/graphqlgen";

const resolver: MutationResolvers.CreateRoleResolver = (_, args, ctx) => {
  return ctx.roleRepository.createRole(args);
};

export default resolver;
