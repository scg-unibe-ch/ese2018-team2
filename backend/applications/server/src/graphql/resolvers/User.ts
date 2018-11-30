import { UserResolvers } from "../__generated__/graphqlgen";

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  hasOrganizations: ({ id }, args, { userRepository, session }) =>
    userRepository.hasUserOrganization(id, session),
  isStudent: ({ id }, args, { userRepository, session }) =>
    userRepository.hasStudentProfile(id, session)
};

export default User;
