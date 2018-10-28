import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1539529717124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "salary" float NOT NULL, "start" date NOT NULL, "end" TIMESTAMP, "organizationId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" text NOT NULL, "lastname" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "university" text NOT NULL, "studyProgramm" text NOT NULL, "bio" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs_skills_skills" ("jobsId" uuid NOT NULL, "skillsId" uuid NOT NULL, CONSTRAINT "PK_d749928bbb99a04c25d94691719" PRIMARY KEY ("jobsId", "skillsId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_skills" ADD CONSTRAINT "FK_d845ed751d3175d9d78a9abd437" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_skills" ADD CONSTRAINT "FK_5694ac0d2b6da31c7a6ad7c13bc" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_skills" DROP CONSTRAINT "FK_5694ac0d2b6da31c7a6ad7c13bc"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs_skills_skills" DROP CONSTRAINT "FK_d845ed751d3175d9d78a9abd437"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9"`
    );
    await queryRunner.query(`DROP TABLE "jobs_skills_skills"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "skills"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
  }
}
