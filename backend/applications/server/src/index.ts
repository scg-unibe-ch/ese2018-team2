import "reflect-metadata";
import config from "@unijobs/backend-modules-config";
import { Job, JobApplication, Organization, Skill, StudentProfile, User } from "@unijobs/backend-modules-models";
import { JobApplicationRepository, JobRepository, OrganizationRepository, SkillRepository, UserRepository, StudentProfileRepository } from "@unijobs/backend-modules-repositories";
import bcrypt from "bcryptjs";
import createRedisStore from "connect-redis";
import session from "express-session";
import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import resolvers from "./graphql";
import client from "./lib/redis";

//TODO environment variable for logging (e.g. NODE_ENV)
createConnection({
  type: "postgres",
  url: config.get("database_url"),
  entities: [Job, Organization, User, Skill, JobApplication, StudentProfile],
  logging: true
}).then(async connection => {
  const typeDefs = importSchema("./schema.graphql");

  const jobRepository = new JobRepository(connection);
  const organizationRepository = new OrganizationRepository(connection);
  const userRepository = new UserRepository(connection);
  const applicationRepository = new JobApplicationRepository(connection);
  const skillRepository = new SkillRepository(connection);
  const studentProfileRepository = new StudentProfileRepository(connection);

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
    skillRepository,
    studentProfileRepository,
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
