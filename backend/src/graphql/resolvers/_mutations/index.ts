import { MutationResolvers } from "../../__generated__/graphqlgen";
import createJob from "./createJob";
import updateJob from "./updateJob";
import deleteJob from "./deleteJob";
import createOrganization from "./createOrganization";
import login from "./login";

export const Mutation: MutationResolvers.Type = {
  createJob,
  updateJob,
  deleteJob,
  createOrganization,
  login
};

export default Mutation;
