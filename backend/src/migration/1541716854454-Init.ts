import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1541716854454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" text NOT NULL, "lastname" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "salary" float NOT NULL, "start" date NOT NULL, "end" TIMESTAMP, "organizationId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "applications_state_enum" AS ENUM('PENDING', 'REJECTED', 'APPROVED')`
    );
    await queryRunner.query(
      `CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "applications_state_enum" NOT NULL DEFAULT 'PENDING', "userId" uuid, "jobId" uuid, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("usersId" uuid NOT NULL, "jobsId" uuid NOT NULL, CONSTRAINT "PK_59b0563d7b6f7758e9f369bb324" PRIMARY KEY ("usersId", "jobsId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "FK_f6ebb8bc5061068e4dd97df3c77" FOREIGN KEY ("jobId") REFERENCES "jobs"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_4d0391697f8d396f21846c8784a" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_4d0391697f8d396f21846c8784a"`
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_b0075fdec79957795cd75fb7bb9"`
    );
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_f6ebb8bc5061068e4dd97df3c77"`
    );
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_08bdc8b939f39e6d55b4c38cfb9"`
    );
    await queryRunner.query(`DROP TABLE "bookmarks"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "applications"`);
    await queryRunner.query(`DROP TYPE "applications_state_enum"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
  }
}
