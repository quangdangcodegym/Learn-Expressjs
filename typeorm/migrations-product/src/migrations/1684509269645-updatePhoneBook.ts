import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePhoneBook1684509269645 implements MigrationInterface {
    name = 'UpdatePhoneBook1684509269645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`age\``);
    }

}
