import Mutation from "./resolvers/_mutations";
import Query from "./resolvers/_queries";
import Job from "./resolvers/Job";
import User from "./resolvers/User";

const resolvers = {
  Query,
  Mutation,
  Job,
  User
};

export default resolvers;
