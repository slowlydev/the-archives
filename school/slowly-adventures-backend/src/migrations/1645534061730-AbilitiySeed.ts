import { MigrationInterface, QueryRunner } from "typeorm";
import { abilities } from "./seed/ability.seed";

export class AbilitySeed1645534061730 implements MigrationInterface {
	name = "AbilitySeed1645534061730"

	public async up(queryRunner: QueryRunner): Promise<void> {
		abilities.map(
			async (ability) => {
				await queryRunner.query(`INSERT INTO ability (name, staminaCoast, damage) VALUES ('${ability.name}', ${ability.staminaCoast}, ${ability.damage});`)
			}
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM ability;`);
	}
}
