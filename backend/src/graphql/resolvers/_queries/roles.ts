import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.RolesResolver = (_, args, ctx) => {
  return ctx.roleRepository.getRoles(args);
};

export default resolver;
