import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736174639527 implements MigrationInterface {
    name = 'Migration1736174639527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`campaign\` ADD \`device\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` DROP COLUMN \`device\``);
        await queryRunner.query(`DROP TABLE \`device\``);
    }

}
