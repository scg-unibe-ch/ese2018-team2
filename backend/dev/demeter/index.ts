import { createConnection, Connection } from "typeorm";
import bcrypt from "bcryptjs";
import entity from "../../src/entity";
import { User } from "../../src/entity/User";
import users from "./users";

(async function() {
  const connection = await createConnection({
    type: "postgres",
    url: "postgres://postgres@localhost:5432/postgres",
    entities: entity,
    logging: true
  });

  const usersToInsert = users.map((u) => ({...u, password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10))}))

  await connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(usersToInsert)
    .execute();

  console.log("Ich habe fertig.");
})();
