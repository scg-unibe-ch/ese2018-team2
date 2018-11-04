import { QueryResolvers } from "../../__generated__/graphqlgen";

const myLikes: QueryResolvers.MyLikesResolver = (
  _,
  args,
  { session, userRepository }
) => userRepository.getMyLikes(session);

export default myLikes;
