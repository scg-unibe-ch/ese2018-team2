import Job from "./resolvers/Job";
import Organization from "./resolvers/Organization";
import OrganizationJob from "./resolvers/OrganizationJob";
import User from "./resolvers/User";
import Mutation from "./resolvers/_mutations";
import Query from "./resolvers/_queries";

const resolvers = {
  Query,
  Mutation,
  Job,
  OrganizationJob,
  User,
  Organization
};

export default resolvers;
