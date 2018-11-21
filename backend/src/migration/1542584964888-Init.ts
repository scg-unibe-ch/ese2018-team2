import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1542584964888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "jobApplications_state_enum" AS ENUM('PENDING', 'REJECTED', 'APPROVED')`
    );
    await queryRunner.query(
      `CREATE TABLE "jobApplications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "jobApplications_state_enum" NOT NULL DEFAULT 'PENDING', "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "userId" uuid, "jobId" uuid, CONSTRAINT "PK_7de019fff1d3968233e5d354dbe" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sequenceNumber" BIGSERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" text NOT NULL, "lastname" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "siteAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "salary" float NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "start" date NOT NULL, "end" TIMESTAMP, "organizationId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("usersId" uuid NOT NULL, "jobsId" uuid NOT NULL, CONSTRAINT "PK_59b0563d7b6f7758e9f369bb324" PRIMARY KEY ("usersId", "jobsId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "organisation_staff" ("organizationsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_1f99d1fc80c711002cb9cdd5adb" PRIMARY KEY ("organizationsId", "usersId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" ADD CONSTRAINT "FK_14cbb9979268be97fbbcbcc156d" FOREIGN KEY ("userId") REFERENCES "users"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" ADD CONSTRAINT "FK_4fd9e5d5ddcf14514eb36e7d44e" FOREIGN KEY ("jobId") REFERENCES "jobs"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_4d0391697f8d396f21846c8784a" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation_staff" ADD CONSTRAINT "FK_464773c7f13f22269da79a7de2f" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation_staff" ADD CONSTRAINT "FK_6ad3bb28bbaa3549d02c9a57b77" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "organisation_staff" DROP CONSTRAINT "FK_6ad3bb28bbaa3549d02c9a57b77"`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation_staff" DROP CONSTRAINT "FK_464773c7f13f22269da79a7de2f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_4d0391697f8d396f21846c8784a"`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" DROP CONSTRAINT "FK_4fd9e5d5ddcf14514eb36e7d44e"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobApplications" DROP CONSTRAINT "FK_14cbb9979268be97fbbcbcc156d"`
    );
    await queryRunner.query(`DROP TABLE "organisation_staff"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "bookmarks"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "jobApplications"`);
    await queryRunner.query(`DROP TYPE "jobApplications_state_enum"`);
  }
}
