import { MigrationInterface, QueryRunner } from "typeorm";
import { weapons } from "./seed/weapon.seed";

export class WeaponSeed1645534061740 implements MigrationInterface {
	name = "WeaponSeed1645534061740";

	public async up(queryRunner: QueryRunner): Promise<void> {
		weapons.map(
			async (weapon) => {
				await queryRunner.query(`INSERT INTO weapon (name, damage, rarityID) VALUES ('${weapon.name}', ${weapon.damage}, ${weapon.rarity});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM weapon`);
	}
}
