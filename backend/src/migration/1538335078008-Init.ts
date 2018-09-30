import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1538335078008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")`);
    }

}
