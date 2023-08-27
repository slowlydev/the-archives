import { MigrationInterface, QueryRunner } from "typeorm";
import { players } from "./seed/player.seed";

export class PlayerSeed1645534061780 implements MigrationInterface {
	name = "PlayerSeed1645534061780";

	public async up(queryRunner: QueryRunner): Promise<void> {
		players.map(
			async (player) => {
				await queryRunner.query(`INSERT INTO player (nickname, characterID, weaponID, clothingID) VALUES ('${player.nickname}', ${player.characterID}, ${player.weaponID}, ${player.clothingID});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM player`);
	}
}
