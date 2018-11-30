import { MutationResolvers } from "../../__generated__/graphqlgen";

const login: MutationResolvers.LoginResolver = (_, { email, pw }, ctx) =>
  ctx.userRepository.login(email, pw, ctx.session);

export default login;
