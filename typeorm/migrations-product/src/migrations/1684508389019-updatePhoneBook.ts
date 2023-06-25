import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePhoneBook1684508389019 implements MigrationInterface {
    name = 'UpdatePhoneBook1684508389019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`note\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`note\``);
    }

}
