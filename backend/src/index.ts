import "reflect-metadata";
import { createConnection } from "typeorm";

import { Job } from "./entity/Job";

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { JobRepository } from "./repository/JobRepository";
import { Init1539088687179 } from "./migration/1539088687179-Init";
import { Organization } from "./entity/Organization";
import { User } from "./entity/User";
import { OrganizationRepository } from "./repository/OrganizationRepository";

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "",
  entities: [Job, Organization, User],
  migrations: [Init1539088687179],
  logging: true
}).then(async connection => {
  await connection.runMigrations({ transaction: true });
  const typeDefs = importSchema("./schema.graphql");

  const context = {
    jobRepository: new JobRepository(connection),
    organizationRepository: new OrganizationRepository(connection)
  };

  // SEED
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
        description: ""
      }
    });
  }

  const server = new GraphQLServer({ typeDefs, resolvers, context });
  server.start(() => console.log("Server is running on localhost:4000"));
});
