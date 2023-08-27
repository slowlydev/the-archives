import { MigrationInterface, QueryRunner } from "typeorm";
import { clothings } from "./seed/clothing.seed";

export class ClothingSeed1645534061725 implements MigrationInterface {
	name = "ClothingSeed1645534061725"

	public async up(queryRunner: QueryRunner): Promise<void> {
		clothings.map(
			async (clothing) => {
				await queryRunner.query(`INSERT INTO clothing (name, description, protection, rarityID) VALUES ('${clothing.name}', '${clothing.description}', ${clothing.protection}, ${clothing.rarityID});`)
			}
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM clothing;`);
	}
}
