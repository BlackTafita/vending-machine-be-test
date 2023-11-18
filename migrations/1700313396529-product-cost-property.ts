import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCostProperty1700313396529 implements MigrationInterface {
  name = 'ProductCostProperty1700313396529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "cost" integer NOT NULL DEFAULT '10'`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "sellerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sellerId"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cost"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
