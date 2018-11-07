import { MutationResolvers } from "../../__generated__/graphqlgen";
import createJob from "./createJob";
import createOrganization from "./createOrganization";
import deleteJob from "./deleteJob";
import login from "./login";
import logout from "./logout";
import updateJob from "./updateJob";
import addBookmark from "./addBookmark";
import removeBookmark from "./removeBookmark";
import approve from "./approve";
import apply from "./apply";

export const Mutation: MutationResolvers.Type = {
  createJob,
  updateJob,
  deleteJob,
  createOrganization,
  login,
  logout,
  addBookmark,
  removeBookmark,
  apply,
  approve
};

export default Mutation;
