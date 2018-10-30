import { MutationResolvers } from "../../__generated__/graphqlgen";

const login: MutationResolvers.LoginResolver = (_, args, ctx) => {
  ctx.session.user = { name: "Test" }; //TEST
  return true;
};

export default login;
