import { MutationResolvers } from "../../__generated__/graphqlgen";
import addBookmark from "./addBookmark";
import applyForJob from "./applyForJob";
import approveJobApplication from "./approveJobApplication";
import approveOrganization from "./approveOrganization";
import createJob from "./createJob";
import createOrganization from "./createOrganization";
import createPage from "./createPage";
import createSkill from "./createSkill";
import deleteJob from "./deleteJob";
import deleteOrganization from "./deleteOrganization";
import login from "./login";
import logout from "./logout";
import rejectJobApplication from "./rejectJobApplication";
import removeBookmark from "./removeBookmark";
import sendEmailTo from "./sendEmailTo";
import updateJob from "./updateJob";

export const Mutation: MutationResolvers.Type = {
  createJob,
  updateJob,
  deleteJob,
  createOrganization,
  approveOrganization,
  deleteOrganization,
  createSkill,
  login,
  logout,
  addBookmark,
  removeBookmark,
  applyForJob,
  approveJobApplication,
  rejectJobApplication,
  sendEmailTo,
  createPage
};

export default Mutation;
