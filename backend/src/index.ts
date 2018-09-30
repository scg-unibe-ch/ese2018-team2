import "reflect-metadata";
import { createConnection } from "typeorm";

import { Job } from "./entity/Job";

import { Init1538335078008 } from "./migration/1538335078008-Init";

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
      Init1538335078008
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
