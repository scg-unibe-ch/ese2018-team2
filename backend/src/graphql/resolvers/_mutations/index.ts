import { MutationResolvers } from "../../__generated__/graphqlgen";
import createJob from "./createJob";
import createOrganization from "./createOrganization";
import deleteJob from "./deleteJob";
import login from "./login";
import logout from "./logout";
import updateJob from "./updateJob";
import bookmarkJob from "./bookmarkJob";
import unbookmarkJob from "./unbookmarkJob";

export const Mutation: MutationResolvers.Type = {
  createJob,
  updateJob,
  deleteJob,
  createOrganization,
  login,
  logout,
  bookmarkJob,
  unbookmarkJob
};

export default Mutation;
