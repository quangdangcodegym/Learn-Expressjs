import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdatePhoneBook1684508389019 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
