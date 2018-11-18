import bcrypt from "bcryptjs";
import session from "express-session";
import createRedisStore from "connect-redis";
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
import { JobApplicationRepository } from "./repository/JobApplicationRepository";
import { JobRepository } from "./repository/JobRepository";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import { UserRepository } from "./repository/UserRepository";
import client from "./lib/redis";
import { Init1542577295817 } from "./migration/1542577295817-Init";

//TODO environment variable for logging (e.g. NODE_ENV)
createConnection({
  type: "postgres",
  url: config.get("database_url"),
  entities: [Job, Organization, User, Role, JobApplication],
  migrations: [Init1542577295817],
  logging: true
}).then(async connection => {
  await connection.runMigrations({ transaction: true });
  const typeDefs = importSchema("./schema.graphql");

  const jobRepository = new JobRepository(connection);
  const organizationRepository = new OrganizationRepository(connection);
  const userRepository = new UserRepository(connection);
  const applicationRepository = new JobApplicationRepository(connection);

  const adminAvailable =
    (await connection.getRepository(User).find({ email: "admin@example.com" }))
      .length > 0;

  if (!adminAvailable) {
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
      .from(JobApplication)
      .execute();

    const exampleOrgs = ["Organization 1", "Organization 2", "Organization 3"];
    const orgs = [];

    for (let i = 0; i < exampleOrgs.length; i++) {
      const org = await organizationRepository.createOrganization(
        exampleOrgs[i]
      );
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
    admin.admin = true;

    await connection.getRepository(User).save(admin);

    const employee = new User();
    employee.email = "employee@example.com";
    employee.firstname = "Miles";
    employee.lastname = "Stone";
    employee.password = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
    employee.phone = "+41 987 654 76 76";

    await connection.getRepository(User).save(employee);
  }

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

  server.start(opts, () => console.log("Server is running on localhost:4000"));
});
