import { QueryResolvers } from "../../__generated__/graphqlgen";

const me: QueryResolvers.MeResolver = (_, args, { session, userRepository }) =>
  userRepository.getMe(session);

export default me;
