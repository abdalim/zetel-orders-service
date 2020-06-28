import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1593350048694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('ordersdb', true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropDatabase('ordersdb', true)
    }

}
