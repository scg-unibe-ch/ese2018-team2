import "reflect-metadata";
import { createConnection } from "typeorm";

import { Job } from "./entity/Job";

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { JobRepository } from "./repository/JobRepository";
import { Organization } from "./entity/Organization";
import { User } from "./entity/User";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import config from "./config";
import { Init1539529717124 } from "./migration/1539529717124-Init";
import { Skill } from "./entity/Skill";

//TODO environment variable for logging (e.g. NODE_ENV)
createConnection({
  type: "postgres",
  url: config.get("database_url"),
  entities: [Job, Organization, User, Skill],
  migrations: [Init1539529717124],
  logging: true
}).then(async connection => {
  await connection.runMigrations({ transaction: true });
  const typeDefs = importSchema("./schema.graphql");

  const context = {
    jobRepository: new JobRepository(connection),
    organizationRepository: new OrganizationRepository(connection)
  };

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

  const exampleOrgs = ["Organization 1", "Organization 2", "Organization 3"];
  const orgs = [];

  for (let i = 0; i < exampleOrgs.length; i++) {
    const org = await context.organizationRepository.createOrganization(
      exampleOrgs[i]
    );
    orgs.push(org);
  }

  const exampleJobs = ["Job 1", "Job 2", "Job 3"];
  for (let i = 0; i < exampleJobs.length; i++) {
    await context.jobRepository.createJob({
      input: {
        title: exampleJobs[i],
        organization: orgs[i].id,
        description: "",
        start: new Date(),
        salary: 10
      }
    });
  }

  const server = new GraphQLServer({ typeDefs, resolvers, context });
  server.start(() => console.log("Server is running on localhost:4000"));
});
