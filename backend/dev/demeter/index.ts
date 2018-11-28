import bcrypt from "bcryptjs";
import { createConnection } from "typeorm";
import entity from "../../src/entity";
import { Organization } from "../../src/entity/Organization";
import { User } from "../../src/entity/User";
import users from "./users";
import { Job } from "../../src/entity/Job";
import generateTitle from "./rnd/buzz";
import { Role } from "../../src/entity/Role";
import { elasticClient, uploadJobs } from "../../src/lib/elastic";

function sleep(millis: number) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

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
    .map((_, index) => ({
        name: `Organization ${index + 1}`,
        email: `info@organization_${index + 1}.ch`,
        phone: `+4123 456 78 ${index + 1}`,
    }));

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
  const roleNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  for (let i = 0; i < roleNames.length; i++) {
    const role = new Role();
    role.title = roleNames[i];
    role.description = `Role ${1}`;

    await connection.getRepository(Role).save(role);
  }

  const roles = await connection.getRepository(Role).find();

  for (let i = 0; i < 200; i++) {
    const job = new Job();
    job.start = new Date();
    job.title = generateTitle();
    job.description = `Job ${i + 1}`;
    job.organization =
      organizations[Math.floor(Math.random() * organizations.length)];
    job.salary = Math.random() * 10;
    job.roles = [roles[Math.floor(Math.random() * roles.length)]];

    await connection.getRepository(Job).save(job);
  }

  // Init
  while (true) {
    try {
      console.log("Try to connect");
      await elasticClient.ping({ requestTimeout: 300000 });
      break;
    } catch (e) {}
    await sleep(5000);
  }

  await uploadJobs(
    connection,
    await connection.getRepository(Job).find({ relations: ["roles"] })
  );

  console.log("Ich habe fertig.");

  await connection.close();
})();
