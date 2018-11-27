import bcrypt from "bcryptjs";
import { createConnection } from "typeorm";
import entity from "../../src/entity";
import { Organization } from "../../src/entity/Organization";
import { User } from "../../src/entity/User";
import users from "./users";
import { Job } from "../../src/entity/Job";
import generateTitle from "./rnd/buzz";

(async function() {
  const connection = await createConnection({
    type: "postgres",
    url: "postgres://postgres@localhost:5432/postgres",
    entities: entity,
    logging: true
  });

  const usersToInsert = users.map(u => ({
    ...u,
    password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10))
  }));

  await connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(usersToInsert)
    .execute();

  const organizationsToInsert = new Array(20)
    .fill({})
    .map((_, index) => ({ name: `Organization ${index + 1}` }));

  await connection
    .createQueryBuilder()
    .insert()
    .into(Organization)
    .values(organizationsToInsert)
    .execute();

  const organizations = await connection
    .getRepository(Organization)
    .find({ take: organizationsToInsert.length - 2 });

  const user = new User();
  user.firstname = "Org";
  user.lastname = "Org";
  user.email = "org";
  user.password = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
  user.phone = ""
  user.employer = [organizations[0]]
  await connection.getRepository(User).save(user);

  for (let i = 0; i < 200; i++) {
    const job = new Job();
    job.start = new Date();
    job.title = generateTitle();
    job.description = `Job ${i + 1}`;
    job.organization =
      organizations[Math.floor(Math.random() * organizations.length)];
    job.salary = Math.random() * 10;

    await connection.getRepository(Job).save(job);
  }

  console.log("Ich habe fertig.");

  await connection.close();
})();
