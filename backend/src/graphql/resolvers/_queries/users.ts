import { QueryResolvers } from "src/graphql/__generated__/graphqlgen";

const users: QueryResolvers.UsersResolver = (
  _,
  args,
  { session, userRepository }
) => userRepository.findUsers({ onlyAdmins: args.onlyAdmins, id: args.id }, session);

export default users;
