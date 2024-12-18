import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToCampaignTable1734546967130 implements MigrationInterface {
    name = 'AddStatusToCampaignTable1734546967130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` CHANGE \`is_active\` \`status\` tinyint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` CHANGE \`status\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
    }

}
