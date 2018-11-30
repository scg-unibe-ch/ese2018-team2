import { Job, JobApplication, Organization, Skill, User, StudentProfile } from "@unijobs/backend-modules-models";
import { elasticClient, uploadJobs } from "@unijobs/backend-modules-search";
import bcrypt from "bcryptjs";
import { createConnection } from "typeorm";
import generateTitle from "./rnd/buzz";
import users from "./users";

function sleep(millis: number) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

(async function() {
  const connection = await createConnection({
    type: "postgres",
    url: "postgres://postgres@localhost:5432/postgres",
    entities: [
      Job, Organization, Skill, User, JobApplication, StudentProfile
    ],
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

  const organizationsToInsert = new Array(20).fill({}).map((_, index) => ({
    name: `Organization ${index + 1}`,
    email: `info@organization_${index + 1}.ch`,
    phone: `+4123 456 78 ${index + 1}`
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

  const studentProfile = new StudentProfile();
  studentProfile.university = "Uni Bern";
  studentProfile.studyProgram = "Informatik";
  await connection.getRepository(StudentProfile).save(studentProfile);

  const studentProfileToInsert = await connection
    .getRepository(StudentProfile)
    .find(studentProfile);

  const student = new User();
  student.studentProfile = studentProfileToInsert[0];
  student.firstname = "Student";
  student.lastname = "Student";
  student.email = "student.student@students.unibe.ch";
  student.password = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
  student.phone = "123";
  await connection.getRepository(User).save(student);

  const user = new User();
  user.firstname = "Org";
  user.lastname = "Org";
  user.email = "org";
  user.password = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
  user.phone = "";
  user.employer = [organizations[0]];
  await connection.getRepository(User).save(user);
  const skillNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  for (let i = 0; i < skillNames.length; i++) {
    const skill = new Skill();
    skill.title = skillNames[i];
    skill.description = `Skill ${1}`;

    await connection.getRepository(Skill).save(skill);
  }

  const skills = await connection.getRepository(Skill).find();

  for (let i = 0; i < 200; i++) {
    const job = new Job();
    job.start = new Date();
    job.title = generateTitle();
    job.description = `Job ${i + 1}`;
    job.organization =
      organizations[Math.floor(Math.random() * organizations.length)];
    job.salary = Math.random() * 10;
    job.skills = [skills[Math.floor(Math.random() * skills.length)]];

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
    await connection.getRepository(Job).find({ relations: ["skills"] })
  );

  console.log("Ich habe fertig.");

  await connection.close();
})();
