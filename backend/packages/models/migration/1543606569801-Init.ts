import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1543606569801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "jobApplications_state_enum" AS ENUM('PENDING', 'REJECTED', 'APPROVED')`);
        await queryRunner.query(`CREATE TABLE "jobApplications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "jobApplications_state_enum" NOT NULL DEFAULT 'PENDING', "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "userId" uuid, "jobId" uuid, CONSTRAINT "PK_7de019fff1d3968233e5d354dbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sequenceNumber" BIGSERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studentProfiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "studyProgram" text NOT NULL, "university" text NOT NULL, "studentId" uuid, CONSTRAINT "REL_dc67d969b66ee433ddb6825c90" UNIQUE ("studentId"), CONSTRAINT "PK_fea32f01cdb61a03ca60525cfa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" text NOT NULL, "lastname" text NOT NULL, "phone" text NOT NULL, "email" citext NOT NULL, "username" citext, "password" text NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "siteAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "approved" boolean NOT NULL DEFAULT false, "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "salary" float NOT NULL, "sequenceNumber" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" integer NOT NULL, "start" date NOT NULL, "end" TIMESTAMP, "organizationId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmarks" ("usersId" uuid NOT NULL, "jobsId" uuid NOT NULL, CONSTRAINT "PK_59b0563d7b6f7758e9f369bb324" PRIMARY KEY ("usersId", "jobsId"))`);
        await queryRunner.query(`CREATE TABLE "users_skills" ("usersId" uuid NOT NULL, "skillsId" uuid NOT NULL, CONSTRAINT "PK_5e655012663719d6320c0a2a5ba" PRIMARY KEY ("usersId", "skillsId"))`);
        await queryRunner.query(`CREATE TABLE "organizations_users" ("organizationsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_da93ab06ae4af19e3a142813950" PRIMARY KEY ("organizationsId", "usersId"))`);
        await queryRunner.query(`CREATE TABLE "jobs_skills" ("jobsId" uuid NOT NULL, "skillsId" uuid NOT NULL, CONSTRAINT "PK_00889e4f99a8e183b24d6fb937a" PRIMARY KEY ("jobsId", "skillsId"))`);
        await queryRunner.query(`ALTER TABLE "jobApplications" ADD CONSTRAINT "FK_14cbb9979268be97fbbcbcc156d" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "jobApplications" ADD CONSTRAINT "FK_4fd9e5d5ddcf14514eb36e7d44e" FOREIGN KEY ("jobId") REFERENCES "jobs"("id")`);
        await queryRunner.query(`ALTER TABLE "studentProfiles" ADD CONSTRAINT "FK_dc67d969b66ee433ddb6825c90b" FOREIGN KEY ("studentId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_4d0391697f8d396f21846c8784a" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_skills" ADD CONSTRAINT "FK_8f15d69471038e9f128fc6a1c92" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_skills" ADD CONSTRAINT "FK_d109e7800e9d15f4993e44f8b52" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizations_users" ADD CONSTRAINT "FK_c00bc2922da6310512964d28729" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizations_users" ADD CONSTRAINT "FK_b5aa17c39b722cb9bc25a3d139d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobs_skills" ADD CONSTRAINT "FK_3ffeca96c20aff476fac6183024" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobs_skills" ADD CONSTRAINT "FK_65fc67dbfa780f25446327b7e01" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "jobs_skills" DROP CONSTRAINT "FK_65fc67dbfa780f25446327b7e01"`);
        await queryRunner.query(`ALTER TABLE "jobs_skills" DROP CONSTRAINT "FK_3ffeca96c20aff476fac6183024"`);
        await queryRunner.query(`ALTER TABLE "organizations_users" DROP CONSTRAINT "FK_b5aa17c39b722cb9bc25a3d139d"`);
        await queryRunner.query(`ALTER TABLE "organizations_users" DROP CONSTRAINT "FK_c00bc2922da6310512964d28729"`);
        await queryRunner.query(`ALTER TABLE "users_skills" DROP CONSTRAINT "FK_d109e7800e9d15f4993e44f8b52"`);
        await queryRunner.query(`ALTER TABLE "users_skills" DROP CONSTRAINT "FK_8f15d69471038e9f128fc6a1c92"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_4d0391697f8d396f21846c8784a"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9"`);
        await queryRunner.query(`ALTER TABLE "studentProfiles" DROP CONSTRAINT "FK_dc67d969b66ee433ddb6825c90b"`);
        await queryRunner.query(`ALTER TABLE "jobApplications" DROP CONSTRAINT "FK_4fd9e5d5ddcf14514eb36e7d44e"`);
        await queryRunner.query(`ALTER TABLE "jobApplications" DROP CONSTRAINT "FK_14cbb9979268be97fbbcbcc156d"`);
        await queryRunner.query(`DROP TABLE "jobs_skills"`);
        await queryRunner.query(`DROP TABLE "organizations_users"`);
        await queryRunner.query(`DROP TABLE "users_skills"`);
        await queryRunner.query(`DROP TABLE "bookmarks"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "studentProfiles"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "jobApplications"`);
        await queryRunner.query(`DROP TYPE "jobApplications_state_enum"`);
    }

}
