import { MutationResolvers } from "../../__generated__/graphqlgen";

const logout: MutationResolvers.LogoutResolver = async (
  _,
  args,
  { session }
) => {
  if (!session) {
    return true;
  }

  return new Promise<boolean>(resolve => {
    session.destroy(err => {
      if (err) {
        console.log(err);
      }
      resolve(true);
    });
  });
};

export default logout;
