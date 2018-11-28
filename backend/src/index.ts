import bcrypt from "bcryptjs";
import createRedisStore from "connect-redis";
import session from "express-session";
import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./config";
import { Job } from "./entity/Job";
import { JobApplication } from "./entity/JobApplication";
import { Organization } from "./entity/Organization";
import { Role } from "./entity/Role";
import { User } from "./entity/User";
import resolvers from "./graphql";
import client from "./lib/redis";
import { Init1543407057561 } from "./migration/1543407057561-Init";
import { JobApplicationRepository } from "./repository/JobApplicationRepository";
import { JobRepository } from "./repository/JobRepository";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import { RoleRepository } from "./repository/RoleRepository";
import { UserRepository } from "./repository/UserRepository";

//TODO environment variable for logging (e.g. NODE_ENV)
createConnection({
  type: "postgres",
  url: config.get("database_url"),
  entities: [Job, Organization, User, Role, JobApplication],
  migrations: [Init1543407057561],
  logging: true
}).then(async connection => {
  await connection.runMigrations({ transaction: true });
  const typeDefs = importSchema("./schema.graphql");

  const jobRepository = new JobRepository(connection);
  const organizationRepository = new OrganizationRepository(connection);
  const userRepository = new UserRepository(connection);
  const applicationRepository = new JobApplicationRepository(connection);
  const roleRepository = new RoleRepository(connection);

  const adminAvailable =
    (await connection.getRepository(User).find({ email: "admin@example.com" }))
      .length > 0;

  if (!adminAvailable) {
    // Only seed admin user
    // TODO this has to be in a database patch later
    const admin = new User();
    admin.email = "admin@example.com";
    admin.firstname = "Noe";
    admin.lastname = "Müller";
    admin.password = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
    admin.phone = "+41 123 456 34 34";
    admin.siteAdmin = true;
  }

  // @ts-ignore
  const context = ({ request }) => ({
    jobRepository,
    organizationRepository,
    userRepository,
    applicationRepository,
    roleRepository,
    session: request.session
  });

  const server = new GraphQLServer({ typeDefs, resolvers, context } as any);

  server.express.use(
    session({
      store: new (createRedisStore(session))({
        client: client
      }),
      secret: "secret",
      cookie: { maxAge: 3600000 },
      saveUninitialized: true,
      resave: true,
      name: "sid"
    })
  );

  const opts = {
    port: 4000,
    cors: {
      credentials: true,
      origin: ["http://localhost:3000", "http://localhost:4000"] // your frontend url.
    }
  };

  server.start(opts, () =>
    console.log("Server is running on http://localhost:4000")
  );
});
