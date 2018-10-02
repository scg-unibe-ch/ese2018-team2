import "reflect-metadata";
import { createConnection } from "typeorm";

import { Job } from "./entity/Job";

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { Init1538501665722 } from "./migration/1538501665722-Init";

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
      Init1538501665722
    ],
    logging: true
  }
  ).then(async connection => {
    await connection.runMigrations({transaction: true});

    await connection.getRepository(Job).clear();
});

const typeDefs = importSchema("./src/schema.graphql");

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));