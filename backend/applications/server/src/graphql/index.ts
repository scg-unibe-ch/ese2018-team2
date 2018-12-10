import Mutation from "./resolvers/_mutations";
import Query from "./resolvers/_queries";
import Job from "./resolvers/Job";
import User from "./resolvers/User";
import OrganizationJob from "./resolvers/OrganizationJob";

const resolvers = {
    Query,
    Mutation,
    Job,
    OrganizationJob,
    User
};

export default resolvers;
