import { QueryResolvers } from "../../__generated__/graphqlgen";

const myLikes: QueryResolvers.MyLikesResolver = (_, args, ctx) => {
  return ctx.userRepository.myLikes(ctx.session);
};

export default myLikes;
