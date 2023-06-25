"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhoneBook1684508389019 = void 0;
class UpdatePhoneBook1684508389019 {
    constructor() {
        this.name = 'UpdatePhoneBook1684508389019';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`note\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`note\``);
    }
}
exports.UpdatePhoneBook1684508389019 = UpdatePhoneBook1684508389019;
//# sourceMappingURL=1684508389019-updatePhoneBook.js.map