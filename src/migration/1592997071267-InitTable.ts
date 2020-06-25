import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitTable1592997071267 implements MigrationInterface {
  name = 'InitTable1592997071267'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "order_status_enum" AS ENUM('created', 'confirmed', 'cancelled', 'delivered')`,
    )
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" "order_status_enum" NOT NULL DEFAULT 'created', "item" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order"`)
    await queryRunner.query(`DROP TYPE "order_status_enum"`)
  }
}
