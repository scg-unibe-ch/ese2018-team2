import "reflect-metadata";
import { createConnection } from "typeorm";

import { Job } from "./entity/Job";

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { Init1538386311316 } from "./migration/1538386311316-Init";

createConnection(
  {
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "postgres",
    username: "postgres",
    password: "",
    entities: [
      Job
    ],
    migrations: [
      Init1538386311316
    ],
    logging: true
  }
  ).then(async connection => {
    await connection.runMigrations({transaction: true});

    const job = new Job();
    job.title = "Hello world";
    job.description = "This is a test description";

    await connection.getRepository(Job).save(job);
});

const typeDefs = importSchema("./src/schema.graphql");

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));