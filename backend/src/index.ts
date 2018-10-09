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
  const typeDefs = importSchema("./src/schema.graphql");

  const context = {
    jobRepository: new JobRepository(connection),
    organizationRepository: new OrganizationRepository(connection)
  };

  const server = new GraphQLServer({ typeDefs, resolvers, context });
  server.start(() => console.log("Server is running on localhost:4000"));
});
