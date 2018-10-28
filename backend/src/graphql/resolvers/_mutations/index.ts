import { MutationResolvers } from "../../__generated__/graphqlgen";
import createJob from "./createJob";
import updateJob from "./updateJob";
import deleteJob from "./deleteJob";
import createOrganization from "./createOrganization";

export const Mutation: MutationResolvers.Type = {
  createJob,
  updateJob,
  deleteJob,
  createOrganization
};

export default Mutation;
