import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736017173544 implements MigrationInterface {
    name = 'Migration1736017173544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lander\` CHANGE \`is_active\` \`status\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_active\` \`status\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`is_active\` \`status\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`traffic_source\` CHANGE \`is_active\` \`status\` tinyint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`traffic_source\` CHANGE \`status\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`status\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`lander\` CHANGE \`status\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
    }

}
