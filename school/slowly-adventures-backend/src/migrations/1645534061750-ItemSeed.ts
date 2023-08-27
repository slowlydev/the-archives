import { MigrationInterface, QueryRunner } from "typeorm";
import { items } from "./seed/item.seed";

export class ItemSeed1645534061750 implements MigrationInterface {
	name = "ItemSeed1645534061750";

	public async up(queryRunner: QueryRunner): Promise<void> {
		items.map(
			async (item) => {
				await queryRunner.query(`INSERT INTO item (name, description, rarityID) VALUES ('${item.name}', '${item.description}', ${item.rarityID});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM item`);
	}
}
