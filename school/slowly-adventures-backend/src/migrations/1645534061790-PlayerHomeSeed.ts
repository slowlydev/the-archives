import { MigrationInterface, QueryRunner } from "typeorm";
import { playerHomes } from "./seed/playerHome.seed";

export class PlayerHomeSeed1645534061790 implements MigrationInterface {
	name = "PlayerHomeSeed1645534061790";

	public async up(queryRunner: QueryRunner): Promise<void> {
		playerHomes.map(
			async (playerHome) => {
				await queryRunner.query(`INSERT INTO playerHome (playerID, homeID) VALUES (${playerHome.playerID}, ${playerHome.homeID});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM playerHome`);
	}
}
