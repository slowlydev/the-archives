import { MigrationInterface, QueryRunner } from "typeorm";
import { characters } from "./seed/character.seed";

export class CharacterSeed1645534061731 implements MigrationInterface {
	name = "CharacterSeed1645534061731";

	public async up(queryRunner: QueryRunner): Promise<void> {
		characters.map(
			async (character) => {
				await queryRunner.query(`INSERT INTO \`character\` (name, speed, strength, stamina, abilityID) VALUES ('${character.name}', ${character.speed}, ${character.strength}, ${character.stamina}, ${character.abilityID});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM character`);
	}
}
