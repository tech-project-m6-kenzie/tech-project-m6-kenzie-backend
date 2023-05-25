import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1684951871294 implements MigrationInterface {
    name = 'createTables1684951871294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying(200) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(120) NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "telefones" ("id" uuid NOT NULL, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "contato_id" uuid, CONSTRAINT "PK_fa0a7002d74f18ec1a13ca9a4f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contatos" ("id" uuid NOT NULL, "name" character varying(200) NOT NULL, "email" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_58a04ab74b45da858bb73756b60" UNIQUE ("email"), CONSTRAINT "PK_994cdcb2c56dfb5b66217c854cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "telefones" ADD CONSTRAINT "FK_ac53c0bc824641523e2b4c110fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "telefones" ADD CONSTRAINT "FK_9918422e5db82ee8aecc69acb01" FOREIGN KEY ("contato_id") REFERENCES "contatos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_db1ed6d13afe6b6184cc72bb906" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_db1ed6d13afe6b6184cc72bb906"`);
        await queryRunner.query(`ALTER TABLE "telefones" DROP CONSTRAINT "FK_9918422e5db82ee8aecc69acb01"`);
        await queryRunner.query(`ALTER TABLE "telefones" DROP CONSTRAINT "FK_ac53c0bc824641523e2b4c110fd"`);
        await queryRunner.query(`DROP TABLE "contatos"`);
        await queryRunner.query(`DROP TABLE "telefones"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
