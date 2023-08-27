import { MigrationInterface, QueryRunner } from "typeorm";
import { homes } from "./seed/home.seed";

export class HomeSeed1645534061760 implements MigrationInterface {
	name = "HomeSeed1645534061760";

	public async up(queryRunner: QueryRunner): Promise<void> {
		homes.map(
			async (home) => {
				await queryRunner.query(`INSERT INTO home (name, location, storage, price) VALUES ('${home.name}', '${home.location}', ${home.storage}, ${home.price});`)
			}
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM home`);
	}
}
