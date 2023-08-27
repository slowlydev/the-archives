import { MigrationInterface, QueryRunner } from "typeorm";
import { rarities } from "./seed/rarity.seed";

export class RaritySeed1645534061720 implements MigrationInterface {
	name = "RaritySeed1645534061720"

	public async up(queryRunner: QueryRunner): Promise<void> {
		rarities.map(
			async (rarity) => {
				await queryRunner.query(`INSERT INTO rarity (name) VALUES ('${rarity.name}');`)
			}
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM rarity;`);
	}
}
