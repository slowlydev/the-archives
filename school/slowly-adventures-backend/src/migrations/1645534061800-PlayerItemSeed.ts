import { MigrationInterface, QueryRunner } from "typeorm";
import { playerItems } from "./seed/playerItem.seed";

export class PlayerItemSeed1645534061800 implements MigrationInterface {
	name = "PlayerItemSeed1645534061800";

	public async up(queryRunner: QueryRunner): Promise<void> {
		playerItems.map(
			async (playerItem) => {
				await queryRunner.query(`INSERT INTO playerItem (playerID, itemID, amount) VALUES (${playerItem.playerID}, ${playerItem.itemID}, ${playerItem.amount});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM playerItem`);
	}
}
