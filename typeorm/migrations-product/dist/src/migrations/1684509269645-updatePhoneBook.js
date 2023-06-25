"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhoneBook1684509269645 = void 0;
class UpdatePhoneBook1684509269645 {
    constructor() {
        this.name = 'UpdatePhoneBook1684509269645';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`age\` int NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`age\``);
    }
}
exports.UpdatePhoneBook1684509269645 = UpdatePhoneBook1684509269645;
//# sourceMappingURL=1684509269645-updatePhoneBook.js.map