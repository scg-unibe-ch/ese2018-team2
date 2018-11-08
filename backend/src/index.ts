import "reflect-metadata";
import bcrypt from "bcryptjs";
import { createConnection } from "typeorm";

import { Job } from "./entity/Job";

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import resolvers from "./graphql";
import { JobRepository } from "./repository/JobRepository";
import { Organization } from "./entity/Organization";
import { User } from "./entity/User";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import config from "./config";
import { Role } from "./entity/Role";
import session from "express-session";
import { UserRepository } from "./repository/UserRepository";
import { Application } from "./entity/Application";
import { ApplicationRepository } from "./repository/ApplicationRepository";
import { Init1541694746283 } from "./migration/1541694746283-Init";

//TODO environment variable for logging (e.g. NODE_ENV)
createConnection({
  type: "postgres",
  url: config.get("database_url"),
  entities: [Job, Organization, User, Role, Application],
  migrations: [Init1541694746283],
  logging: true
}).then(async connection => {
  await connection.runMigrations({ transaction: true });
  const typeDefs = importSchema("./schema.graphql");

  const jobRepository = new JobRepository(connection);
  const organizationRepository = new OrganizationRepository(connection);
  const userRepository = new UserRepository(connection);
  const applicationRepository = new ApplicationRepository(connection);

  // SEED TODO env-variable for seeding
  await connection
    .createQueryBuilder()
    .delete()
    .from(Job)
    .execute();
  await connection
    .createQueryBuilder()
    .delete()
    .from(Organization)
    .execute();
  await connection
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();
  await connection
    .createQueryBuilder()
    .delete()
    .from("bookmarks")
    .execute();
  await connection
    .createQueryBuilder()
    .delete()
    .from(Application)
    .execute();

  const exampleOrgs = ["Organization 1", "Organization 2", "Organization 3"];
  const orgs = [];

  for (let i = 0; i < exampleOrgs.length; i++) {
    const org = await organizationRepository.createOrganization(exampleOrgs[i]);
    orgs.push(org);
  }

  const exampleJobs = ["Job 1", "Job 2", "Job 3"];
  for (let i = 0; i < exampleJobs.length; i++) {
    await jobRepository.createJob({
      input: {
        title: exampleJobs[i],
        organization: orgs[i].id,
        description: "",
        start: new Date(),
        salary: 10
      }
    });
  }

  const admin = new User();
  admin.email = "admin@example.com";
  admin.firstname = "Noe";
  admin.lastname = "Müller";
  admin.password = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
  admin.phone = "+41 123 456 34 34";

  await connection.getRepository(User).save(admin);

  // @ts-ignore
  const context = ({ request }) => ({
    jobRepository,
    organizationRepository,
    userRepository,
    applicationRepository,
    session: request.session
  });

  const server = new GraphQLServer({ typeDefs, resolvers, context } as any);

  server.express.use(
    session({
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

  server.start(opts, () => console.log("Server is running on localhost:4000"));
});
