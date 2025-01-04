import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1734546796106 implements MigrationInterface {
  name = 'InitialMigration1734546796106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lander\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`client_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`iso\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`nicename\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`campaign_countries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`campaign_id\` int NULL, \`country_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`campaign\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`advertiser_id\` int NOT NULL, \`lander_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`client_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` enum ('1', '2') NOT NULL, \`address\` varchar(255) NULL, \`contact_mail\` varchar(255) NOT NULL, \`finance_mail\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`traffic_source\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`publisher_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_a54095e840989c0ca9fb536c11\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rollup_campaign_hour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`stat_date\` date NOT NULL, \`stat_hour\` timestamp NOT NULL, \`publisher_id\` int NOT NULL, \`traffic_source_id\` int NOT NULL, \`advertiser_id\` int NOT NULL, \`campaign_id\` int NOT NULL, \`lander_id\` int NOT NULL, \`clicks\` int NOT NULL DEFAULT '0', \`revenue\` varchar(255) NOT NULL DEFAULT '0', \`payout\` varchar(255) NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_7928c5041998c472ed9e75d67d\` (\`stat_date\`, \`stat_hour\`, \`publisher_id\`, \`traffic_source_id\`, \`advertiser_id\`, \`campaign_id\`, \`lander_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rollup_campaign_day\` (\`id\` int NOT NULL AUTO_INCREMENT, \`stat_date\` date NOT NULL, \`publisher_id\` int NOT NULL, \`traffic_source_id\` int NOT NULL, \`advertiser_id\` int NOT NULL, \`campaign_id\` int NOT NULL, \`lander_id\` int NOT NULL, \`clicks\` int NOT NULL DEFAULT '0', \`revenue\` varchar(255) NOT NULL DEFAULT '0', \`payout\` varchar(255) NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_a9756af4c991fe64ffce498f56\` (\`stat_date\`, \`publisher_id\`, \`traffic_source_id\`, \`advertiser_id\`, \`campaign_id\`, \`lander_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`click\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`publisher_id\` int NOT NULL, \`traffic_source_id\` int NOT NULL, \`advertiser_id\` int NOT NULL, \`campaign_id\` int NOT NULL, \`lander_id\` int NOT NULL, \`revenue\` varchar(255) NOT NULL DEFAULT '0', \`payout\` varchar(255) NOT NULL DEFAULT '0', \`url\` varchar(255) NOT NULL, \`redirect\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`ua\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(0) NULL, UNIQUE INDEX \`IDX_534b9286e7a4819c5230f7c699\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`postback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`click_id\` int NOT NULL, \`transaction_id\` varchar(255) NOT NULL, \`publisher_id\` int NOT NULL, \`traffic_source_id\` int NOT NULL, \`advertiser_id\` int NOT NULL, \`campaign_id\` int NOT NULL, \`lander_id\` int NOT NULL, \`revenue\` varchar(255) NOT NULL DEFAULT '0', \`url\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`ua\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lander\` ADD CONSTRAINT \`fk_lander_client\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign_countries\` ADD CONSTRAINT \`FK_b570989d92ac86943dde7215f51\` FOREIGN KEY (\`campaign_id\`) REFERENCES \`campaign\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign_countries\` ADD CONSTRAINT \`FK_fdad2ea24ff3c64a57920093a6c\` FOREIGN KEY (\`country_id\`) REFERENCES \`country\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` ADD CONSTRAINT \`fk_campaign_advertiser\` FOREIGN KEY (\`advertiser_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` ADD CONSTRAINT \`fk_lander_campaign\` FOREIGN KEY (\`lander_id\`) REFERENCES \`lander\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`fk_user_client\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`traffic_source\` ADD CONSTRAINT \`fk_ts_publisher\` FOREIGN KEY (\`publisher_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` ADD CONSTRAINT \`fk_rollup_hour_publisher\` FOREIGN KEY (\`publisher_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` ADD CONSTRAINT \`fk_rollup_hour_traffic_source\` FOREIGN KEY (\`traffic_source_id\`) REFERENCES \`traffic_source\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` ADD CONSTRAINT \`fk_rollup_hour_advertiser\` FOREIGN KEY (\`advertiser_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` ADD CONSTRAINT \`fk_rollup_hour_campaign\` FOREIGN KEY (\`campaign_id\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` ADD CONSTRAINT \`fk_rollup_hour_lander\` FOREIGN KEY (\`lander_id\`) REFERENCES \`lander\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` ADD CONSTRAINT \`fk_rollup_day_publisher\` FOREIGN KEY (\`publisher_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` ADD CONSTRAINT \`fk_rollup_day_traffic_source\` FOREIGN KEY (\`traffic_source_id\`) REFERENCES \`traffic_source\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` ADD CONSTRAINT \`fk_rollup_day_advertiser\` FOREIGN KEY (\`advertiser_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` ADD CONSTRAINT \`fk_rollup_day_campaign\` FOREIGN KEY (\`campaign_id\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` ADD CONSTRAINT \`fk_rollup_day_lander\` FOREIGN KEY (\`lander_id\`) REFERENCES \`lander\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` ADD CONSTRAINT \`fk_click_publisher\` FOREIGN KEY (\`publisher_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` ADD CONSTRAINT \`fk_click_traffic_source\` FOREIGN KEY (\`traffic_source_id\`) REFERENCES \`traffic_source\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` ADD CONSTRAINT \`fk_click_advertiser\` FOREIGN KEY (\`advertiser_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` ADD CONSTRAINT \`fk_click_campaign\` FOREIGN KEY (\`campaign_id\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` ADD CONSTRAINT \`fk_click_lander\` FOREIGN KEY (\`lander_id\`) REFERENCES \`lander\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` ADD CONSTRAINT \`fk_postback_publisher\` FOREIGN KEY (\`publisher_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` ADD CONSTRAINT \`fk_postback_traffic_source\` FOREIGN KEY (\`traffic_source_id\`) REFERENCES \`traffic_source\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` ADD CONSTRAINT \`fk_postback_advertiser\` FOREIGN KEY (\`advertiser_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` ADD CONSTRAINT \`fk_postback_campaign\` FOREIGN KEY (\`campaign_id\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` ADD CONSTRAINT \`fk_postback_lander\` FOREIGN KEY (\`lander_id\`) REFERENCES \`lander\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` ADD CONSTRAINT \`fk_postback_click_id\` FOREIGN KEY (\`click_id\`) REFERENCES \`click\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`postback\` DROP FOREIGN KEY \`fk_postback_click_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` DROP FOREIGN KEY \`fk_postback_lander\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` DROP FOREIGN KEY \`fk_postback_campaign\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` DROP FOREIGN KEY \`fk_postback_advertiser\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` DROP FOREIGN KEY \`fk_postback_traffic_source\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`postback\` DROP FOREIGN KEY \`fk_postback_publisher\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` DROP FOREIGN KEY \`fk_click_lander\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` DROP FOREIGN KEY \`fk_click_campaign\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` DROP FOREIGN KEY \`fk_click_advertiser\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` DROP FOREIGN KEY \`fk_click_traffic_source\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`click\` DROP FOREIGN KEY \`fk_click_publisher\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` DROP FOREIGN KEY \`fk_rollup_day_lander\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` DROP FOREIGN KEY \`fk_rollup_day_campaign\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` DROP FOREIGN KEY \`fk_rollup_day_advertiser\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` DROP FOREIGN KEY \`fk_rollup_day_traffic_source\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_day\` DROP FOREIGN KEY \`fk_rollup_day_publisher\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` DROP FOREIGN KEY \`fk_rollup_hour_lander\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` DROP FOREIGN KEY \`fk_rollup_hour_campaign\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` DROP FOREIGN KEY \`fk_rollup_hour_advertiser\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` DROP FOREIGN KEY \`fk_rollup_hour_traffic_source\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rollup_campaign_hour\` DROP FOREIGN KEY \`fk_rollup_hour_publisher\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`traffic_source\` DROP FOREIGN KEY \`fk_ts_publisher\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`fk_user_client\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` DROP FOREIGN KEY \`fk_lander_campaign\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` DROP FOREIGN KEY \`fk_campaign_advertiser\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign_countries\` DROP FOREIGN KEY \`FK_fdad2ea24ff3c64a57920093a6c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign_countries\` DROP FOREIGN KEY \`FK_b570989d92ac86943dde7215f51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lander\` DROP FOREIGN KEY \`fk_lander_client\``,
    );
    await queryRunner.query(`DROP TABLE \`postback\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_534b9286e7a4819c5230f7c699\` ON \`click\``,
    );
    await queryRunner.query(`DROP TABLE \`click\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a9756af4c991fe64ffce498f56\` ON \`rollup_campaign_day\``,
    );
    await queryRunner.query(`DROP TABLE \`rollup_campaign_day\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_7928c5041998c472ed9e75d67d\` ON \`rollup_campaign_hour\``,
    );
    await queryRunner.query(`DROP TABLE \`rollup_campaign_hour\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a54095e840989c0ca9fb536c11\` ON \`traffic_source\``,
    );
    await queryRunner.query(`DROP TABLE \`traffic_source\``);
    await queryRunner.query(`DROP TABLE \`client\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`campaign\``);
    await queryRunner.query(`DROP TABLE \`campaign_countries\``);
    await queryRunner.query(`DROP TABLE \`country\``);
    await queryRunner.query(`DROP TABLE \`lander\``);
  }
}
