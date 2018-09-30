import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1538334286302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
